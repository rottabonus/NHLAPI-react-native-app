import React from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';

export default class Player extends React.Component {
      static navigationOptions = {title: 'Player'};
    
  render() {
    const { person } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View style={styles.text}>
        <Text>{person.fullName} </Text>
        <Image
          style={{width: 60, height: 60}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/60x60/'+person.id+'.jpg'}}
        />
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
        <Text>Games: {person.stats[0].splits[0].stat.games} </Text>
        <Text>Points: {person.stats[0].splits[0].stat.points}</Text>
        <Text>Goals: {person.stats[0].splits[0].stat.goals}</Text>
        <Text>Assists: {person.stats[0].splits[0].stat.assists}</Text>
        <Text>PlusMinus: {person.stats[0].splits[0].stat.plusMinus}</Text>
        <Text>Blocked: {person.stats[0].splits[0].stat.blocked} </Text>
        <Text>Hits: {person.stats[0].splits[0].stat.hits} </Text>
        <Text>Pim: {person.stats[0].splits[0].stat.pim} </Text>
        <Text>Shots: {person.stats[0].splits[0].stat.shots} </Text>
        <Text>Shifts: {person.stats[0].splits[0].stat.shifts} </Text>
        <Text>Time on ice: {person.stats[0].splits[0].stat.timeOnIce} </Text>
        <Text>Average: {person.stats[0].splits[0].stat.timeOnIcePerGame}</Text>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      paddingTop: 30,
      paddingBottom: 30,
      borderColor: 'gray',
      margin: 20
  },
    text: {
        marginLeft: '5%',
        padding: 10
    }
    });