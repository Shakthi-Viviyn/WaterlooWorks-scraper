
chrome.tabs.onCreated.addListener(function(tab) {

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message === "ready") {
        (async () => {
          const response = await chrome.tabs.sendMessage(tab.id, "test");
        })();
      }
      if (message === "close") {
        chrome.tabs.remove(sender.tab.id);
      }
    });
});


  