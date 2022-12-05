import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function LevelPreview({ levelNumber, stars, selectSelf }) {
  const dynamicContainerStyles = (() => {
    switch (stars) {
      case 3:
        return {
          backgroundColor: '#D1B000',
          borderColor: '#FFD700'
        }
      case 2:
        return {
          backgroundColor: '#a7a5aa',
          borderColor: '#d2cdd5'
        }
      case 1:
        return {
          backgroundColor: '#CD7F32',
          borderColor: '#EBA258'
        }
      default:
        return {
          backgroundColor: '#ccc',
          borderColor: '#eee'
        }
    }
  })();

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={selectSelf}>
      <View style={[styles.levelContainer, dynamicContainerStyles]}>
        <Text style={styles.levelText}>{levelNumber}</Text>
        {/*<View style={styles.stars}>
          {Array(3).fill().map((_, index) => <FontAwesome name="star" size={18} color={index < stars ? '#fde047' : '#80808080'} style={styles.star} />)}
        </View>*/}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  levelContainer: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 15,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  levelText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black'
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    margin: 2,
  }
});
