import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Button = ({title, btnStyles, onPress}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...btnStyles}} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container:{
    height: 52,
    width: '100%',
    backgroundColor: '#3344f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
},
title:{
    color: 'white',
    fontSize: 18
}
})
export default Button