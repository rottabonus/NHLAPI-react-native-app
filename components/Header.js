import React from 'react';
import { Header } from "react-native-elements";
import { StyleSheet, View, Text } from 'react-native';

export const MyHeader = ({ name, navigation }) => {
  return (
    <Header placement="left"
    backgroundColor={'#cf5807'}
    leftComponent={{ icon: 'menu', color: '#ffff',
    onPress: () => navigation.navigate('DrawerOpen')}}
    centerComponent={{ text: name, style: { color: '#ffff' } }}
    rightComponent={{ icon: 'home', color: '#ffff',
     onPress: () => navigation.navigate('Frontpage')}}/>
  )
}
