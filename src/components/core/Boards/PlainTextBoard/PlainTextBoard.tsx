import React, { useContext, useEffect } from 'react';
import './PlainTextBoard.styles.scss';
import { AppContext, IAppContext } from '@src/global/context/AppContext';
import { setData } from '@src/store/actions';

const PlainTextBoard = () => {
  const {
    dispatch,
    handleTextAreaInput,
    state: { textAreaValue },
  } = useContext(AppContext) as IAppContext;

  useEffect(() => {
    window.appAPI.onOpenFile((_, ...args) => {
      const [filePath, content] = args;

      dispatch(setData({ content, filePath }));
    });
  });

  return (
    <div className="board plain-text-board">
      <div
        style={{ flexDirection: 'column' }}
        className="content plain-text-board__content"
      >
        <textarea
          onInput={handleTextAreaInput}
          value={textAreaValue}
        ></textarea>
      </div>
    </div>
  );
};

export default PlainTextBoard;
