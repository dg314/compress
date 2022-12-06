import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Level from './components/Level';
import LevelSelect from './components/LevelSelect';
import TopBar from './components/TopBar';
import levels from './data/levels';
import { fetchLevelBests, storeLevelBests } from './storage/levelBests';
import { formatText } from './Utils';

const spacesAsUnderscores = false;

export default function App() {
  const [levelNumber, setLevelNumber] = useState(0);
  const [levelBests, setLevelBests] = useState(levels.map(() => null));

  const level = (() => {
    if (levelNumber > 0) {
      const level = levels[levelNumber - 1];
      level.text = formatText(level.text, spacesAsUnderscores);
      return level;
    }

    return null;
  })();

  console.log(levelBests);

  const content = () => {
    if (levelNumber === 0) {
      return <LevelSelect setLevelNumber={setLevelNumber} levelBests={levelBests} />
    } else {
      const levelBest = levelBests[levelNumber - 1];
      const setLevelBest = (newBest) => {
        if (levelBest && newBest >= levelBest) return;

        setLevelBests(levelBests => {
          const newLevelBests = [...levelBests];
          newLevelBests[levelNumber - 1] = newBest;
          return newLevelBests;
        })
      }
      
      return <Level levelNumber={levelNumber} level={level} spacesAsUnderscores={spacesAsUnderscores} levelBest={levelBest} setLevelBest={setLevelBest} />;
    }
  }

  useEffect(() => {
    fetchLevelBests(levels.length).then(levelBests => {
      setLevelBests(levelBests);
    })
  }, []);

  useEffect(() => {
    console.log("Saving...")
    storeLevelBests(levelBests);
  }, [levelBests]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior='padding'>
        <StatusBar style="light" />
        <TopBar levelNumber={levelNumber} setLevelNumber={setLevelNumber} levelBest={levelNumber > 0 ? levelBests[levelNumber - 1] : 0} starReqs={level?.starReqs} />
        <View style={styles.content}>
          {content()}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
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
  content: {
    flex: 1,
  }
});
