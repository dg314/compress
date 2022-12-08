import { createContext, useEffect, useState } from "react";
import levels from "../data/levels";
import { fetchLevelBests, storeLevelBests } from "../storage/levelBests";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [levelBests, setLevelBests] = useState(levels.map(() => null));
  const [screenName, setScreenName] = useState('home');
  const [levelNumber, setLevelNumber] = useState(1);

  const levelBest = levelBests[levelNumber - 1];
  const level = levels[levelNumber - 1];

  const setLevelBest = (newBest) => {
    if (levelBest != null && newBest >= levelBest) return;

    setLevelBests(levelBests => {
      const newLevelBests = [...levelBests];
      newLevelBests[levelNumber - 1] = newBest;
      return newLevelBests;
    });
  }

  useEffect(() => {
    fetchLevelBests(levels.length).then(levelBests => {
      setLevelBests(levelBests);
    });
  }, []);

  useEffect(() => {
    storeLevelBests(levelBests);
  }, [levelBests]);

  const value = { levelBest, levelBests, setLevelBest, level, screenName, setScreenName, levelNumber, setLevelNumber };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;