import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function TopBar({ levelNumber, setLevelNumber }) {
  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>{levelNumber === 0 ? "Select Level" : `Level ${levelNumber}`}</Text>
      <View style={styles.buttonsLeftContainer}>
        {levelNumber > 0 && <TouchableOpacity activeOpacity={0.5} onPress={() => setLevelNumber(0)}>
          <FontAwesome name="home" size={24} color="#ccc" style={styles.topButton} />
        </TouchableOpacity>}
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
  buttonsLeftContainer: {
    position: 'absolute',
    top: 0,
    left: 15,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: {
    marginHorizontal: 5,
  }
});
