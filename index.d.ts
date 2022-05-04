export interface IAppAPI {
  openFile: () => void;

  onOpenFile: (
    cb: (event: IpcRendererEvent, ...args: [string, string]) => void
  ) => void;
}

declare global {
  interface Window {
    appAPI: IAppAPI;
  }
}
