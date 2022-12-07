import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLevelBests = async (levelBests) => {
  try {
    const levelBestsJSON = JSON.stringify(levelBests);
    await AsyncStorage.setItem('levelBests', levelBestsJSON);
    return true;
  } catch {
    return false
  }
}

export const fetchLevelBests = async (numLevels) => {
  try {
    const levelBestsJSON = await AsyncStorage.getItem('levelBests');

    if (levelBestsJSON != null) {
      const levelBests = JSON.parse(levelBestsJSON);

      if (levelBests.length === numLevels) {
        return levelBests;
      } else if (levelBests.length > numLevels) {
        return levelBests.slice(0, numLevels)
      } else {
        return levelBests.concat(Array(numLevels - levelBests.length).fill(null));
      }
    } else {
      return Array(numLevels).fill(null);
    }
  } catch {
    return Array(numLevels).fill(null);
  }
}