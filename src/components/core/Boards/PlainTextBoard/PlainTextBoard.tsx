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

  const preventDefault = (event: Event) => event?.preventDefault();

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).classList.remove('dragenter');
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    (event.target as HTMLDivElement).classList.add('dragenter');
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const boardElement = event.target as HTMLDivElement;

    boardElement.classList.remove('dragenter');

    type TExtendedFile = File & { path: string };

    const { path: filePath } = event.dataTransfer?.files[0] as TExtendedFile;

    window.dragAPI.onDrop(isEdited, filePath);
  };

  useEffect(() => {
    const addEventListenersForDragEvents = () => {
      document.addEventListener('drag', preventDefault);
      document.addEventListener('dragleave', preventDefault);
      document.addEventListener('dragover', preventDefault);
      document.addEventListener('drop', preventDefault);
    };

    const removeEventListenersForDragEvents = () => {
      document.removeEventListener('drag', preventDefault);
      document.removeEventListener('dragleave', preventDefault);
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };

    addEventListenersForDragEvents();

    return () => {
      removeEventListenersForDragEvents();
    };
  }, [isEdited]);

  return (
    <div
      onDrop={onDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      draggable="false"
      className="board plain-text-board"
    >
      <div
        style={{ flexDirection: 'column' }}
        className="content plain-text-board__content"
      >
        <textarea onInput={handleTextAreaInput} value={textAreaValue} />
      </div>
    </div>
  );
};

export default PlainTextBoard;
