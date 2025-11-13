// BIOS-style Boot Screen for Gabriel dos Santos Portfolio
// Retro BIOS boot screen with pixelated text

function showBootScreen(callback) {
	const $bootScreen = $("<div>")
		.css({
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "#000000",
			zIndex: 10000,
			fontFamily: "'VT323', 'Courier New', 'Courier', monospace",
			color: "#ffffff",
			overflow: "hidden",
			imageRendering: "pixelated",
			imageRendering: "-moz-crisp-edges",
			imageRendering: "crisp-edges",
			WebkitFontSmoothing: "none",
			fontSmoothing: "never",
			textRendering: "optimizeSpeed",
			cursor: "pointer"
		})
		.appendTo("body");

	// Main container
	const $container = $("<div>")
		.css({
			width: "100%",
			height: "100%",
			padding: "40px",
			boxSizing: "border-box",
			position: "relative",
			fontSize: "24px",
			lineHeight: "1.6",
			letterSpacing: "0.5px"
		})
		.appendTo($bootScreen);

	// Top-left section - Welcome message with portfolio icon
	const $topSection = $("<div>")
		.css({
			marginBottom: "30px",
			color: "#ffffff",
			opacity: 0.7,
			display: "flex",
			alignItems: "flex-start",
			gap: "15px"
		})
		.appendTo($container);

	// Portfolio icon (blue person icon)
	const $portfolioIcon = $("<img>")
		.attr("src", "images/portfolio-icon.png")
		.css({
			width: "32px",
			height: "32px",
			imageRendering: "pixelated",
			imageRendering: "-moz-crisp-edges",
			imageRendering: "crisp-edges",
			flexShrink: 0,
			opacity: 0.7
		})
		.appendTo($topSection);

	const $welcomeText = $("<div>").appendTo($topSection);
	$("<div>").css({ marginBottom: "8px", fontSize: "30px", opacity: 0.7 })
		.text("Welcome to Gabriel dos Santos Portfolio Website")
		.appendTo($welcomeText);
	
	$("<div>").css({ fontSize: "22px", color: "#ffffff", opacity: 0.7 })
		.text("For a better experience use the desktop version.")
		.appendTo($welcomeText);

	// Shared styles for log cursor
	if (!document.getElementById("boot-screen-inline-style")) {
		$("head").append(`
			<style id="boot-screen-inline-style">
					.boot-log-line {
						font-size: 24px;
						line-height: 1.5;
						opacity: 0.7;
					}
				.boot-log-cursor {
					display: inline-block;
					width: 12px;
					margin-left: 4px;
					animation: boot-blink 1s step-start infinite;
				}
				@keyframes boot-blink {
					50% { opacity: 0; }
				}
			</style>
		`);
	}

	// Top right logo - 404 logo image
	const $logoContainer = $("<div>")
		.css({
			position: "absolute",
			top: "40px",
			right: "40px",
			opacity: 0.7
		})
		.appendTo($container);

	const $logoImage = $("<img>")
		.attr("src", "images/404-logo.png")
		.css({
			width: "auto",
			height: "80px",
			imageRendering: "pixelated",
			imageRendering: "-moz-crisp-edges",
			imageRendering: "crisp-edges",
			display: "block"
		})
		.appendTo($logoContainer);

	// Boot log section for sequential status messages
	const $bootLog = $("<div>")
		.css({
			marginTop: "40px",
			maxWidth: "900px",
			padding: "16px",
			backgroundColor: "rgba(0, 0, 0, 0.35)",
			boxShadow: "0 0 8px rgba(0, 0, 0, 0.6) inset",
			minHeight: "180px",
			fontSize: "24px"
		})
		.appendTo($container);

	const bootMessages = [
		"Initializing Shrinking Machine v1.2...",
		"Loading Creativity Drivers...",
		"Calibrating Robots (and imagination)...",
		"Installing LEGO SPIKE Modules...",
		"Running \"Think Outside the Bot\" protocol...",
		"Booting STEM Universe OS..."
	];

	const prefersReducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
	const lineDelay = prefersReducedMotion ? 150 : 1000;
	const $cursor = $("<span>").addClass("boot-log-cursor").text("_").appendTo($bootLog);

	const moveCursorToEnd = () => {
		$cursor.detach();
		$bootLog.append($cursor);
	};

	const appendBootMessage = (message) => {
		const $line = $("<div>")
			.addClass("boot-log-line")
			.text("> " + message);
		$bootLog.append($line);
		moveCursorToEnd();
	};

	bootMessages.forEach((message, index) => {
		setTimeout(() => {
			appendBootMessage(message);
		}, index * lineDelay);
	});

		// Bottom section - Instructions
		const $bottomSection = $("<div>")
			.css({
				position: "absolute",
				bottom: "40px",
				left: "40px",
				color: "#ffffff",
				fontSize: "24px",
				lineHeight: "1.8",
				opacity: 0
			})
			.appendTo($container);
		$("<div>")
			.css({ opacity: 0.7 })
			.text("System ready.")
			.appendTo($bottomSection);
		$("<div>")
			.css({ opacity: 0.7 })
			.text("Press Enter or tap anywhere to continue.")
			.appendTo($bottomSection);

		const bottomRevealDelay = bootMessages.length * lineDelay + 200;
		setTimeout(() => {
			$bottomSection.css({ opacity: 0.85 });
		}, bottomRevealDelay);

	// Keyboard handlers
	let fPressed = false;
	let enterPressed = false;

	// Play startup sound function
	const playStartupSound = function() {
		try {
			const audio = new Audio("audio/START.WAV");
			audio.volume = 0.5;
			audio.play().catch(e => console.log("Audio play failed:", e));
		} catch (e) {
			console.log("Audio not available:", e);
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === "f" || e.key === "F") {
			if (!fPressed) {
				fPressed = true;
				// No color change animation
			}
		}
		if (e.key === "Enter") {
			if (!enterPressed) {
				enterPressed = true;
				// No color change animation
				playStartupSound();
				// Set body background to match login screen to avoid white flash
				$("body").css({ backgroundColor: "#476da1" });
				setTimeout(() => {
					$bootScreen.remove();
					$(document).off("keydown", handleKeyPress);
					if (callback) callback();
				}, 300);
			}
		}
	};

	$(document).on("keydown", handleKeyPress);

	// Click handler to proceed (for mobile/touch devices)
	const handleClick = (e) => {
		if (!enterPressed) {
			enterPressed = true;
			playStartupSound();
			// Set body background to match login screen to avoid white flash
			$("body").css({ backgroundColor: "#476da1" });
			setTimeout(() => {
				$bootScreen.remove();
				$(document).off("keydown", handleKeyPress);
				$bootScreen.off("click", handleClick);
				if (callback) callback();
			}, 300);
		}
	};

	// Add click handler to boot screen
	$bootScreen.on("click", handleClick);

	// TESTING MODE: Auto-proceed disabled - boot screen stays visible
	// Uncomment below to enable auto-proceed after 5 seconds
	/*
	setTimeout(() => {
		if (!enterPressed) {
			playStartupSound();
			$bootScreen.fadeOut(500, () => {
				$bootScreen.remove();
				$(document).off("keydown", handleKeyPress);
				$bootScreen.off("click", handleClick);
				if (callback) callback();
			});
		}
	}, 5000);
	*/
}
