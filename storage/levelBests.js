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
      return JSON.parse(levelBestsJSON);
    } else {
      return Array(numLevels).fill(null);
    }
  } catch {
    return Array(numLevels).fill(null);
  }
}