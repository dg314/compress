import { StyleSheet, View, ScrollView } from 'react-native';
import LevelPreview from './LevelPreview';
import levels from '../data/levels';
import { numStars } from '../Utils';
import { useContext } from 'react';
import AppContext from '../contexts/AppContext';
import TopBar from './TopBar';

export default function LevelSelect() {
  const { setLevelNumber, levelBests } = useContext(AppContext);

  return (
    <>
      <TopBar />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.levelsContainer}>
          {levels.map((level, index) => <LevelPreview key={index} levelNumber={index + 1} levelBest={levelBests[index]} starReqs={level.starReqs} selectSelf={() => setLevelNumber(index + 1)} />)}
        </View> 
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#222',
  },
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
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 600,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
