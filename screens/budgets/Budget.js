import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styles from './Styles'

const Budget = () => {
  return (
    <View style={styles.container}>
      <Text>Budget</Text>
      <TextInput style={styles.input}/>
    </View>
  )
}

export default Budget