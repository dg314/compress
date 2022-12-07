import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppContext from '../contexts/AppContext';
import { calcNumStars, starContainerStyles, starLightColor } from "../Utils";
import MonoText from './MonoText';
import { FontAwesome } from '@expo/vector-icons'; 

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
        {stars > 0 && <View style={styles.checkboxCircleContainer}>
          <View style={[styles.checkboxCircle, { backgroundColor: starLightColor(stars)}]}>
            <FontAwesome name="check" size={12} color="black" />
          </View>
        </View>}
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
    marginBottom: 15,
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
  checkboxCircleContainer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
