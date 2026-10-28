# slcm-feedback-form-filler

This is a web extension that can be used to automate the process of filling out the feedback form on MUJ's SLCM portal

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version](https://img.shields.io/badge/version-2.0.0-green.svg)

# Features and usage

v2 replaces the old "All Yes / All No" buttons with a single **overall rating slider (1 to 10)**.

Pick a rating, click **Fill comment**, and the extension will:

- Answer all the Yes/No questions on the form (the radio rows and the two Yes/No dropdowns), with the share of "Yes" answers matching your rating
- Shuffle which questions get Yes and which get No, so the answers aren't all in a row
- Write a short comment in the **Comments** box that matches your rating
- Show a summary in the popup, for example `Rating 7/10: 35 Yes / 17 No of 52, comment filled.`

| Rating | Approx. "Yes" answers |
| ------ | --------------------- |
| 1      | 15%                   |
| 3      | 29%                   |
| 5      | 44%                   |
| 7      | 59%                   |
| 10     | 85%                   |

The extension also comes with the auto submit feature; the user needs to select the auto submit option once, and then the forms will be auto submitted after every fill
To disable auto submit user can simply toggle it again

> ***NOTE:*** The extension only runs when you click it in the popup, and only on the tab you are currently viewing. Open the feedback form first, then click **Fill comment**. Review the form before submitting if auto submit is off.

## Firefox Installation Guide

Get it on firefox [![Get it on Firefox](https://img.shields.io/amo/v/slcm-feedback-auto-fill?logo=firefox&label=Firefox&color=ff7139)](https://addons.mozilla.org/en-US/firefox/addon/slcm-feedback-auto-fill/)

Install it straight from the Firefox Add-ons page and it will keep itself updated, no manual steps needed.

or install it manually:

### Installation Steps

> ***NOTE:*** A manual install is temporary; once you close the browser the extension is removed too. Use the Firefox Add-ons link above if you want it to stay.

1. **Download or Clone the Repository**

   ```
   git clone https://github.com/AddisionS/slcm-feedback-form-filler.git
   cd slcm-feedback-form-filler
   ```
2. **In the address bar, enter:**

   ```
   about:debugging
   ```
3. **Click on "This Firefox" from the left sidebar.**
4. **Click "Load Temporary Add-on"**.
5. Open the `firefox` folder and select the file named `manifest.json`.

The extension will now be loaded temporarily in Firefox.

## Chrome Installation Guide

### Installation Steps

1. **Download or Clone the Repository**

   ```
   git clone https://github.com/AddisionS/slcm-feedback-form-filler.git
   cd slcm-feedback-form-filler
   ```
2. **In the address bar, enter:**

   ```
   chrome://extensions
   ```
3. **Enable Developer Mode**

   Toggle the Developer mode switch in the top right corner.
4. **Load the Extension**

   Click on `Load unpacked` and select the `chrome` folder.

The Extension will be added now.

# What changed in v2

- Rating slider (1 to 10) instead of All Yes / All No
- Rating-based comment written into the `Remarks` box
- Handles the two Yes/No dropdowns (questions 11 and 12), so the form validates on submit
- Answers are applied through the page's own handlers, so the form submits correctly
- Auto submit waits briefly so every answer is registered first
- The popup shows what was filled, or an error if the form wasn't found
- Only injects when clicked, instead of running on every site

# Disclaimer

This tool fills in your own feedback form for you. Use it honestly and in line with your university's rules; you are responsible for what gets submitted.

# License

This project is licensed under the [MIT License](LICENSE).