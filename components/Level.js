import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { numStars, emojiStrLen, formatText } from '../Utils';
import MonoText from './MonoText';
import StarGauge from './StarGauge';

const maxCodeWordLength = 10;

export default function Level({ levelNumber, level, spacesAsUnderscores, levelBest, setLevelBest }) {
  const { text, emojis } = level;

  const [codeWords, setCodeWords] = useState(emojis.map(_ => ""));
  const [selection, setSelection] = useState({ index: 0, start: 0, end: 0 });

  const inputRef = useRef();

  const setCodeWord = (index, value) => {
    if (emojiStrLen(value) > maxCodeWordLength) return;

    setCodeWords(codeWords => {
      const newCodeWords = [...codeWords];
      newCodeWords[index] = formatText(value, spacesAsUnderscores);

      return newCodeWords;
    });
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

  const handleEmojiKeyPress = (emoji) => {
    const { index, start, end } = selection;

    const oldCodeWord = codeWords[index];

    if (emojiStrLen(oldCodeWord) >= maxCodeWordLength) return;
    
    const newCodeWords = [...codeWords];
    newCodeWords[index] = oldCodeWord.slice(0, start) + emoji + oldCodeWord.slice(end);

    setCodeWords(newCodeWords);
    setSelection({ index, start: start + emoji.length, end: start + emoji.length });
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

  useEffect(() => {
    if (score < levelBest) {
      setLevelBest(score);
    }
  }, [score]);

  return (
    <View style={styles.container}>
      <View style={styles.starGaugeContainer}>
        <StarGauge level={level} score={score} />
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="always">
        <View style={styles.textContainers}>
          <View style={styles.textContainer}>
            <MonoText style={styles.text}>{text}</MonoText>
          </View>
          <View style={styles.textContainerDivider}>
            <View style={styles.arrowContainer}>
              <AntDesign name="arrowdown" size={20} style={styles.dividerArrow} color="black" />
            </View>
          </View>
          <View style={styles.textContainer}>
            <MonoText style={styles.text}>{compressedOutput}</MonoText>
          </View>
        </View>
        <View style={styles.symbolBoxesContainer}>
          {emojis.map((emoji, index) => (
            <View key={index} style={styles.symbolBox}>
              <MonoText>{emoji}</MonoText>
              <TextInput ref={index === 0 ? inputRef : null} onFocus={() => handleFocusChange(index)} onLayout={() => inputRef.current.focus()} style={styles.textInput} autoFocus={index === 0} autoCorrect={false} spellCheck={false} autoCapitalize='none' selectionColor="#fff" value={codeWords[index]} onChangeText={(newValue) => setCodeWord(index, newValue)} selectTextOnFocus={true} onSelectionChange={(event) => handleSelectionChange(index, event.nativeEvent.selection)} keyboardType='ascii-capable' keyboardAppearance='dark'/>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={[styles.emojiKeyboard, { height: selection.index === 0 ? 0 : 50 }]}>
        {emojis.slice(0, selection.index).map(emoji => (
          <TouchableOpacity activeOpacity={0.5} onPress={() => handleEmojiKeyPress(emoji)}>
            <View style={styles.emojiKey}>
              <MonoText>{emoji}</MonoText>
            </View>
          </TouchableOpacity>
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
