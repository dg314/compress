import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { starContainerStyles } from "../Utils";

export default function LevelPreview({ levelNumber, stars, selectSelf }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={selectSelf}>
      <View style={[styles.levelContainer, starContainerStyles(stars)]}>
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
