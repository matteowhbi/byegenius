chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "redirectDunce" && message.songId) {
    const dunceUrl = `https://dunce.app/song/${message.songId}`;
    if (sender.tab && sender.tab.id) {
      chrome.tabs.update(sender.tab.id, { url: dunceUrl });
    }
  }
});