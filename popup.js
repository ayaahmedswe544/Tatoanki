document.addEventListener("DOMContentLoaded", async () => {

    const selectedWordElement =
        document.getElementById("selected-word");

    console.log("Popup JavaScript loaded!");

    if (!selectedWordElement) {
        console.error("selected-word element not found!");
        return;
    }

    try {
        const data = await chrome.storage.local.get("selectedWord");

        console.log("Retrieved data:", data);

        selectedWordElement.textContent =
            data.selectedWord || "No word selected";

    } catch (error) {
        console.error("Storage error:", error);

        selectedWordElement.textContent = "Error loading word";
    }

});