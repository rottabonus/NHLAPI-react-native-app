import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Image } from 'react-native';
import { HokiText } from './StyledText';

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
      <View style={{alignItems: 'center', marginTop: 100}}>
        <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../assets/images/skatingSkelli.gif')} />
        <Text style={{fontFamily: 'montserrat-sb'}}> Interfering....</Text>
      </View></View>
    );
    }
    return (

      <View style={styles.container}>
         <Text style={styles.teamText}>  {this.state.details.team.name} </Text>
         <View style={styles.statBoxOne}>
         <HokiText>Games Played: {this.state.details.stat.gamesPlayed}</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>Wins: {this.state.details.stat.wins}</HokiText>
         </View>
         <View style={styles.statBoxOne}>
         <HokiText>Losses: {this.state.details.stat.losses}</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>OverTime: {this.state.details.stat.ot}</HokiText>
         </View>
         <View style={styles.statBoxOne}>
         <HokiText>Points: {this.state.details.stat.pts}</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>Goals Per Game: {this.state.details.stat.goalsPerGame}</HokiText>
         </View>
         <View style={styles.statBoxOne}>
         <HokiText>Goals Against Per Game: {this.state.details.stat.goalsAgainstPerGame}</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>Penalty Killing Percentage: {this.state.details.stat.penaltyKillPercentage}%</HokiText>
         </View>
         <View style={styles.statBoxOne}>
         <HokiText>Powerplay Percentage: {this.state.details.stat.powerPlayPercentage}%</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>Shots Per Game: {this.state.details.stat.shotsPerGame}</HokiText>
         </View>
         <View style={styles.statBoxOne}>
         <HokiText>Shots Against Per Game: {this.state.details.stat.shotsAllowed}</HokiText>
         </View>
         <View style={styles.statBoxTwo}>
         <HokiText>Faceoff Win Percentage: {this.state.details.stat.faceOffWinPercentage}%</HokiText>
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
    fontFamily: 'montserrat-black',
    textAlign: 'center',
    fontSize: 25,
    color: '#ff4000',
    padding: 10
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
