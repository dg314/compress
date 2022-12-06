import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import Level from './components/Level';
import LevelSelect from './components/LevelSelect';
import TopBar from './components/TopBar';
import levels from './data/levels';
import { formatText } from './Utils';

const spacesAsUnderscores = true;

export default function App() {
  const [levelNumber, setLevelNumber] = useState(0);

  const content = () => {
    if (levelNumber === 0) {
      return <LevelSelect setLevelNumber={setLevelNumber} />
    } else {
      let level = levels[levelNumber - 1]
      level.text = formatText(level.text, spacesAsUnderscores);

      return <Level levelNumber={levelNumber} level={levels[levelNumber - 1]} spacesAsUnderscores={spacesAsUnderscores}/>;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior='padding'>
        <StatusBar style="light" />
        <TopBar levelNumber={levelNumber} setLevelNumber={setLevelNumber} />
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
