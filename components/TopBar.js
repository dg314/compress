import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import MonoText from './MonoText';
import { numStars, starLightColor } from '../Utils';

export default function TopBar({ levelNumber, setLevelNumber, levelBest, starReqs }) {
  const stars = starReqs ? numStars(levelBest, starReqs) : 0;

  return (
    <View style={styles.topBar}>
      <MonoText style={styles.title}>{levelNumber === 0 ? "Select Level" : `Level ${levelNumber}`}</MonoText>
      <View style={styles.buttonsLeftContainer}>
        {levelNumber > 0 && <TouchableOpacity activeOpacity={0.5} onPress={() => setLevelNumber(0)}>
          <FontAwesome name="home" size={24} color="#ddd" style={styles.topButton} />
        </TouchableOpacity>}
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
    left: 12,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsRightContainer: {
    position: 'absolute',
    top: 0,
    right: 12,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: {
    marginHorizontal: 5,
  },
  bestText: {
    color: 'white',
    fontSize: 13,
  },
  bestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
