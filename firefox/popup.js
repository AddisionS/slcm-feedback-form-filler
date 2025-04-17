function saveAutoSubmitState() {
    const autoSubmitEnabled = document.getElementById('autoSubmit').checked;
    localStorage.setItem('autoSubmitEnabled', autoSubmitEnabled);
}

function loadAutoSubmitState() {
    const autoSubmitEnabled = localStorage.getItem('autoSubmitEnabled') === 'true';
    document.getElementById('autoSubmit').checked = autoSubmitEnabled;
}

loadAutoSubmitState();

document.getElementById('autoSubmit').addEventListener('change', saveAutoSubmitState);


function sendMessage(action) {
  const autoSubmitEnabled = document.getElementById('autoSubmit').checked;

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];

    chrome.tabs.executeScript(tab.id, { file: "content.js" }, () => {
      chrome.tabs.sendMessage(tab.id, { action, autoSubmitEnabled });
    });
  });
}

  
  document.getElementById("good").addEventListener("click", () => sendMessage("all_good"));
  document.getElementById("bad").addEventListener("click", () => sendMessage("all_bad"));
  