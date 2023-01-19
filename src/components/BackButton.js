import React from 'react'
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native'
import { theme } from '../constant'
// import { getStatusBarHeight } from 'react-native-status-bar-height'

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <View style={styles.maincontainer}>
      <Image
        style={styles.image}
        source={require('../data/assets/images/arrow_back.png')}
      />
      </View>
     
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 ,
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
  maincontainer: {
    position: 'absolute',
    backgroundColor:theme.COLORS.primary,
    borderRadius:10,
    padding:5
    // left: 4,
  },
})
