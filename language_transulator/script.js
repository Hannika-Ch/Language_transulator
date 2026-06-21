// Translate Text
async function translateText() {
    const text = document.getElementById("inputText").value;
    const source = document.getElementById("sourceLang").value;
    const target = document.getElementById("targetLang").value;

    if (text.trim() === "") {
        alert("Please enter text");
        return;
    }

    try {
        document.getElementById("outputText").value = "Translating...";

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        );

        const data = await response.json();

        document.getElementById("outputText").value =
            data.responseData.translatedText;

    } catch (error) {
        console.error(error);
        document.getElementById("outputText").value =
            "Translation Failed";
    }
}

// Copy Text
function copyText() {
    const output = document.getElementById("outputText");

    if (output.value === "") {
        alert("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(output.value)
        .then(() => {
            alert("Copied Successfully!");
        });
}

// Speak Text
function speakText() {
    const text = document.getElementById("outputText").value;

    if (text === "") {
        alert("No translated text available");
        return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = document.getElementById("targetLang").value;

    window.speechSynthesis.speak(speech);
}

// Voice Input
function startVoiceInput() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice Input not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById("inputText").value =
            event.results[0][0].transcript;
    };

    recognition.onerror = function(event) {
        console.log(event.error);
        alert("Voice recognition failed.");
    };
}

// Clear Text
function clearText() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
}

// Swap Languages
function swapLanguages() {

    const source =
        document.getElementById("sourceLang");

    const target =
        document.getElementById("targetLang");

    let temp = source.value;
    source.value = target.value;
    target.value = temp;
}