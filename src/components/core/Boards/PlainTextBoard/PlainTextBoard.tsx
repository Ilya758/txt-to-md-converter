import React, { useContext, useEffect } from 'react';
import './PlainTextBoard.styles.scss';
import { AppContext, IAppContext } from '@src/global/context/AppContext';
import { addNewFile, safeFile, setData } from '@src/store/actions';

const PlainTextBoard = () => {
  const {
    dispatch,
    handleTextAreaInput,
    state: { textAreaValue, isEdited, filePath },
  } = useContext(AppContext) as IAppContext;

  useEffect(() => {
    window.appAPI.onOpenFile((_, ...args) => {
      const [filePath, content] = args;

      dispatch(setData({ content, filePath }));
    });

    window.appAPI.onSaveFile((_, filePath: string) => {
      dispatch(safeFile(filePath));
    });

    window.appAPI.onAddNewFile(() => {
      dispatch(addNewFile());
    });
  }, [dispatch]);

  useEffect(() => {
    window.appAPI.changeContent(isEdited, filePath);
  }, [textAreaValue, isEdited, filePath]);

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
