const selectedWordElement = document.getElementById("selected-word");
const examplesElement = document.getElementById("examples");
const addButton = document.getElementById("add-to-anki");
async function getSelectedWord() {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    if (!tab || !tab.id) {
        selectedWordElement.textContent = "No active tab found";
        return;
    }

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString().trim()
    });

    const word = results[0].result;
    if (word) {
        selectedWordElement.textContent = word;
    } else {
        selectedWordElement.textContent = "No word selected";
    }
}
addButton.addEventListener("click", () => {
    console.log("Add to Anki clicked!");
});
getSelectedWord();