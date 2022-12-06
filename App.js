import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Game from './components/Game';
import { AppProvider } from './contexts/AppContext';

const spacesAsUnderscores = false;

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior='padding'>
          <StatusBar style="light" />
          <Game />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AppProvider>
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
});
