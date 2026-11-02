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

        if (data.selectedWord) {
            searchTatoeba(data.selectedWord);
        }

    } catch (error) {
        console.error("Storage error:", error);

        selectedWordElement.textContent = "Error loading word";
    }

});
async function searchTatoeba(word) {
    const url = `https://api.tatoeba.org/v1/sentences?lang=deu&q=${encodeURIComponent(word)}&sort=-words&limit=20&word_count=6+&trans:lang=eng&trans:is_direct=yes`;
    const response = await fetch(url);

    const data = await response.json();
    const longSentences = data.data.filter(sentence => {
        return sentence.text.trim().split(/\s+/).length >= 6;
    });
    console.log(longSentences);
    console.log(data);
    console.log(data.data[0]);
}