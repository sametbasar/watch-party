//const matcherURL = ["netflix.com"];
const matcherURL = ["test"];
const button = document.getElementById("watch");

const checkUrl = () => {
  chrome.tabs.query({ active: true }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.url.includes(matcherURL)) {
        button.style.display = "none";
      }
    });
  });
};

button.addEventListener("click", async () => {
  chrome.tabs.query({ active: true }, async (tabs) => {
    await chrome.runtime.sendMessage({
      type: "open_party_panel",
      id: tabs[0]?.id ?? 0,
    });
    window.close();
  });
});

checkUrl();
