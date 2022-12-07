import Level from './Level';
import LevelSelect from './LevelSelect';
import AppContext from '../contexts/AppContext';
import { useContext } from 'react';

const spacesAsUnderscores = false;

export default function Game() {
  const { screenName } = useContext(AppContext);

  switch (screenName) {
    case 'level-select':
      return <LevelSelect />;
    case 'level':
      return <Level spacesAsUnderscores={spacesAsUnderscores} />;
    default:
      return null;
  }
};
