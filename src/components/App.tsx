import React, { FormEvent, useReducer } from 'react';
import { setTextareaValue } from '../store/actions';
import { AppContext } from '../global/context/AppContext';
import { initialState } from '../store/initialState';
import { reducer } from '../store/reducer';
import './App.styles.scss';
import Boards from './core/Boards/Boards';
import ButtonsPanel from './core/ButtonsPanel/ButtonsPanel';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTextAreaInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.target as HTMLTextAreaElement;
    dispatch(setTextareaValue(value));
  };

  const context = { state, dispatch, handleTextAreaInput };

  return (
    <>
      <AppContext.Provider value={context}>
        <ButtonsPanel />
        <Boards />
      </AppContext.Provider>
    </>
  );
};

export default App;
