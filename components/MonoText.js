import { StyleSheet, Text } from 'react-native';

export default function MonoText({ style, children, ...props }) {
  return (
    <Text style={[styles.monoText, style]} {...props}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  monoText: {
    fontFamily: 'Menlo',
  }
});
