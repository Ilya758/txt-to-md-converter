import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';

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

const updateUserInterface = (isEdited: boolean, filePath?: string) => {
  let title = 'text-to-md-converter';

  if (filePath) {
    title = `${path.basename(filePath)} - ${title}`;
  } else {
    title = `Untitled - ${title}`;
  }

  if (isEdited) {
    title = `${title} - Edited`;
  }

  mainWindow.setTitle(title);
};

const createDialog = (message: string) =>
  dialog.showMessageBox(mainWindow, {
    message,
    buttons: ['OK', 'Cancel'],
    type: 'warning',
  });

const openDialog = async (isEdited: boolean) => {
  let confirm: Electron.MessageBoxReturnValue;

  if (isEdited) {
    confirm = await createDialog('Do you really want to open a file?');
  }

  if ((isEdited && confirm.response === 0) || !isEdited) {
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
  }
};

const createNewFile = async (isEdited: boolean) => {
  let confirm: Electron.MessageBoxReturnValue;

  if (isEdited) {
    confirm = await createDialog('Do you really want to create a new file?');
  }

  if ((isEdited && confirm.response === 0) || !isEdited) {
    updateUserInterface(false);

    mainWindow.webContents.send('file-added');
  }
};

const openFile = async (filePath: string) => {
  const content = await promises.readFile(filePath, 'utf8');

  mainWindow.webContents.send('file-opened', filePath, content);
};

const writeFile = async (content: string) => {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    buttonLabel: 'Save file',
    title: 'Save file',
    filters: [
      {
        name: 'Text files',
        extensions: ['txt'],
      },
      {
        name: 'Markdown',
        extensions: ['md'],
      },
    ],
  });

  if (canceled) return;

  await promises.writeFile(filePath, content);

  mainWindow.webContents.send('file-saved', filePath);

  updateUserInterface(false, filePath);
};

const openFileInDefaultEditor = (filePath: string) => {
  shell.openPath(filePath);
};

const showItemInFolder = (filePath: string) => {
  shell.showItemInFolder(filePath);
};

ipcMain.handle('open-file', (_, isEdited: boolean) => {
  openDialog(isEdited);
});

ipcMain.handle('file-save', (_, content: string) => {
  writeFile(content);
});

ipcMain.handle(
  'file-content-change',
  (_, isEdited: boolean, filePath: string) => {
    updateUserInterface(isEdited, filePath);
  }
);

ipcMain.handle('file-revert', () => {
  updateUserInterface(false);
});

ipcMain.handle('file-create', (_, isEdited: boolean) => {
  createNewFile(isEdited);
});

ipcMain.handle('open-default', (_, filePath: string) =>
  openFileInDefaultEditor(filePath)
);

ipcMain.handle('show-filepath', (_, filePath: string) => {
  showItemInFolder(filePath);
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
