# slcm-feedback-form-filler
This is a web extension that can be used to automate the process of filling out the feedback form on MUJ's SLCM portal
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# Features and usage
The user will have 2 options 
  - All Yes
  - All No

Once the user selects an option, all the questions in the form will be set to the user's response 
The extension also comes with the auto submit feature; the user needs to select the auto submit option once, and then the forms will be auto submitted for every response
To disable auto submit user can simply toggle it again

## Firefox Installation Guide

### Installation Steps
> **_NOTE:_**  This extension is temporarly added to browser once you close the browser it closes to.

1. **Download or Clone the Repository**

   ```bash
   git clone https://github.com/AddisionS/slcm-feedback-form-filler.git
   cd slcm-feedback-form-filler 
   ```
2. **In the address bar, enter:**
    ```
    about:debugging
    ```
3. **Click on "This Firefox" from the left sidebar.**

4. **Click "Load Temporary Add-on"**.

5. Navigate to the folder where you cloned or extracted the project, and select the file named `manifest.json`.

The extension will now be loaded temporarily in Firefox.


## Chrome Installation Guide

### Installation Steps


1. **Download or Clone the Repository**

   ```bash
   git clone https://github.com/AddisionS/slcm-feedback-form-filler.git
   cd slcm-feedback-form-filler 
   ```
2. **In the address bar, enter:**
    ```
    chrome://extensions
    ```
3. **Enable Developer Mode**

    Toggle the Developer mode switch in the top right corner.

4. Load the Extension

    Click on `Load unpacked` and select the chrome folder.

The Extension will be added now.
# License 
This project is licensed under the [MIT License](LICENSE).
