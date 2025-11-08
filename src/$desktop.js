
var $desktop = $(".desktop");
$desktop.css("touch-action", "none"); // TODO: should this be in FolderView, or is it to prevent scrolling the page or what?

var folder_view = new FolderView(desktop_folder_path, {
	asDesktop: true,
	openFileOrFolder: (path) => { // Note: may not be defined yet, so wrapping with a function.
		systemExecuteFile(path);
	},
});
$(folder_view.element).appendTo($desktop);

function setDesktopWallpaper(file, repeat, saveToLocalStorage) {
	const blob_url = URL.createObjectURL(file);
	$desktop.css({
		backgroundImage: `url(${blob_url})`,
		backgroundRepeat: repeat,
		backgroundPosition: "center",
		backgroundSize: "auto",
	});
	if (saveToLocalStorage) {
		var fr = new FileReader();
		window.fr = fr;
		fr.onload = () => {
			localStorage.setItem("wallpaper-data-url", fr.result);
			localStorage.setItem("wallpaper-repeat", repeat);
		};
		fr.onerror = () => {
			console.error("Error reading file (for setting wallpaper)", file);
		};
		fr.readAsDataURL(file);
	}
}
try {
	var wallpaper_data_url = localStorage.getItem("wallpaper-data-url");
	var wallpaper_repeat = localStorage.getItem("wallpaper-repeat");
	var theme_file_content = localStorage.getItem("desktop-theme");
	if (wallpaper_data_url) {
		fetch(wallpaper_data_url).then(r => r.blob()).then(file => {
			setDesktopWallpaper(file, wallpaper_repeat, false);
		});
	}
	if (theme_file_content) {
		loadThemeFromText(theme_file_content);
	}
} catch (error) {
	console.error(error);
}

// Prevent drag and drop from redirecting the page (the browser default behavior for files)
// TODO: only prevent if there are actually files; there's nothing that uses text inputs atm that's not in an iframe, so it doesn't matter YET (afaik)
// $G.on("dragover", function(e){
// 	e.preventDefault();
// });
// $G.on("drop", function(e){
// 	e.preventDefault();
// });

function loadThemeFile(file) {
	var reader = new FileReader();
	reader.onload = () => {
		loadThemeFromText(reader.result);
	};
	reader.readAsText(file);
}
function applyTheme(cssProperties, documentElement = document.documentElement) {
	applyCSSProperties(cssProperties, { element: documentElement, recurseIntoIframes: true });
}
function loadThemeFromText(fileText) {
	var cssProperties = parseThemeFileString(fileText);
	applyTheme(cssProperties);
	window.themeCSSProperties = cssProperties;
}

$("html").on("dragover", function (event) {
	event.preventDefault();
	event.stopPropagation();
});
$("html").on("dragleave", function (event) {
	event.preventDefault();
	event.stopPropagation();
});
$("html").on("drop", function (event) {
	event.preventDefault();
	event.stopPropagation();
	var files = [...event.originalEvent.dataTransfer.files];
	for (var file of files) {
		if (file.name.match(/\.theme(pack)?$/i)) {
			loadThemeFile(file);
		}
	}
});

// Despite overflow:hidden on html and body,
// focusing elements that are partially offscreen can still scroll the page.
// For example, with opening Paint and moving it partially offscreen and opening Image > Attributes,
// the default focused button can scroll the entire desktop.
// We need to prevent (reset) scroll, and also avoid scrollIntoView().
$(window).on("scroll focusin", () => {
	window.scrollTo(0, 0);
});


// === Custom Desktop Icon: My Pictures (added by ChatGPT) ===
(function () {
  try {
    // Create the icon element
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:40px; top:40px; width:80px; text-align:center; cursor:default;">
        <img src="images/icons/folder-pictures.png" width="32" height="32" alt="My Pictures">
        <div class="label" style="margin-top:4px; color:#000; text-shadow:1px 1px #fff; font-family:'MS Sans Serif', Tahoma, Arial; font-size:12px;">
          My Pictures
        </div>
      </div>
    `);

    function openMyPictures() {
      // Preferred: open inside a window in the OS UI
      if (typeof window.openWindow === "function") {
        openWindow({
          title: "My Pictures",
          width: 720,
          height: 520,
          html: `<iframe src="my-pictures copy/index.html" style="border:0; width:100%; height:100%;"></iframe>`
        });
      } else if (typeof window.openIframeApp === "function") {
        openIframeApp({ title: "My Pictures", src: "my-pictures copy/index.html", width: 720, height: 520 });
      } else {
        // Fallback: open in a new browser tab
        window.open("my-pictures copy/index.html", "_blank");
      }
    }

    // Double-click to open
    $icon.on("dblclick", openMyPictures);

    // Attach to desktop when it exists
    const $desktop = $(".desktop");
    if ($desktop && $desktop.length) {
      $desktop.append($icon);
    } else {
      // if desktop isn't mounted yet, wait a tick
      setTimeout(() => $(".desktop").append($icon), 500);
    }
  } catch (e) {
    console && console.error("Failed to add My Pictures icon:", e);
  }
})();
// === /Custom Desktop Icon ===


// === Custom Desktop Icon: Summer Camp (added by ChatGPT) ===
(function () {
  try {
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:140px; top:40px; width:90px; text-align:center; cursor:default;">
        <img src="images/icons/folder-pictures.png" width="32" height="32" alt="Summer Camp">
        <div class="label" style="margin-top:4px; color:#000; text-shadow:1px 1px #fff; font-family:'MS Sans Serif', Tahoma, Arial; font-size:12px;">
          Summer Camp
        </div>
      </div>
    `);

    function openSummerCamp() {
      if (typeof window.openWindow === "function") {
        openWindow({
          title: "Summer Camp",
          width: 720,
          height: 520,
          html: `<iframe src="summer camp/index.html" style="border:0; width:100%; height:100%;"></iframe>`
        });
      } else if (typeof window.openIframeApp === "function") {
        openIframeApp({ title: "Summer Camp", src: "summer camp/index.html", width: 720, height: 520 });
      } else {
        window.open("summer camp/index.html", "_blank");
      }
    }

    $icon.on("dblclick", openSummerCamp);
    const $desktop = $(".desktop");
    if ($desktop && $desktop.length) {
      $desktop.append($icon);
    } else {
      setTimeout(() => $(".desktop").append($icon), 500);
    }
  } catch (e) {
    console && console.error("Failed to add Summer Camp icon:", e);
  }
})();
// === /Custom Desktop Icon: Summer Camp ===

