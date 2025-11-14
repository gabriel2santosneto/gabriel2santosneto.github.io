// Login Screen for Windows 98 Portfolio
// Shows Windows 98 style login dialog

	function showLoginScreen(callback) {
		const isMobileLayout = window.matchMedia && window.matchMedia("(max-width: 520px)").matches;

		const $loginScreen = $("<div>")
			.css({
			position: "fixed",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			backgroundColor: "#476da1", // Windows 98 login background
			zIndex: 9999,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			fontFamily: "MS Sans Serif, sans-serif",
			opacity: 0,
			padding: isMobileLayout ? "32px 12px" : 0,
			boxSizing: "border-box"
			})
			.appendTo("body");

		let loginInProgress = false;

		// Delay showing login modal by 0.8 seconds
		setTimeout(() => {
			$loginScreen.css({ opacity: 1 });
	}, 800);

	// Custom error message box for login screen
	const showErrorModal = function(message) {
		const $errorOverlay = $("<div>")
			.css({
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.3)",
				zIndex: 10000,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "MS Sans Serif, sans-serif"
			})
			.appendTo("body");

		const $errorDialog = $("<div>")
			.css({
				backgroundColor: "#d4d0c9",
				border: "2px outset #d4d0c9",
				width: "300px",
				boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
				display: "flex",
				flexDirection: "column"
			})
			.appendTo($errorOverlay);

		const $errorTitleBar = $("<div>")
			.css({
				background: "linear-gradient(to right, #142769 0%, #a5c1e6 100%)",
				color: "#ffffff",
				padding: "5px 8px",
				fontSize: "14px",
				fontWeight: "bold",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				height: "24px",
				boxSizing: "border-box",
				userSelect: "none"
			})
			.appendTo($errorDialog);

		$("<span>").text("Error").appendTo($errorTitleBar);

		const $errorCloseButton = $("<button>")
			.css({
				width: "22px",
				height: "20px",
				backgroundColor: "#c0c0c0",
				border: "1px outset #c0c0c0",
				fontSize: "14px",
				fontWeight: "bold",
				cursor: "pointer",
				padding: 0,
				lineHeight: "18px",
				textAlign: "center",
				color: "#000000"
			})
			.text("×")
			.appendTo($errorTitleBar);

		const $errorContent = $("<div>")
			.css({
				padding: "16px",
				display: "flex",
				gap: "12px",
				alignItems: "flex-start"
			})
			.appendTo($errorDialog);

		const $errorIcon = $("<img>")
			.attr("src", "/images/icons/error-32x32-8bpp.png")
			.css({
				width: "32px",
				height: "32px",
				flexShrink: 0,
				imageRendering: "pixelated",
				imageRendering: "-moz-crisp-edges",
				imageRendering: "crisp-edges"
			})
			.appendTo($errorContent);

		const $errorMessage = $("<div>")
			.css({
				fontSize: "14px",
				color: "#000000",
				lineHeight: "1.4",
				flex: 1
			})
			.text(message)
			.appendTo($errorContent);

		const $errorButtonContainer = $("<div>")
			.css({
				padding: "8px 16px 16px",
				textAlign: "center"
			})
			.appendTo($errorDialog);

		const $errorOkButton = $("<button>")
			.css({
				minWidth: "95px",
				height: "28px",
				backgroundColor: "#c0c0c0",
				border: "2px outset #c0c0c0",
				cursor: "pointer",
				fontSize: "14px",
				fontFamily: "MS Sans Serif, sans-serif",
				padding: "4px 16px"
			})
			.text("OK")
			.appendTo($errorButtonContainer);

		const addButtonPressEffect = ($button) => {
			$button.on("mousedown", function() {
				$(this).css({
					border: "2px inset #c0c0c0",
					boxShadow: "inset 1px 1px #000000, inset -1px -1px #ffffff"
				});
			});
			$button.on("mouseup mouseleave", function() {
				$(this).css({
					border: "2px outset #c0c0c0",
					boxShadow: "none"
				});
			});
		};

		addButtonPressEffect($errorOkButton);
		addButtonPressEffect($errorCloseButton);

		const closeErrorModal = function() {
			$errorOverlay.fadeOut(200, function() {
				$(this).remove();
			});
		};

		$errorOkButton.on("click", closeErrorModal);
		$errorCloseButton.on("click", closeErrorModal);

		// Play error sound
		try {
			const audio = new Audio("/audio/CHORD.WAV");
			audio.volume = 0.5;
			audio.play().catch(e => console.log("Audio play failed:", e));
		} catch (e) {
			console.log("Audio not available:", e);
		}
	};

	const $contentStack = $("<div>")
		.css({
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: isMobileLayout ? "12px" : "16px",
			transform: isMobileLayout ? "none" : "translateY(-40px)",
			width: "100%",
			maxWidth: isMobileLayout ? "360px" : "auto"
		})
		.appendTo($loginScreen);

	const portraitSize = isMobileLayout ? 140 : 180;

	const $profileWrapper = $("<div>")
		.css({
			width: portraitSize + "px",
			height: portraitSize + "px",
			border: "3px solid rgba(255,255,255,0.6)",
			borderRadius: "50%",
			boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
			overflow: "hidden",
			backgroundColor: "#1a1a1a"
		})
		.appendTo($contentStack);

	$("<img>")
		.attr("src", "images/lego_profile.png")
		.attr("alt", "Gabriel dos Santos portrait")
		.css({
			width: "100%",
			height: "100%",
			objectFit: "cover",
			display: "block"
		})
		.appendTo($profileWrapper);

	// Login dialog box
	const $loginDialog = $("<div>")
		.css({
			backgroundColor: "#d4d0c9",
			border: "2px outset #d4d0c9",
			width: isMobileLayout ? "100%" : "520px",
			maxWidth: isMobileLayout ? "380px" : "none",
			boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
			display: "flex",
			flexDirection: "column"
		})
		.appendTo($contentStack);

	// Title bar
	const $titleBar = $("<div>")
		.css({
			background: "linear-gradient(to right, #142769 0%, #a5c1e6 100%)",
			color: "#ffffff",
			padding: "5px 10px",
			fontSize: "13px",
			fontWeight: "bold",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			height: "24px",
			boxSizing: "border-box",
			userSelect: "none"
		})
		.appendTo($loginDialog);

	$("<span>").text("Welcome to GabrielOS v1.2").appendTo($titleBar);

	const $titleBarButtons = $("<div>")
		.css({
			display: "flex",
			gap: "2px",
			alignItems: "center"
		})
		.appendTo($titleBar);

	// Help button (?)
	const $helpButton = $("<button>")
		.css({
			width: "22px",
			height: "20px",
			backgroundColor: "#c0c0c0",
			border: "1px outset #c0c0c0",
			fontSize: "13px",
			fontWeight: "bold",
			cursor: "pointer",
			padding: 0,
			lineHeight: "18px",
			textAlign: "center",
			color: "#000000"
		})
		.text("?")
		.appendTo($titleBarButtons);

	// Close button (X)
	const $closeButton = $("<button>")
		.css({
			width: "22px",
			height: "20px",
			backgroundColor: "#c0c0c0",
			border: "1px outset #c0c0c0",
			fontSize: "14px",
			fontWeight: "bold",
			cursor: "pointer",
			padding: 0,
			lineHeight: "18px",
			textAlign: "center",
			color: "#000000"
		})
		.text("×")
		.appendTo($titleBarButtons);

	$closeButton.on("click", function() {
		showErrorModal("Access Denied");
	});

	// Dialog content wrapper
	const $dialogContentWrapper = $("<div>")
		.css({
			padding: isMobileLayout ? "12px 8px" : "12px",
			display: "flex",
			gap: isMobileLayout ? "8px" : "12px",
			flexDirection: isMobileLayout ? "column" : "row",
			alignItems: isMobileLayout ? "stretch" : "flex-start"
		})
		.appendTo($loginDialog);

	if (!isMobileLayout) {
		// Key icon (left side)
		const $iconContainer = $("<div>")
			.css({
				flexShrink: 0,
				width: "48px",
				height: "48px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				marginBottom: isMobileLayout ? "8px" : 0
			})
			.appendTo($dialogContentWrapper);

		// Windows key icon image
		$("<img>")
			.attr("src", "images/win-key.png")
			.css({
				width: "48px",
				height: "48px",
				imageRendering: "pixelated",
				imageRendering: "-moz-crisp-edges",
				imageRendering: "crisp-edges",
				objectFit: "contain"
			})
			.appendTo($iconContainer);
	}

	// Form content (right side)
	const $formContent = $("<div>")
		.css({
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: "10px"
		})
		.appendTo($dialogContentWrapper);

	// Instruction text
	$("<div>")
		.css({
			fontSize: "14px",
			color: "#000000",
			marginBottom: "6px",
			lineHeight: "1.4"
		})
		.text("Please verify you’re human (or at least curious).")
		.appendTo($formContent);

	// Input fields and buttons container
	const $fieldsAndButtons = $("<div>")
		.css({
			display: "flex",
			gap: isMobileLayout ? "16px" : "12px",
			alignItems: isMobileLayout ? "stretch" : "flex-start",
			flexDirection: isMobileLayout ? "column" : "row"
		})
		.appendTo($formContent);

	// Left side - input fields
	const $fieldsContainer = $("<div>")
		.css({
			flex: 1,
			display: "flex",
			flexDirection: "column",
			gap: "12px"
		})
		.appendTo($fieldsAndButtons);

	// Username field
	const $usernameContainer = $("<div>")
		.css({
			display: "flex",
			alignItems: "center",
			gap: "8px"
		})
		.appendTo($fieldsContainer);

	$("<label>")
		.css({
			fontSize: "14px",
			color: "#000000",
			width: isMobileLayout ? "74px" : "90px",
			flexShrink: 0
		})
		.html("<u>U</u>ser name:")
		.appendTo($usernameContainer);

	const $usernameInput = $("<input>")
		.attr("type", "text")
		.css({
			flex: 1,
			padding: "6px 8px",
			border: "2px inset #c0c0c0",
			backgroundColor: "#ffffff",
			fontSize: "14px",
			fontFamily: "MS Sans Serif, sans-serif",
			boxSizing: "border-box",
			minWidth: "0",
			outline: "none"
		})
		.val("Gabriel")
		.appendTo($usernameContainer);

	// Password field
	const $passwordContainer = $("<div>")
		.css({
			display: "flex",
			alignItems: "center",
			gap: "8px"
		})
		.appendTo($fieldsContainer);

	$("<label>")
		.css({
			fontSize: "14px",
			color: "#000000",
			width: isMobileLayout ? "74px" : "90px",
			flexShrink: 0
		})
		.html("<u>P</u>assword:")
		.appendTo($passwordContainer);

	const $passwordInput = $("<input>")
		.attr("type", "password")
		.css({
			flex: 1,
			padding: "6px 8px",
			border: "2px inset #c0c0c0",
			backgroundColor: "#ffffff",
			fontSize: "14px",
			fontFamily: "MS Sans Serif, sans-serif",
			boxSizing: "border-box",
			minWidth: "0",
			outline: "none"
		})
		// Password can be pre-populated with random value or user can enter anything
		.val("••••••••")
		.appendTo($passwordContainer);

	// Buttons container (right side)
	const $buttonsContainer = $("<div>")
		.css({
			display: "flex",
			flexDirection: isMobileLayout ? "row" : "column",
			gap: isMobileLayout ? "12px" : "8px",
			flexShrink: 0,
			alignSelf: isMobileLayout ? "stretch" : "auto",
			justifyContent: isMobileLayout ? "space-between" : "flex-start"
		})
		.appendTo($fieldsAndButtons);

	// OK button (default)
	const $okButton = $("<button>")
		.css({
			minWidth: isMobileLayout ? "0" : "95px",
			height: "30px",
			backgroundColor: "#c0c0c0",
			border: "2px outset #c0c0c0",
			cursor: "pointer",
			fontSize: "14px",
			fontFamily: "MS Sans Serif, sans-serif",
			padding: "4px 18px",
			boxShadow: "inset -1px -1px #000000, inset 1px 1px #ffffff"
		})
		.text("OK")
		.appendTo($buttonsContainer);

	// Cancel button
	const $cancelButton = $("<button>")
		.css({
			minWidth: isMobileLayout ? "0" : "95px",
			height: "30px",
			backgroundColor: "#c0c0c0",
			border: "2px outset #c0c0c0",
			cursor: "pointer",
			fontSize: "14px",
			fontFamily: "MS Sans Serif, sans-serif",
			padding: "4px 18px"
		})
		.text("Cancel")
		.appendTo($buttonsContainer);

	if (isMobileLayout) {
		$okButton.css({ flex: 1 });
		$cancelButton.css({ flex: 1 });
	}

	// Button press effects
	const addButtonPressEffect = ($button) => {
		$button.on("mousedown", function() {
			$(this).css({
				border: "2px inset #c0c0c0",
				boxShadow: "inset 1px 1px #000000, inset -1px -1px #ffffff"
			});
		});
		$button.on("mouseup mouseleave", function() {
			const isDefault = $(this).text() === "OK";
			$(this).css({
				border: "2px outset #c0c0c0",
				boxShadow: isDefault ? "inset -1px -1px #000000, inset 1px 1px #ffffff" : "none"
			});
		});
	};

	addButtonPressEffect($okButton);
	addButtonPressEffect($cancelButton);
	addButtonPressEffect($helpButton);
	addButtonPressEffect($closeButton);

	const $loadingState = $("<div>")
		.css({
			display: "none",
			flexDirection: "column",
			gap: "10px",
			padding: "12px",
			borderTop: "1px solid #ffffff",
			backgroundColor: "#d4d0c9"
		})
		.appendTo($loginDialog);

	const $loadingBar = $("<div>")
		.css({
			width: "100%",
			height: "16px",
			border: "2px inset #c0c0c0",
			backgroundColor: "#ffffff",
			position: "relative",
			overflow: "hidden",
			boxShadow: "inset 1px 1px rgba(255,255,255,0.6)"
		})
		.appendTo($loadingState);

	const $loadingBarFill = $("<div>")
		.css({
			width: "0%",
			height: "100%",
			background: "linear-gradient(90deg, #2544b3, #58a6ff)",
			transition: "width 300ms ease-out"
		})
		.appendTo($loadingBar);

	const $loadingMessages = $("<div>")
		.css({
			fontFamily: "'VT323', 'Courier New', monospace",
			fontSize: "22px",
			color: "#000000",
			backgroundColor: "#ffffff",
			border: "2px inset #c0c0c0",
			padding: "10px",
			minHeight: "90px",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			gap: "6px"
		})
		.appendTo($loadingState);

	// Play login chime function
	const playLoginChime = function() {
		try {
			const audio = new Audio("audio/CHORD.WAV");
			audio.volume = 0.5;
			audio.play().catch(e => console.log("Audio play failed:", e));
		} catch (e) {
			console.log("Audio not available:", e);
		}
	};

	const finalizeLogin = (username) => {
		$loginScreen.fadeOut(300, () => {
			$loginScreen.remove();
			if (callback) callback(username);
		});
	};

	const runLoadingSequence = (username) => {
		const prefersReducedMotion = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false;
		const stepDelay = prefersReducedMotion ? 200 : 900;
		const completionDelay = prefersReducedMotion ? 100 : 500;
		const sequence = [
			{ text: "> Authenticating curiosity...", progress: 35 },
			{ text: "> Verifying imagination...", progress: 68 },
			{ text: "> Access granted!", progress: 100 }
		];

		$dialogContentWrapper.hide();
		$loadingState.css("display", "flex");
		$loadingBarFill.css({ width: "0%" });
		$loadingMessages.empty();

		sequence.forEach((entry, index) => {
			setTimeout(() => {
				$loadingMessages.append($("<div>").text(entry.text));
				$loadingBarFill.css({ width: entry.progress + "%" });
				if (index === sequence.length - 1) {
					setTimeout(() => finalizeLogin(username), completionDelay);
				}
			}, index * stepDelay);
		});
	};

	// OK button action
	const handleLogin = () => {
		if (loginInProgress) {
			return;
		}
		const username = $usernameInput.val() || "Gabriel";
		loginInProgress = true;
		$okButton.prop("disabled", true);
		$cancelButton.prop("disabled", true);
		$helpButton.prop("disabled", true);
		$closeButton.prop("disabled", true);
		playLoginChime();
		runLoadingSequence(username);
	};

	$okButton.on("click", handleLogin);

	// Access keys (Alt+U for username, Alt+P for password)
	$(document).on("keydown", function(e) {
		if (e.altKey) {
			if (e.key === "u" || e.key === "U") {
				e.preventDefault();
				$usernameInput.focus();
				$usernameInput.select();
			}
			if (e.key === "p" || e.key === "P") {
				e.preventDefault();
				$passwordInput.focus();
			}
		}
	});

	// Enter key on inputs
	$usernameInput.on("keydown", (e) => {
		if (e.key === "Enter") {
			$passwordInput.focus();
		}
	});

	$passwordInput.on("keydown", (e) => {
		if (e.key === "Enter") {
			handleLogin();
		}
	});

	// Cancel button action
	$cancelButton.on("click", function() {
		showErrorModal("Access Denied");
	});

	// Focus password input
	setTimeout(() => {
		$passwordInput.focus();
	}, 100);
}
