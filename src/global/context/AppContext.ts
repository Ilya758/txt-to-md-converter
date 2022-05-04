import { IState } from '../../store/initialState';
import { createContext, FormEvent } from 'react';
import { IAction } from '../../store/reducer';

export interface IAppContext {
  state: IState;
  dispatch: React.Dispatch<IAction>;
  handleTextAreaInput: (e: FormEvent<HTMLTextAreaElement>) => void;
}

export const AppContext = createContext<IAppContext | null>(null);
