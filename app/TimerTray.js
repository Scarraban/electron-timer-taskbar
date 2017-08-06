const electron = require('electron');
const { app, Tray, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }
  onClick(event, bounds) {
    const mainWindow = this.mainWindow;
    // Event Bounds / Heights
    const { x, y } = bounds;
    const trayHeight = bounds.height;
    // Window Bounds
    const {width, height} = mainWindow.getBounds();
    if(mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const newPos = {
        x: Math.floor(x - (width / 2)),
        y: y > 0 ? (y - height) : y + trayHeight,
        width: width,
        height: height
      };
      mainWindow.setBounds(newPos);
      mainWindow.show();
    }
  }
  onRightClick(event, bounds) {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
