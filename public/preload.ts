import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type TOpenFileCb = (
  event: IpcRendererEvent,
  ...args: [string, string]
) => void;

contextBridge.exposeInMainWorld('appAPI', {
  openFile: () => {
    ipcRenderer.invoke('open-file');
  },

  onOpenFile: (cb: TOpenFileCb) => {
    ipcRenderer.on('file-opened', cb);
  },
});
