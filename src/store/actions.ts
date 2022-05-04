export const SET_DATA = 'SET_DATA';

export const SET_TEXTAREA_VALUE = 'SET_TEXTAREA_VALUE';

export const CHANGE_CONTENT = 'CHANGE_CONTENT';

export const SAFE_FILE = 'SAFE_FILE';

export const REVERT_CHANGES = 'REVERT_CHANGES';

export const ADD_NEW_FILE = 'ADD_NEW_FILE';

export const setData = (payload: { filePath: string; content: string }) => ({
  type: SET_DATA,
  payload,
});

export const setTextareaValue = (payload: string) => ({
  type: SET_TEXTAREA_VALUE,
  payload,
});

export const changeContent = () => ({
  type: CHANGE_CONTENT,
});

export const safeFile = (payload: string) => ({
  type: SAFE_FILE,
  payload,
});

export const revertChanges = () => ({
  type: REVERT_CHANGES,
});

export const addNewFile = () => ({
  type: ADD_NEW_FILE,
});
