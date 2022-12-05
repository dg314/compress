import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Level from './components/Level';
import LevelSelect from './components/LevelSelect';
import TopBar from './components/TopBar';
import levels from './data/levels';

export default function App() {
  const [levelNumber, setLevelNumber] = useState(0);

  const content = () => {
    if (levelNumber === 0) {
      return <LevelSelect setLevelNumber={setLevelNumber} />
    } else {
      return <Level levelNumber={levelNumber} level={levels[levelNumber - 1]}/>;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TopBar levelNumber={levelNumber} setLevelNumber={setLevelNumber} />
      <View style={styles.content}>
        {content()}
      </View>
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
