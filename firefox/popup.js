const ratingInput = document.getElementById("rating");
const ratingValue = document.getElementById("ratingValue");
const ratingLabel = document.getElementById("ratingLabel");
const autoSubmitInput = document.getElementById("autoSubmit");
const status = document.getElementById("status");

const labels = {
  1: "Very poor", 2: "Very poor", 3: "Poor", 4: "Below average",
  5: "Mixed", 6: "Fairly good", 7: "Good", 8: "Very good",
  9: "Excellent", 10: "Excellent"
};

function refreshRating() {
  const rating = Number(ratingInput.value);
  ratingValue.value = `${rating}/10`;
  ratingLabel.textContent = labels[rating];
}

function saveSettings() {
  localStorage.setItem("autoSubmitEnabled", String(autoSubmitInput.checked));
}

ratingInput.addEventListener("input", refreshRating);
autoSubmitInput.addEventListener("change", saveSettings);
autoSubmitInput.checked = localStorage.getItem("autoSubmitEnabled") === "true";
refreshRating();

function sendRating() {
  status.textContent = "";
  const rating = Number(ratingInput.value);
  const autoSubmitEnabled = autoSubmitInput.checked;

  const api = globalThis.chrome ?? globalThis.browser;
  api.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs && tabs[0];
    if (!tab?.id) {
      status.textContent = "Could not find the active tab.";
      return;
    }
    const run = () => api.tabs.sendMessage(tab.id, {
      action: "apply_rating", rating, autoSubmitEnabled
    }, response => {
      const err = api.runtime.lastError;
      status.textContent = err
        ? `Could not contact the page: ${err.message}`
        : (response?.message || "No response from the page.");
    });

    if (api.scripting?.executeScript) {
      api.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] }, () => {
        const err = api.runtime.lastError;
        if (err) status.textContent = `Could not inject into this page: ${err.message}`;
        else run();
      });
    } else {
      api.tabs.executeScript(tab.id, { file: "content.js" }, () => {
        const err = api.runtime.lastError;
        if (err) status.textContent = `Could not inject into this page: ${err.message}`;
        else run();
      });
    }
  });
}

document.getElementById("applyRating").addEventListener("click", sendRating);
