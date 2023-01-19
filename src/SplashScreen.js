import React from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./data/assets/bg.png')}
        style={styles.backgroungimage}>
        <Image
          source={require('./data/assets/icon.png')}
          style={styles.Logo}
          resizeMode={'contain'}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroungimage: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  Logo: {
    width: 150,
    height: 150,
  },
});
