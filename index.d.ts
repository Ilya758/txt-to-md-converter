export interface IAppAPI {
  openFile: (isEdited: boolean) => void;

  onOpenFile: (
    cb: (event: IpcRendererEvent, ...args: [string, string]) => void
  ) => void;

  changeContent: (isEdited: boolean, filePath: string) => void;

  saveFile: (content: string) => void;

  onSaveFile: (cb: (event: IpcRendererEvent, filePath: string) => void) => void;

  revertChanges: () => void;

  addNewFile: (isEdited: boolean) => void;

  onAddNewFile: (cb: () => void) => void;

  openInDefaultEditor: (filePath: string) => void;

  showItemInFolder: (filePath: string) => void;
}

export interface IDragAPI {
  onDrop: (isEdited: boolean, filePath: string) => void;
}

declare global {
  interface Window {
    appAPI: IAppAPI;
    dragAPI: IDragAPI;
  }
}
