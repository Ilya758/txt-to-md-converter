import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type TOpenFileCb = (
  event: IpcRendererEvent,
  ...args: [string, string]
) => void;

contextBridge.exposeInMainWorld('appAPI', {
  openFile: (isEdited: boolean) => {
    ipcRenderer.invoke('open-file', isEdited);
  },

  onOpenFile: (cb: TOpenFileCb) => {
    ipcRenderer.on('file-opened', cb);
  },

  changeContent: (isEdited: boolean, filePath: string) => {
    ipcRenderer.invoke('file-content-change', isEdited, filePath);
  },

  saveFile: (content: string) => {
    ipcRenderer.invoke('file-save', content);
  },

  onSaveFile: (cb: (event: IpcRendererEvent, filePath: string) => void) => {
    ipcRenderer.on('file-saved', cb);
  },

  revertChanges: () => {
    ipcRenderer.invoke('file-revert');
  },

  addNewFile: (isEdited: boolean) => {
    ipcRenderer.invoke('file-create', isEdited);
  },

  onAddNewFile: (cb: () => void) => {
    ipcRenderer.on('file-added', cb);
  },

  openInDefaultEditor: (filePath: string) => {
    ipcRenderer.invoke('open-default', filePath);
  },

  showItemInFolder: (filePath: string) => {
    ipcRenderer.invoke('show-filepath', filePath);
  },
});
