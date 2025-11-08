
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


// === Custom Desktop Icons (added; keeps all original logic above) ===

// -- My Pictures --
(function () {
  try {
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:20px; top:20px; width:90px; text-align:center; cursor:default;">
        <img draggable="false" src="images/icons/folder-open-32x32.png" width="32" height="32" alt="My Pictures">
        <div class="label" style="margin-top:4px; color:#000; text-shadow:1px 1px #fff; font-family:'MS Sans Serif', Tahoma, Arial; font-size:12px;">
          My Pictures
        </div>
      </div>
    `);

    function openMyPictures() {
      if (typeof window.openWindow === "function") {
        openWindow({
          title: "My Pictures",
          width: 720,
          height: 520,
          html: `<iframe src="my-pictures copy/index.html" style="border:0; width:100%; height:100%;"></iframe>`
        });
      } else {
        window.open("my-pictures copy/index.html", "_blank");
      }
    }

    $icon.on("dblclick", openMyPictures);
    $(".desktop").append($icon);
  } catch (e) {
    console && console.error("Failed to add My Pictures icon:", e);
  }
})();

// -- Summer Camp --
(function () {
  try {
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:20px; top:120px; width:100px; text-align:center; cursor:default;">
        <img draggable="false" src="images/icons/favorites-folder-32x32.png" width="32" height="32" alt="Summer Camp">
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
      } else {
        window.open("summer camp/index.html", "_blank");
      }
    }

    $icon.on("dblclick", openSummerCamp);
    $(".desktop").append($icon);
  } catch (e) {
    console && console.error("Failed to add Summer Camp icon:", e);
  }
})();

// === /Custom Desktop Icons ===

