chrome.runtime.onInstalled.addListener(() => {
    console.log("Tatoeba Anki installed!");

    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: "add-to-tatoeba-anki",
            title: "Add to Tatoeba Anki",
            contexts: ["selection"]
        });
    });
});
chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "add-to-tatoeba-anki") {
        const word = info.selectionText?.trim();

        if (!word) return;

        await chrome.storage.local.set({ selectedWord: word });

        await chrome.action.openPopup();
    }
});