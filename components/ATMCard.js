import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ATMCard = () => {
  return (
    <View  style={styles.container}>
      <Text>ATMCard</Text>
    </View>
  )
}

export default ATMCard

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        width:"90%",
        height:"28%",
        
    }
})