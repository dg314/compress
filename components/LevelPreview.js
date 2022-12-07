import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppContext from '../contexts/AppContext';
import { calcNumStars, starContainerStyles, starLightColor } from "../Utils";
import MonoText from './MonoText';

export default function LevelPreview({ levelNumber, levelBest, starReqs }) {
  const { setScreenName, setLevelNumber } = useContext(AppContext);

  const stars = calcNumStars(levelBest, starReqs);

  const selectSelf = () => {
    setLevelNumber(levelNumber);
    setScreenName('level');
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={selectSelf}>
      <View style={[styles.levelContainer, starContainerStyles(stars)]}>
        <MonoText style={styles.levelText}>{levelNumber}</MonoText>
        {/*stars > 0 && <View style={[styles.scoreCircle, { backgroundColor: starLightColor(stars) }]}>
          <MonoText style={styles.scoreText} adjustsFontSizeToFit={true} numberOfLines={1}>{levelBest}</MonoText>
        </View>*/}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  levelContainer: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black'
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    margin: 2,
  },
  scoreCircle: {
    position: 'absolute',
    top: -11,
    right: -11,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    padding: 2,
  },
  scoreText: {
    fontSize: 13,
    color: 'black',
  },
});
