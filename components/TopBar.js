import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import MonoText from './MonoText';
import { numStars, starLightColor } from '../Utils';
import levels from '../data/levels';

export default function TopBar({ levelNumber, setLevelNumber, levelBest, starReqs }) {
  const stars = starReqs ? numStars(levelBest, starReqs) : 0;

  const decrementDisabled = levelNumber <= 1;
  const incrementDisabled = levelNumber >= levels.length;

  const goHome = () => {
    setLevelNumber(0);
  }

  const decrementLevel = () => {
    if (decrementDisabled) return;

    setLevelNumber(levelNumber - 1);
  }

  const incrementLevel = () => {
    if (incrementDisabled) return;

    setLevelNumber(level => level + 1);
  }

  return (
    <View style={styles.topBar}>
      <MonoText style={styles.title}>{levelNumber === 0 ? "Select Level" : `Level ${levelNumber}`}</MonoText>
      <View style={styles.buttonsLeftContainer}>
        {levelNumber > 0 && <View style={styles.levelChangeContainer}>
          <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={decrementLevel} disabled={decrementDisabled}>
            <FontAwesome5 name="arrow-left" size={20} color={decrementDisabled ? "#787878" : "#ddd"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={goHome}>
            <FontAwesome name="home" size={24} color="#ddd" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={incrementLevel} disabled={incrementDisabled}>
            <FontAwesome5 name="arrow-right" size={20} color={incrementDisabled ? "#787878" : "#ddd"} />
          </TouchableOpacity>
        </View>}
      </View>
      <View style={styles.buttonsRightContainer}>
        {levelNumber > 0 && levelBest && <View style={styles.bestContainer}>
          {stars && stars > 0 ? <>
            <MonoText style={styles.bestText}>Best:{" "}</MonoText>
            <View style={[styles.scoreCircle, { backgroundColor: starLightColor(stars) }]}>
              <MonoText style={styles.scoreText} adjustsFontSizeToFit={true} numberOfLines={1}>{levelBest}</MonoText>
            </View>
          </> : <MonoText style={styles.bestText}><>Best: {levelBest}</></MonoText>}
        </View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  topBar: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsLeftContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsRightContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelChangeContainer: {
    marginLeft: 5,
    flexDirection: 'row',
  },
  topButton: {
    paddingHorizontal: 7,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bestText: {
    color: 'white',
    fontSize: 13,
  },
  bestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  scoreCircle: {
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
  }
});
