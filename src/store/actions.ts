export const SET_DATA = 'SET_DATA';

export const SET_TEXTAREA_VALUE = 'SET_TEXTAREA_VALUE';

export const setData = (payload: { filePath: string; content: string }) => ({
  type: SET_DATA,
  payload,
});

export const setTextareaValue = (payload: string) => ({
  type: SET_TEXTAREA_VALUE,
  payload,
});
