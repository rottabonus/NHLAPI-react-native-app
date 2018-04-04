import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Image } from 'react-native';

export default class TeamDetail extends React.Component {
    static navigationOptions = {title: 'Team'};
    constructor(props){
        super(props);
        this.state = {details: [], isLoading: true};
    }

    componentWillMount(){
      this.checkId();
    }

    checkId = () => {
      const { id } = this.props.navigation.state.params;
      if(id){
        this.getDetailsFav();
      } else {
        this.getDetails();
      }
    }

    getDetailsFav = () => {
      const { id } = this.props.navigation.state.params;
      const url = 'http://statsapi.web.nhl.com/api/v1/teams/' + id +'/stats';
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    details: responseJson.stats[0].splits[0],
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
    }

    getDetails = () => {
      const { team } = this.props.navigation.state.params;

      const url = 'http://statsapi.web.nhl.com/api/v1/teams/' + team.id +'/stats';
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    details: responseJson.stats[0].splits[0],
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
    }

  render() {
    const { id } = this.props.navigation.state.params;
    if (this.state.isLoading) {
    return (
      <View style={styles.container}>
        <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../images/skatingSkelli.gif')} />
        <Text> Loading.... Ba dim ba dimb duu! </Text>
      </View>
    );
    }
    return (

      <View style={styles.container}>
         <Text style={styles.teamText}>  {this.state.details.team.name} </Text>
         <View style={styles.statBoxOne}>
         <Text>Games Played: {this.state.details.stat.gamesPlayed}</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>Wins: {this.state.details.stat.wins}</Text>
         </View>
         <View style={styles.statBoxOne}>
         <Text>Losses: {this.state.details.stat.losses}</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>OverTime: {this.state.details.stat.ot}</Text>
         </View>
         <View style={styles.statBoxOne}>
         <Text>Points: {this.state.details.stat.pts}</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>Goals Per Game: {this.state.details.stat.goalsPerGame}</Text>
         </View>
         <View style={styles.statBoxOne}>
         <Text>Goals Against Per Game: {this.state.details.stat.goalsAgainstPerGame}</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>Penalty Killing Percentage: {this.state.details.stat.penaltyKillPercentage}%</Text>
         </View>
         <View style={styles.statBoxOne}>
         <Text>Powerplay Percentage: {this.state.details.stat.powerPlayPercentage}%</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>Shots Per Game: {this.state.details.stat.shotsPerGame}</Text>
         </View>
         <View style={styles.statBoxOne}>
         <Text>Shots Against Per Game: {this.state.details.stat.shotsAllowed}</Text>
         </View>
         <View style={styles.statBoxTwo}>
         <Text>Faceoff Win Percentage: {this.state.details.stat.faceOffWinPercentage}%</Text>
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
      margin: 20,
      paddingBottom: 50
  },
  teamText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  statBoxOne: {
  backgroundColor: '#ffa366',
  padding: 5,
  marginLeft: 10,
  marginRight: 10,
},
statBoxTwo: {
backgroundColor: 'white',
padding: 5,
marginLeft: 10,
marginRight: 10,
},

});
