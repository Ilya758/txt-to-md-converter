import { AppContext, IAppContext } from '@src/global/context/AppContext';
import Markdown from 'marked-react';
import React, { useContext } from 'react';
import './MarkdownTextBoard.styles.scss';

const MarkdownTextBoard = () => {
  const {
    state: { textAreaValue },
  } = useContext(AppContext) as IAppContext;

  return (
    <div className="board markdown-text-board">
      <div className="content markdown-text-board__content">
        <Markdown value={textAreaValue} />
      </div>
    </div>
  );
};

export default MarkdownTextBoard;
