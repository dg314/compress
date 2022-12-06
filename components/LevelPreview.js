import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { numStars, starContainerStyles } from "../Utils";
import MonoText from './MonoText';

export default function LevelPreview({ levelNumber, levelBest, starReqs, selectSelf }) {
  const stars = numStars(levelBest, starReqs);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={selectSelf}>
      <View style={[styles.levelContainer, starContainerStyles(stars)]}>
        <MonoText style={styles.levelText}>{levelNumber}</MonoText>
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
  }
});
