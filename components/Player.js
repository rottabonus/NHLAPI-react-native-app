import React from 'react';
import { StyleSheet, Text, View, Alert, Image, ActivityIndicator } from 'react-native';

export default class Player extends React.Component {
      static navigationOptions = {title: 'Player'};
    constructor(props){
        super(props);
        this.state = {isGoalie: false, notPlayed: false, isLoading: true}
    }
    
    componentWillMount(){
        this.checkIfPlayed();
       
    }
    
    componentDidMount(){
        this.setState({isLoading: false});
    }
    
    checkIfPlayed = () =>  {
        const { person } = this.props.navigation.state.params
        if(person.stats[0].splits.length < 1){
            this.setState({
                notPlayed: true
            });
        Alert.alert("has not played");
        } else {
            this.checkGoalie();
        }
    }
    
    
    checkGoalie = () => {
        const { person } = this.props.navigation.state.params
        if(person.primaryPosition.name === "Goalie"){
            this.setState({
                isGoalie: true
            });
            Alert.alert("is a goalie");
        }
    }
    
    
  render() {
     const { person } = this.props.navigation.state.params
     if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text> Loading.... Ba dim ba dimb duu! </Text>
        </View>
      );
      }
     
     if(this.state.notPlayed){
         return(
         <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
        </View>
        
        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>
      </View>
         );
     }
     
     
    if (this.state.isGoalie){
        return(
        <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
        </View>
        
        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>
        
        <View style={styles.stats}>
        <Text>Games: {person.stats[0].splits[0].stat.games} </Text>
        <Text>Save%: {person.stats[0].splits[0].stat.evenStrengthSavePercentage}</Text>
        <Text>GamesStarted: {person.stats[0].splits[0].stat.gamesStarted}</Text>
        <Text>GoalsAgainst%: {person.stats[0].splits[0].stat.goalAgainstAverage}</Text>
        <Text>GoalsAgainst: {person.stats[0].splits[0].stat.goalsAgainst}</Text>
        <Text>Wins: {person.stats[0].splits[0].stat.wins} </Text>
        <Text>Losses: {person.stats[0].splits[0].stat.losses} </Text>
        <Text>Ties: {person.stats[0].splits[0].stat.ties} </Text>   
        <Text>OT: {person.stats[0].splits[0].stat.ot} </Text>
        <Text>Saves: {person.stats[0].splits[0].stat.saves} </Text>
        <Text>ShotsAgainst: {person.stats[0].splits[0].stat.shotsAgainst} </Text>
        <Text>Time on ice: {person.stats[0].splits[0].stat.timeOnIce} </Text>
        <Text>Average: {person.stats[0].splits[0].stat.timeOnIcePerGame}</Text>
        </View>      
      </View>
        );
    }
    
    return (
      <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
        </View>
        
        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>
        
        <View style={styles.stats}>
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
      borderColor: 'gray',
      margin: 20
  },
    text: {
        marginLeft: '5%',
        paddingTop: 35
    },
    cardTop: {
        flexDirection: 'row'
    },
     stats: {
         marginLeft: '5%',
        padding: 10
     },
    image: {
        padding: 20
    }
    });