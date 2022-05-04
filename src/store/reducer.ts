import { SET_DATA, SET_TEXTAREA_VALUE } from './actions';
import { initialState, IState } from './initialState';

export interface IAction {
  type: string;
  payload: unknown;
}

export type TPayloadSetData = {
  filePath: string;
  content: string;
};

export type TPayloadString = string;

export const reducer = (
  state: IState = initialState,
  { payload, type }: IAction
) => {
  switch (type) {
    case SET_DATA: {
      const { content, filePath } = payload as TPayloadSetData;

      return {
        ...state,
        content,
        filePath,
        textAreaValue: content,
      };
    }

    case SET_TEXTAREA_VALUE: {
      const textAreaValue = payload as TPayloadString;

      return {
        ...state,
        textAreaValue,
      };
    }

    default: {
      return state;
    }
  }
};
