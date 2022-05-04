import {
  ADD_NEW_FILE,
  REVERT_CHANGES,
  SAFE_FILE,
  SET_DATA,
  SET_TEXTAREA_VALUE,
} from './actions';
import { initialState, IState } from './initialState';

export interface IAction {
  type: string;
  payload?: unknown;
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
    case ADD_NEW_FILE: {
      return {
        ...state,
        content: '',
        filePath: '',
        isEdited: false,
        textAreaValue: '',
      };
    }

    case SET_DATA: {
      const { content, filePath } = payload as TPayloadSetData;

      return {
        ...state,
        isEdited: false,
        content,
        filePath,
        textAreaValue: content,
      };
    }

    case SET_TEXTAREA_VALUE: {
      const newContent = payload as TPayloadString;

      const fixedExistingContent = state.content.replace('\r', '');

      return {
        ...state,
        isEdited: fixedExistingContent !== newContent,
        textAreaValue: newContent,
      };
    }

    case SAFE_FILE: {
      return {
        ...state,
        content: state.textAreaValue,
        isEdited: false,
        filePath: payload as TPayloadString,
      };
    }

    case REVERT_CHANGES: {
      return {
        ...state,
        isEdited: false,
        textAreaValue: state.content,
      };
    }

    default: {
      return state;
    }
  }
};
