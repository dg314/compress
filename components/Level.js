import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Level({ levelNumber, level }) {
  const { text, emojis, starReqs } = level;

  const [codeWords, setCodeWords] = useState(emojis.map(_ => ""));

  const setCodeWord = (index, value) => {
    setCodeWords(codeWords => {
      const newCodeWords = [...codeWords];
      newCodeWords[index] = value;
      return newCodeWords;
    })
  }

  const compressedOutput = (() => {
    let output = text;

    for (let i = 0; i < emojis.length; i++) {
      if (codeWords[i]) {
        output = output.replaceAll(codeWords[i], emojis[i]);
      }
    }

    return output;
  })();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always">
      <View style={styles.textContainers}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.textContainerDivider}>
          <View style={styles.arrowContainer}>
            <AntDesign name="arrowdown" size={20} style={styles.dividerArrow} color="black" />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{compressedOutput}</Text>
        </View>
      </View>
      <View style={styles.symbolBoxesContainer}>
        {emojis.map((emoji, index) => (
          <View style={styles.symbolBox}>
            <Text>{emoji}</Text>
            <TextInput style={styles.textInput} autoFocus={true} autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="#fff" value={codeWords[index]} onChangeText={(newValue) => setCodeWord(index, newValue)} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollViewContent: {
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  textContainers: {
    width: '100%',
    alignContent: 'center',
    backgroundColor: '#f2e3af',
    marginBottom: 20,
    borderRadius: 15,
  },
  textContainer: {
    flexShrink: 1,
    padding: 10,
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
    fontSize: 15,
  },
  textInput: {
    padding: 10,
    color: "#fff",
    fontSize: 15,
    flexGrow: 1,
  },
  symbolBoxesContainer: {
    flex: 1,
  },
  symbolBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  }
});
