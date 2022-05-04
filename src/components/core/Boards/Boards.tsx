import React from 'react';
import MarkdownTextBoard from './MarkdownTextBoard/MarkdownTextBoard';
import PlainTextBoard from './PlainTextBoard/PlainTextBoard';
import './Boards.styles.scss';

const Boards = () => {
  return (
    <div className="boards">
      <div className="container boards-container">
        <div className="content boards__content">
          <PlainTextBoard />
          <MarkdownTextBoard />
        </div>
      </div>
    </div>
  );
};

export default Boards;
