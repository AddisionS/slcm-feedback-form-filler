// SLCM Feedback Helper v2 - content script
const YES_PERCENT = [15, 22, 29, 36, 44, 51, 59, 67, 76, 85]; // index = rating - 1

function clampRating(r) {
  return Math.max(1, Math.min(10, Math.round(Number(r) || 1)));
}

function commentForRating(rating) {
  if (rating <= 3) return "My overall experience has been below expectations, and I feel there is room for improvement.";
  if (rating <= 5) return "My overall experience has been mixed, with some aspects working well and others needing improvement.";
  if (rating <= 7) return "My overall experience has been fairly positive, though some aspects could still be improved.";
  if (rating <= 8) return "My overall experience has been positive, with a few areas that could be improved further.";
  return "My overall experience has been very positive and has supported my learning well.";
}

// Group radios by name -> one entry per question row: { yes, no }
function getQuestionRows() {
  const groups = new Map();
  document.querySelectorAll('input[type="radio"][name^="toggle_"]').forEach(r => {
    if (!groups.has(r.name)) groups.set(r.name, {});
    groups.get(r.name)[r.classList.contains("yescheck") ? "yes" : "no"] = r;
  });
  return [...groups.values()].filter(g => g.yes && g.no);
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Q11/Q12 are Yes/No dropdowns (#dtPartYes1, #dtPartYes2), not radios
function getDropdowns() {
  return ["dtPartYes1", "dtPartYes2"].map(id => document.getElementById(id)).filter(Boolean);
}

function applyRadioDistribution(rating) {
  const rows = getQuestionRows();
  const dropdowns = getDropdowns();
  const total = rows.length + dropdowns.length;
  if (!total) return { ok: false, message: "No Yes/No questions found on this page." };

  const yesPercent = YES_PERCENT[rating - 1];
  const yesCount = Math.round(total * yesPercent / 100);
  const picks = shuffle([...Array(yesCount).fill(true), ...Array(total - yesCount).fill(false)]);

  // .click() / change event fires the page's own onchange -> OnSelect(), which builds AnsStr
  rows.forEach((row, i) => row[picks[i] ? "yes" : "no"].click());

  dropdowns.forEach((sel, i) => {
    sel.value = picks[rows.length + i] ? "Y" : "N";
    sel.dispatchEvent(new Event("change", { bubbles: true }));
  });

  return { ok: true, total, yesCount, noCount: total - yesCount, yesPercent };
}

function applyComment(rating) {
  const box = document.getElementById("Remarks");
  if (!box) return { ok: false, message: "Comment field #Remarks not found." };
  box.value = commentForRating(rating).slice(0, 250);
  box.dispatchEvent(new Event("input", { bubbles: true }));
  box.dispatchEvent(new Event("change", { bubbles: true }));
  return { ok: true };
}

function run(rawRating, autoSubmit) {
  const rating = clampRating(rawRating);
  const radios = applyRadioDistribution(rating);
  if (!radios.ok) return { ok: false, message: radios.message };

  const comment = applyComment(rating);
  if (!comment.ok) return { ok: false, message: comment.message };

  let message = `Rating ${rating}/10: ${radios.yesCount} Yes / ${radios.noCount} No of ${radios.total}, comment filled.`;

  if (autoSubmit) {
    const submit = document.getElementById("btnSubmit");
    if (!submit) return { ok: true, message: message + " Submit button not found." };
    setTimeout(() => submit.click(), 300); // let OnSelect finish updating AnsStr
    message += " Submitting...";
  }
  return { ok: true, message };
}

if (!globalThis.__slcmFeedbackHelperListenerInstalled) {
  globalThis.__slcmFeedbackHelperListenerInstalled = true;
  const runtime = globalThis.chrome?.runtime ?? globalThis.browser?.runtime;
  runtime?.onMessage?.addListener((msg, sender, sendResponse) => {
    if (msg.action !== "apply_rating") return;
    sendResponse(run(msg.rating, msg.autoSubmitEnabled));
  });
}
