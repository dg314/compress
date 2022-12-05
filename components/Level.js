import { useRef, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { numStars, emojiStrLen } from '../Utils';

export default function Level({ levelNumber, level }) {
  const { text, emojis, starReqs } = level;

  const [codeWords, setCodeWords] = useState(emojis.map(_ => ""));
  const [selection, setSelection] = useState({ index: 0, start: 0, end: 0 });

  const inputRef = useRef();

  const setCodeWord = (index, value) => {
    setCodeWords(codeWords => {
      const newCodeWords = [...codeWords];
      newCodeWords[index] = value;
      return newCodeWords;
    })
  }

  const handleSelectionChange = (index, selection) => {
    const { start, end } = selection;

    setSelection({ index, start, end });
  }

  const handleFocusChange = (index) => {
    setSelection({
      ...selection,
      index
    });
  }

  let compressedOutput = text;
  let score = 0;

  for (let i = 0; i < emojis.length; i++) {
    if (codeWords[i]) {
      compressedOutput = compressedOutput.replaceAll(codeWords[i], emojis[i]);
      score += emojiStrLen(codeWords[i]);
    }
  }

  score += emojiStrLen(compressedOutput);

  const stars = numStars(score, starReqs);

  console.log(selection)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always">
        <View>
          <Text>Score: {score}</Text>
        </View>
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
            <View key={index} style={styles.symbolBox}>
              <Text>{emoji}</Text>
              <TextInput ref={index === 0 ? inputRef : null} onLayout={() => inputRef.current.focus()} style={styles.textInput} autoFocus={index === 0} autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="#fff" value={codeWords[index]} onChangeText={(newValue) => setCodeWord(index, newValue)} selectTextOnFocus={true} onSelectionChange={(event) => handleSelectionChange(index, event.nativeEvent.selection)} onPressIn={() => handleFocusChange(index)} keyboardType='ascii-capable' keyboardAppearance='dark'/>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.emojiKeyboard}>
        {emojis.slice(0, selection.index).map(emoji => (
          <View style={styles.emojiKey}>
            <Text>{emoji}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  finishButton: {
    borderRadius: 15,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 20,
  },
  finishText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  emojiKeyboard: {
    height: 50,
    backgroundColor: '#2b2b2b',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
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
