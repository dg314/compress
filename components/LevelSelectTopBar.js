import { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppContext from '../contexts/AppContext';
import { Entypo } from '@expo/vector-icons'; 
import TopBar from './TopBar';

export default function LevelSelectTopBar() {
  const { setScreenName } = useContext(AppContext);

  const goToHome = () => {
    setScreenName('home');
  }

  const topBarLeftContent = (
    <TouchableOpacity style={styles.topButton} activeOpacity={0.5} onPress={goToHome}>
      <Entypo name="home" size={24} color="#ddd" />
    </TouchableOpacity>
  );

  return <TopBar title="Select Level" leftContent={topBarLeftContent} leftPadding={6} />;
}

const styles = StyleSheet.create({
  topButton: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
