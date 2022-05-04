export interface IState {
  content: string;
  filePath: string;
  textAreaValue: string;
}

export const initialState: IState = {
  content: '',
  filePath: '',
  textAreaValue: '',
};
