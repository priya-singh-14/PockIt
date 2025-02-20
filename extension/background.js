chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ["content.js"]
        }).then(() => {
            chrome.tabs.sendMessage(tab.id, { action: "save_product" });
        }).catch(err => console.error("Failed to inject script:", err));
    } else {
        console.error("No active tab found.");
    }
});
