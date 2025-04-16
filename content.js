function fillFeedback(option, autoSubmitEnabled) {
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => fillFeedback(option, autoSubmitEnabled));
      return;
    }
  
    const radios = document.querySelectorAll('input[type="radio"]');
    const isGood = option === "good";
  
    radios.forEach(radio => {
      const isYes = radio.classList.contains("yescheck");
      if ((isGood && isYes) || (!isGood && !isYes)) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change'));
      }
    });
  
    ["dtPartYes1", "dtPartYes2"].forEach(id => {
      const dropdown = document.getElementById(id);
      if (dropdown) {
        dropdown.value = isGood ? "Y" : "N";
        dropdown.dispatchEvent(new Event('change'));
      }
    });
  
    const submit = document.getElementById("btnSubmit");
  
    if (autoSubmitEnabled && submit) {
      submit.click();
    } else {
      console.warn("Submit button not found or auto-submit disabled");
    }
  }
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "all_good") {
      fillFeedback("good", msg.autoSubmitEnabled);
    } else if (msg.action === "all_bad") {
      fillFeedback("bad", msg.autoSubmitEnabled);
    }
  });
  