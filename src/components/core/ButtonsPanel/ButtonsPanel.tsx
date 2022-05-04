import React from 'react';
import './ButtonsPanel.styles.scss';

const ButtonsPanel = () => {
  const handleClick = () => {
    window.appAPI.openFile();
  };

  return (
    <div className="buttons-panel">
      <div className="container buttons-panel-container">
        <div className="buttons-panel__content">
          <ul className="list buttons-panel__list">
            <li className="item buttons-panel__item">
              <button className="button">New file</button>
            </li>
            <li className="item buttons-panel__item">
              <button onClick={handleClick} className="button">
                Open file
              </button>
            </li>
            <li className="item buttons-panel__item">
              <button className="button">Save file</button>
            </li>
            <li className="item buttons-panel__item">
              <button className="button">Revert changes</button>
            </li>
            <li className="item buttons-panel__item">
              <button className="button">Open in default editor</button>
            </li>
            <li className="item buttons-panel__item">
              <button className="button">Show the filepath</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ButtonsPanel;
