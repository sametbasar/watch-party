chrome.runtime.onInstalled.addListener(() => {
  // chrome.tabs.create({ url: "../../pages/welcome/page.html" });
});

chrome.runtime.onMessage.addListener((message) => {
  (async () => {
    if (message.type === "open_party_panel") {
      chrome.scripting
        .executeScript({
          target: { tabId: message.id },
          files: [
            "assets/js/minify/socket.io.min.js",
            "assets/js/minify/injected-script.min.js",
            "assets/js/minify/netflix-control.min.js",
          ],
        })
        .then(() => console.log("injected watch party scripts file"))
        .catch((e) => console.log(e));
    }
  })();
});
