const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(urlPath) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: {
        // Ensure Chromium does not throttle the processing,
        // ensuring counter continues to run when closed.
        backgroundThrottling: false
      }
    });

    this.loadURL(urlPath);
    this.on('blur', this.onBlur.bind(this));
  }
  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;
