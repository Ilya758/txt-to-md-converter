import { AppContext, IAppContext } from '@src/global/context/AppContext';
import { revertChanges } from '@src/store/actions';
import React, { useContext } from 'react';
import './ButtonsPanel.styles.scss';

const ButtonsPanel = () => {
  const {
    state: { isEdited, textAreaValue, filePath },
    dispatch,
  } = useContext(AppContext) as IAppContext;

  const handleNewFile = async () => {
    window.appAPI.addNewFile(isEdited);
  };

  const handleOpenFile = () => {
    window.appAPI.openFile(isEdited);
  };

  const handleSaveFile = () => {
    window.appAPI.saveFile(textAreaValue);
  };

  const handleRevertChanges = () => {
    dispatch(revertChanges());
    window.appAPI.revertChanges();
  };

  const handleOpenInDefaultEditor = () => {
    window.appAPI.openInDefaultEditor(filePath);
  };

  const handleShowItemInFolder = () => {
    window.appAPI.showItemInFolder(filePath);
  };

  return (
    <div className="buttons-panel">
      <div className="container buttons-panel-container">
        <div className="buttons-panel__content">
          <ul className="list buttons-panel__list">
            <li onClick={handleNewFile} className="item buttons-panel__item">
              <button className="button">New file</button>
            </li>
            <li className="item buttons-panel__item">
              <button onClick={handleOpenFile} className="button">
                Open file
              </button>
            </li>
            <li className="item buttons-panel__item">
              <button
                disabled={!isEdited}
                onClick={handleSaveFile}
                className="button"
              >
                Save file
              </button>
            </li>
            <li className="item buttons-panel__item">
              <button
                onClick={handleRevertChanges}
                disabled={!isEdited}
                className="button"
              >
                Revert changes
              </button>
            </li>
            <li className="item buttons-panel__item">
              <button
                onClick={handleOpenInDefaultEditor}
                disabled={!filePath}
                className="button"
              >
                Open in default editor
              </button>
            </li>
            <li className="item buttons-panel__item">
              <button
                onClick={handleShowItemInFolder}
                disabled={!filePath}
                className="button"
              >
                Show the filepath
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ButtonsPanel;
