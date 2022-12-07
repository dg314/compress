import { StyleSheet, View } from 'react-native';
import MonoText from './MonoText';

export default function TopBar({ title, leftContent, rightContent, leftPadding, rightPadding }) {
  return (
    <View style={styles.topBar}>
      <MonoText style={styles.title}>{title}</MonoText>
      <View style={[styles.buttonContainer, { left: leftPadding || 0 }]}>
        {leftContent}
      </View>
      <View style={[styles.buttonContainer, { right: rightPadding || 0 }]}>
        {rightContent}
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
  buttonContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
