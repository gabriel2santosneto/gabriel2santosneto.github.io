// === Custom Desktop Icon: My Pictures ===
(function () {
  try {
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:20px; top:20px; width:80px; text-align:center; cursor:default;">
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

// === Custom Desktop Icon: Summer Camp ===
(function () {
  try {
    const $icon = $(`
      <div class="desktop-icon" style="position:absolute; left:20px; top:120px; width:90px; text-align:center; cursor:default;">
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