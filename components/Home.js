import { useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppContext from '../contexts/AppContext';
import MonoText from './MonoText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { starContainerStyles, starLightColor } from '../Utils';

export default function Home() {
  const { setScreenName } = useContext(AppContext);

  const [showButtons, setShowButtons] = useState(false);

  const logoSize = useRef(new Animated.Value(250)).current
  const buttonsOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(
      logoSize,
      {
        toValue: 100,
        duration: 1000,
        useNativeDriver: false,
      }
    ).start(() => {
      setShowButtons(true);

      Animated.timing(
        buttonsOpacity,
        {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }
      ).start();
    })
  }, [logoSize])

  const goToLevelSelect = () => {
    setScreenName('level-select');
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.View style={[styles.arrowsContainer, { width: logoSize, height: logoSize }]}>
          <MaterialCommunityIcons style={styles.topLeftArrow} name="arrow-bottom-right-thick" size={60} color={starLightColor(0)} />
          <MaterialCommunityIcons style={styles.topRightArrow} name="arrow-bottom-left-thick" size={60} color={starLightColor(1)} />
          <MaterialCommunityIcons style={styles.bottomRightArrow} name="arrow-top-left-thick" size={60} color={starLightColor(2)} />
          <MaterialCommunityIcons style={styles.bottomLeftArrow} name="arrow-top-right-thick" size={60} color={starLightColor(3)} />
        </Animated.View>
      </View>
      <Animated.View style={[styles.buttonContainer, { opacity: buttonsOpacity }]}>
        {showButtons && <>
          <MonoText style={styles.titleText}>Compress</MonoText>
          <TouchableOpacity activeOpacity={0.5} onPress={goToLevelSelect}>
            <View style={[styles.button, starContainerStyles(0)]}>
              <MonoText style={styles.buttonText}>Start</MonoText>
            </View>
          </TouchableOpacity>
        </>}
      </Animated.View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  logoContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -80,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ddd',
    marginBottom: 100,
  },
  topLeftArrow: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightArrow: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftArrow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightArrow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    height: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 3,
  }
});
