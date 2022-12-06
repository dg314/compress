import { StyleSheet, View } from 'react-native';
import { numStars, starContainerStyles, starLightColor } from '../Utils';
import MonoText from './MonoText';

const starGaugeHeight = 30;

export default function StarGauge({ level, score }) {
  const { text, starReqs } = level;

  const stars = numStars(score, starReqs);
  
  const bestScore = starReqs[2] - 5;
  const worstScore = text.length;

  let scoreLeft = 5;

  if (score <= worstScore && score > starReqs[0]) {
    scoreLeft = (worstScore - score) / (worstScore - starReqs[0]) * 45 + 5;
  } else if (score <= starReqs[0] && score > starReqs[1]) {
    scoreLeft = (starReqs[0] - score) / (starReqs[0] - starReqs[1]) * 60 + 50;
  } else if (score <= starReqs[1] && score > starReqs[2]) {
    scoreLeft = (starReqs[1] - score) / (starReqs[1] - starReqs[2]) * 60 + 110;
  } else if (score <= starReqs[2] && score > bestScore) {
    scoreLeft = (starReqs[2] - score) / (starReqs[2] - bestScore) * 45 + 170;
  } else if (score <= bestScore) {
    scoreLeft = 215;
  }

  const colorBarBorderStyle = (index) => {
    if (index === 0) {
      return {
        borderBottomLeftRadius: starGaugeHeight / 2,
        borderTopLeftRadius: starGaugeHeight / 2,
        borderRightWidth: 0,
      }
    } else if (index === 3){
      return {
        borderBottomRightRadius: starGaugeHeight / 2,
        borderTopRightRadius: starGaugeHeight / 2,
        borderLeftWidth: 0,
      }
    } else {
      return {
        borderRightWidth: 0,
        borderLeftWidth: 0,
      }
    }
  }

  return (
    <View style={styles.starGauge}>
      <View style={styles.centerBar}>
        {Array(4).fill().map((_, index) => (
          <View key={index} style={[starContainerStyles(index), styles.colorBar, colorBarBorderStyle(index)]} />
        ))}
        <View style={[styles.scoreCircle, { left: scoreLeft, backgroundColor: starLightColor(stars) }]}>
          <MonoText style={styles.scoreText}>{score}</MonoText>
        </View>
      </View>
      <View style={styles.starReqBox}>
        {starReqs.map((starReq, index) => <MonoText key={index} style={styles.starReqLabel}>{starReq}</MonoText>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starGauge: {
    width: 240,
    marginVertical: 10,
    alignItems: 'stretch',
  },
  centerBar: {
    flexDirection: 'row',
    height: starGaugeHeight,
  },
  colorBar: {
    width: 60,
    borderWidth: 3,
  },
  starReqBox: {
    marginTop: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingHorizontal: starGaugeHeight / 2 - 7
  },
  starReqLabel: {
    fontSize: 12,
    color: 'white',
  },
  scoreCircle: {
    position: 'absolute',
    width: starGaugeHeight - 10,
    height: starGaugeHeight - 10,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: starGaugeHeight / 2 - 5
  },
  scoreText: {
    fontSize: 12,
    color: 'black',
  }
});
