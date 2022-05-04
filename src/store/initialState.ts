export interface IState {
  content: string;
  filePath: string;
  isEdited: boolean;
  textAreaValue: string;
}

export const initialState: IState = {
  content: '',
  filePath: '',
  isEdited: false,
  textAreaValue: '',
};
