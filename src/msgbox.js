
// Prefer a function injected from outside an iframe,
// which will make dialogs that can go outside the iframe.
// Note that this API must be kept in sync with the version in jspaint.

// Note `defaultMessageBoxTitle` handling in make_iframe_window
// Any other default parameters need to be handled there (as it works now)

var chord_audio = new Audio("/audio/CHORD.WAV");

window.showMessageBox = window.showMessageBox || (({
	title = window.defaultMessageBoxTitle ?? "Alert",
	message,
	messageHTML,
	buttons = [{ label: "OK", value: "ok", default: true }],
	iconID = "warning", // "error", "warning", "info", or "nuke" for deleting files/folders
	windowOptions = {}, // for controlling width, etc.
}) => {
	let $window, $message;
	const promise = new Promise((resolve, reject) => {
		$window = new $Window(Object.assign({
			title,
			resizable: false,
			innerWidth: 480,
			maximizeButton: false,
			minimizeButton: false,
		}, windowOptions));
		// $window.addClass("dialog-window horizontal-buttons");
		$message =
			$("<div>").css({
				textAlign: "left",
				fontFamily: "MS Sans Serif, Arial, sans-serif",
				fontSize: "16px",
				marginTop: "24px",
				flex: 1,
				minWidth: 0, // Fixes hidden overflow, see https://css-tricks.com/flexbox-truncated-text/
				whiteSpace: "normal", // overriding .window:not(.squish)
			});
		if (messageHTML) {
			$message.html(messageHTML);
		} else if (message) { // both are optional because you may populate later with dynamic content
			$message.text(message).css({
				whiteSpace: "pre-wrap",
				wordWrap: "break-word",
			});
		}
		// Determine icon path - use absolute path for root context
		const iconPath = (typeof getIconPath !== 'undefined') 
			? getIconPath(iconID, 32).replace('.png', '-8bpp.png')
			: `/images/icons/${iconID}-32x32-8bpp.png`;
		
		$("<div>").append(
			$("<img width='48' height='48'>").attr("src", iconPath).css({
				margin: "20px",
				display: "block",
			}),
			$message
		).css({
			display: "flex",
			flexDirection: "row",
		}).appendTo($window.$content);

		$window.$content.css({
			textAlign: "center",
		});
		for (const button of buttons) {
			const $button = $window.$Button(button.label, () => {
				button.action?.(); // API may be required for using user gesture requiring APIs
				resolve(button.value);
				$window.close(); // actually happens automatically
			});
			if (button.default) {
				$button.addClass("default");
				$button.focus();
				setTimeout(() => $button.focus(), 0); // @TODO: why is this needed? does it have to do with the iframe window handling?
			}
			$button.css({
				minWidth: 100,
				height: 30,
				margin: "20px 4px",
				fontSize: "14px",
			});
		}
		$window.on("focusin", "button", (event) => {
			$(event.currentTarget).addClass("default");
		});
		$window.on("focusout", "button", (event) => {
			$(event.currentTarget).removeClass("default");
		});
		$window.on("closed", () => {
			resolve("closed"); // or "cancel"? do you need to distinguish?
		});
		$window.center();
	});
	promise.$window = $window;
	promise.$message = $message;
	promise.promise = promise; // for easy destructuring
	try {
		chord_audio.play();
	} catch (error) {
		console.log(`Failed to play ${chord_audio.src}: `, error);
	}
	return promise;
});

window.alert = (message) => {
	showMessageBox({ message });
};

function appendCustomMessageBoxChildren($target, content) {
	if (content == null || content === false) {
		return;
	}
	if (typeof content === "function") {
		appendCustomMessageBoxChildren($target, content($target));
		return;
	}
	if (Array.isArray(content)) {
		content.forEach((child) => appendCustomMessageBoxChildren($target, child));
		return;
	}
	if (content.jquery) {
		$target.append(content);
		return;
	}
	if (content && typeof content === "object" && "nodeType" in content) {
		$target.append(content);
		return;
	}
	$target.append(content);
}

window.showCustomMessageBox = window.showCustomMessageBox || (({
	title = window.defaultMessageBoxTitle ?? "Windows",
	heading,
	headingIcon,
	headingIconAlt = "",
	children,
	buttons = [{ label: "OK", value: "ok", default: true }],
	width = 640,
	wrapperClass = "",
	bodyClass = "",
	windowOptions = {},
	playSound = true,
} = {}) => {
	let $window;
	let $body;
	const promise = new Promise((resolve) => {
		let resolved = false;
		const resolveOnce = (value) => {
			if (resolved) {
				return;
			}
			resolved = true;
			resolve(value);
		};

		const computedWidth = Math.min(width, window.innerWidth ? window.innerWidth * 0.95 : width);

		$window = new $Window(Object.assign({
			title,
			resizable: false,
			innerWidth: computedWidth,
			maximizeButton: false,
			minimizeButton: false,
		}, windowOptions));

		const $contentRoot = $window.$content.empty();
		const wrapperClasses = ["custom-msgbox", wrapperClass].filter(Boolean).join(" ");
		const $wrapper = $("<div>").addClass(wrapperClasses).appendTo($contentRoot);
		const $inner = $("<div>").addClass("custom-msgbox__inner").appendTo($wrapper);

		if (heading || headingIcon) {
			const $heading = $("<div>").addClass("custom-msgbox__heading").appendTo($inner);
			if (headingIcon) {
				const altText = headingIconAlt || heading || "";
				$("<img>")
					.attr({ src: headingIcon, alt: altText })
					.appendTo($heading);
			}
			if (heading) {
				$("<span>")
					.addClass("custom-msgbox__heading-text")
					.text(heading)
					.appendTo($heading);
			}
		}

		$body = $("<div>")
			.addClass(["custom-msgbox__body", bodyClass].filter(Boolean).join(" ").trim())
			.appendTo($inner);

		appendCustomMessageBoxChildren($body, children);

		if (buttons && buttons.length) {
			const $footer = $("<div>").addClass("custom-msgbox__footer").appendTo($inner);
			buttons.forEach((button) => {
				const { className, disabled } = button;
				const $btn = $("<button type='button'>")
					.addClass(["custom-msgbox__button", className].filter(Boolean).join(" "))
					.prop("disabled", !!disabled)
					.text(button.label)
					.appendTo($footer);

				const handleClick = () => {
					button.action?.();
					resolveOnce(button.value ?? button.label ?? "ok");
					if (button.closeOnClick !== false) {
						$window.close();
					}
				};

				$btn.on("click", handleClick);

				if (button.default) {
					$btn.addClass("default");
					setTimeout(() => {
						if (!$btn.prop("disabled")) {
							$btn.trigger("focus");
						}
					}, 0);
				}
			});
		}

		$window.on("closed", () => {
			resolveOnce("closed");
		});

		$window.center();
		$window.focus();
	});

	promise.$window = $window;
	promise.$body = $body;
	promise.promise = promise;

	if (playSound) {
		try {
			chord_audio.play();
		} catch (error) {
			console.log(`Failed to play ${chord_audio.src}: `, error);
		}
	}

	return promise;
});
