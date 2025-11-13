
// Start Menu functionality

var $start_menu = $(".start-menu");
$start_menu.hide();

var open_start_menu = function () {
	$start_button.addClass("selected");
	$start_menu.attr("hidden", null);
	$start_menu.slideDown(100);
	$start_menu.css({ zIndex: ++$Window.Z_INDEX + 5001 });
};

var close_start_menu = function () {
	$start_button.removeClass("selected");
	$start_menu.attr("hidden", "hidden");
	$start_menu.hide();
	// Close all submenus
	$(".start-submenu").hide();
};

var toggle_start_menu = function () {
	if ($start_menu.is(":hidden")) {
		open_start_menu();
	} else {
		close_start_menu();
	}
};

var $start_button = $(".start-button");
$start_button.on("pointerdown", function () {
	toggle_start_menu();
});

$("body").on("pointerdown", function (e) {
	if ($(e.target).closest(".start-menu, .start-button").length === 0) {
		close_start_menu();
	}
});

$(window).on("keydown", function (e) {
	if (e.which === 27) { // Esc to close
		close_start_menu();
	}
});

// Submenu handling
var current_submenu = null;
var submenu_timer = null;

function showSubmenu($menuItem, submenuId) {
	// Close current submenu if different
	if (current_submenu && current_submenu.attr("id") !== "submenu-" + submenuId) {
		current_submenu.hide();
	}
	
	// Show new submenu
	var $submenu = $("#submenu-" + submenuId);
	if ($submenu.length) {
		var $parent = $menuItem.closest(".start-menu-content");
		var itemOffset = $menuItem.position();
		var itemTop = itemOffset.top;
		
		// Position relative to the menu item
		$submenu.css({
			top: itemTop + "px",
			left: ($parent.outerWidth() + 2) + "px"
		});
		
		// Adjust if submenu goes off screen
		setTimeout(function() {
			var submenuRect = $submenu[0].getBoundingClientRect();
			var viewportWidth = window.innerWidth;
			
			if (submenuRect.right > viewportWidth) {
				// Show on left side instead
				var menuRect = $parent[0].getBoundingClientRect();
				$submenu.css({
					left: (-$submenu.outerWidth() - 2) + "px"
				});
			}
		}, 0);
		
		$submenu.show();
		current_submenu = $submenu;
	}
}

function hideSubmenu() {
	if (current_submenu) {
		current_submenu.hide();
		current_submenu = null;
	}
}

// Ensure submenus are children of start-menu-content for proper positioning
$(document).ready(function() {
	$(".start-submenu").each(function() {
		var $submenu = $(this);
		if ($submenu.parent().hasClass("start-menu-content")) {
			// Already in correct position
		} else {
			$(".start-menu-content").append($submenu);
		}
	});
});

// Detect touch device
var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Handle menu item hover (desktop only)
function handleMenuItemInteraction($item, submenuId) {
	if (submenu_timer) {
		clearTimeout(submenu_timer);
	}
	
	submenu_timer = setTimeout(function() {
		showSubmenu($item, submenuId);
	}, 300);
}

// Desktop hover behavior
$(document).on("mouseenter", ".start-menu-item.has-submenu", function() {
	if (!isTouchDevice) {
		var $item = $(this);
		var submenuId = $item.data("submenu");
		handleMenuItemInteraction($item, submenuId);
	}
});

$(document).on("mouseleave", ".start-menu-item.has-submenu", function() {
	if (!isTouchDevice) {
		var $item = $(this);
		if (submenu_timer) {
			clearTimeout(submenu_timer);
			submenu_timer = null;
		}
		
		// Delay hiding submenu to allow moving to it
		setTimeout(function() {
			if (!current_submenu || (!current_submenu.is(":hover") && !$item.is(":hover"))) {
				hideSubmenu();
			}
		}, 200);
	}
});

// Handle touch/click for menu items on mobile
var lastClickedItem = null;

$(document).on("click", ".start-menu-item", function(e) {
	var $item = $(this);
	var submenuId = $item.data("submenu");
	var action = $item.data("action");
	
	if (isTouchDevice) {
		// Mobile: click to toggle submenu
		if (submenuId) {
			e.preventDefault();
			e.stopPropagation();
			var $submenu = $("#submenu-" + submenuId);
			var isSubmenuVisible = $submenu.is(":visible");
			
			// If clicking the same item that's already open, close it
			if (isSubmenuVisible && lastClickedItem && lastClickedItem[0] === $item[0]) {
				hideSubmenu();
				lastClickedItem = null;
			} else {
				// Open submenu
				// Close other submenus first
				if (current_submenu && current_submenu.attr("id") !== "submenu-" + submenuId) {
					current_submenu.hide();
				}
				showSubmenu($item, submenuId);
				lastClickedItem = $item;
			}
		} else if (action && menuActions[action]) {
			// Item has action but no submenu - execute it immediately
			e.preventDefault();
			e.stopPropagation();
			menuActions[action]();
		}
	} else {
		// Desktop: click should also work (in addition to hover)
		if (submenuId) {
			e.preventDefault();
			e.stopPropagation();
			// Close other submenus first
			if (current_submenu && current_submenu.attr("id") !== "submenu-" + submenuId) {
				current_submenu.hide();
			}
			showSubmenu($item, submenuId);
		} else if (action && menuActions[action]) {
			e.preventDefault();
			e.stopPropagation();
			menuActions[action]();
		}
	}
});

// Keep submenu open when hovering over it (desktop only)
$(document).on("mouseenter", ".start-submenu", function() {
	if (!isTouchDevice) {
		if (submenu_timer) {
			clearTimeout(submenu_timer);
			submenu_timer = null;
		}
	}
});

$(document).on("mouseleave", ".start-submenu", function() {
	if (!isTouchDevice) {
		var $submenu = $(this);
		setTimeout(function() {
			if (!$submenu.is(":hover")) {
				hideSubmenu();
			}
		}, 100);
	}
});

// Handle nested submenu (Settings)
function handleNestedSubmenu($item) {
	var submenuId = $item.data("submenu");
	var $submenu = $("#submenu-" + submenuId);
	var $parentSubmenu = $item.closest(".start-submenu");
	
	if ($submenu.length) {
		var itemOffset = $item.position();
		var itemTop = itemOffset.top;
		
		$submenu.css({
			top: itemTop + "px",
			left: ($parentSubmenu.outerWidth() + 2) + "px"
		});
		
		// Adjust if submenu goes off screen
		setTimeout(function() {
			var submenuRect = $submenu[0].getBoundingClientRect();
			var viewportWidth = window.innerWidth;
			
			if (submenuRect.right > viewportWidth) {
				$submenu.css({
					left: (-$submenu.outerWidth() - 2) + "px"
				});
			}
		}, 0);
		
		$submenu.show();
	}
}

$(document).on("mouseenter", ".submenu-item.has-submenu", function() {
	if (!isTouchDevice) {
		handleNestedSubmenu($(this));
	}
});

// Handle touch/click for nested submenu items on mobile
var lastClickedSubmenuItem = null;

$(document).on("click", ".submenu-item.has-submenu", function(e) {
	if (isTouchDevice) {
		var $item = $(this);
		var submenuId = $item.data("submenu");
		var action = $item.data("action");
		var $submenu = $("#submenu-" + submenuId);
		
		if ($submenu.length && $submenu.is(":visible")) {
			// Submenu is visible - if clicking same item, close it; otherwise open new one
			if (lastClickedSubmenuItem && lastClickedSubmenuItem[0] === $item[0]) {
				e.preventDefault();
				e.stopPropagation();
				$submenu.hide();
				lastClickedSubmenuItem = null;
			} else {
				e.preventDefault();
				e.stopPropagation();
				handleNestedSubmenu($item);
				lastClickedSubmenuItem = $item;
			}
		} else if ($submenu.length) {
			// Submenu exists but is not visible - open it
			e.preventDefault();
			e.stopPropagation();
			handleNestedSubmenu($item);
			lastClickedSubmenuItem = $item;
		} else if (action && menuActions[action]) {
			// No submenu but has action - execute it
			e.preventDefault();
			e.stopPropagation();
			menuActions[action]();
		}
	}
});

// Menu actions
function launchPortfolioSection(section) {
	if (typeof openPortfolioExplorer === "function") {
		openPortfolioExplorer(section);
	} else {
		Explorer(`programs/landing/index.html${section ? "#" + section : ""}`);
	}
}

var menuActions = {
	"welcome-portfolio": function() {
		if (typeof openWelcomeWindow === "function") {
			openWelcomeWindow();
		} else {
			Explorer("programs/welcome/index.html");
		}
		close_start_menu();
	},
	"curriculum": function() {
		launchPortfolioSection("projects");
		close_start_menu();
	},
	"summer-camps": function() {
		launchPortfolioSection("projects");
		close_start_menu();
	},
	"robotics": function() {
		launchPortfolioSection("projects");
		close_start_menu();
	},
	"ai": function() {
		launchPortfolioSection("projects");
		close_start_menu();
	},
	"book-workshop": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"curriculum-overview": function() {
		launchPortfolioSection("services");
		close_start_menu();
	},
	"lesson-samples": function() {
		launchPortfolioSection("services");
		close_start_menu();
	},
	"case-studies": function() {
		launchPortfolioSection("projects");
		close_start_menu();
	},
	"skills-tools": function() {
		launchPortfolioSection("services");
		close_start_menu();
	},
	"portfolio": function() {
		launchPortfolioSection("hero");
		close_start_menu();
	},
	"framework": function() {
		launchPortfolioSection("about");
		close_start_menu();
	},
	"partners": function() {
		launchPortfolioSection("testimonials");
		close_start_menu();
	},
	"message-gabriel": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"schedule-call": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"collaborate": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"teacher-training": function() {
		launchPortfolioSection("services");
		close_start_menu();
	},
	"robotics-setup": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"curriculum-consultation": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"book-intro-call": function() {
		launchPortfolioSection("contact");
		close_start_menu();
	},
	"take-break": function() {
		systemExecuteFile("/my-pictures/");
		close_start_menu();
	},
	"launch-universe": function() {
		launchPortfolioSection("hero");
		close_start_menu();
	}
};

// Handle submenu item clicks
$(document).on("click", ".submenu-item", function(e) {
	var $item = $(this);
	var action = $item.data("action");
	var hasSubmenu = $item.hasClass("has-submenu");
	
	// On touch devices, items with submenus are handled separately above
	if (isTouchDevice && hasSubmenu) {
		return; // Already handled by the has-submenu handler
	}
	
	// Execute action if item has one and no submenu (or on desktop)
	if (action && menuActions[action] && !hasSubmenu) {
		e.preventDefault();
		e.stopPropagation();
		menuActions[action]();
	}
});

// Make sure Explorer and systemExecuteFile are available
if (typeof Explorer === 'undefined') {
	console.warn("Explorer function not found. Make sure programs.js is loaded.");
}
if (typeof systemExecuteFile === 'undefined') {
	console.warn("systemExecuteFile function not found. Make sure programs.js is loaded.");
}
