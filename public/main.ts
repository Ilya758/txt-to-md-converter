import { app, BrowserWindow, ipcMain, dialog } from 'electron';

import path from 'path';
import { promises } from 'fs';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow | null = null;

if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // mainWindow.webContents.openDevTools();
};

const updateUserInterface = (isEdited: boolean, filePath: string) => {
  let title = 'text-to-md-converter';

  if (filePath) {
    title = `${path.basename(filePath)} - ${title}`;
  }

  if (isEdited) {
    title = `${title} - Edited`;
  }

  mainWindow.setTitle(title);
};

const openDialog = async () => {
  const files = await dialog.showOpenDialog(mainWindow, {
    buttonLabel: 'Open!',
    title: 'Open file!',
    filters: [
      {
        name: 'Text files',
        extensions: ['text', 'txt'],
      },
      {
        name: 'Markdown',
        extensions: ['md', 'markdown'],
      },
    ],
  });

  if (!files.filePaths[0]) return;

  const filePath = files.filePaths[0];

  openFile(filePath);

  updateUserInterface(false, filePath);
};

const openFile = async (filePath: string) => {
  const content = await promises.readFile(filePath, 'utf8');

  mainWindow.webContents.send('file-opened', filePath, content);
};

ipcMain.handle('open-file', () => {
  openDialog();
});

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
