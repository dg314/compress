import { useContext } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { calcNumStars, starContainerStyles, starLightColor } from '../Utils';
import MonoText from './MonoText';
import AppContext from '../contexts/AppContext';
import levels from '../data/levels';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import TopBar from './TopBar';

export default function LevelTopBar() {
  const { levelBest, level, levelNumber, setLevelNumber, setScreenName } = useContext(AppContext);
  const { starReqs } = level;
  const stars = calcNumStars(levelBest, starReqs);

  const decrementDisabled = levelNumber <= 1;
  const incrementDisabled = levelNumber >= levels.length;

  const goToLevelSelect = () => {
    setScreenName('level-select');
  }

  const decrementLevel = () => {
    if (decrementDisabled) return;

    setLevelNumber(levelNumber - 1);
  }

  const incrementLevel = () => {
    if (incrementDisabled) return;

    setLevelNumber(levelNumber + 1);
  }

  const topBarLeftContent = (
    <>
      <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={goToLevelSelect}>
        <Entypo name="menu" size={28} color="#ddd" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={decrementLevel} disabled={decrementDisabled}>
        <FontAwesome5 name="arrow-left" size={19} color={decrementDisabled ? "#787878" : "#ddd"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={incrementLevel} disabled={incrementDisabled}>
        <FontAwesome5 name="arrow-right" size={19} color={incrementDisabled ? "#787878" : "#ddd"} />
      </TouchableOpacity>
    </>
  );

  const topBarRightContent = stars > 0 ? (
    <>
      <MonoText style={styles.bestText}>Best:{" "}</MonoText>
      <View style={[styles.scoreCircle, starContainerStyles(stars)]}>
        <MonoText style={styles.scoreText} adjustsFontSizeToFit={true} numberOfLines={1}>{levelBest}</MonoText>
      </View>
    </>
   ) : (
    <MonoText style={styles.bestText}>Best: {levelBest}</MonoText>
   );

  return <TopBar title={`Level ${levelNumber}`} leftContent={topBarLeftContent} leftPadding={4} rightContent={topBarRightContent} rightPadding={12} />;
}

const styles = StyleSheet.create({
  topButton: {
    paddingHorizontal: 8,
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
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    padding: 3,
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 13,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    paddingTop: 5,
  },
  starGaugeContainer: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  textContainers: {
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#ddd',
    marginBottom: 10,
    borderRadius: 15,
  },
  textContainer: {
    flexShrink: 1,
    padding: 12,
  },
  textContainerDivider: {
    height: 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 9999,
    padding: 1,
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  textInput: {
    padding: 10,
    color: "#fff",
    fontSize: 14,
    flexGrow: 1,
    fontFamily: 'Menlo',
  },
  symbolBoxesContainer: {
    flex: 1,
  },
  symbolBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiKeyboard: {
    backgroundColor: '#2b2b2b',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 2,
    borderColor: 'black',
  },
  emojiKey: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6a6a6a',
    marginTop: 5,
    borderRadius: 8,
  }
});
