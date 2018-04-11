import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { HokiText } from './StyledText'

export default class GameDetail extends React.Component {
    static navigationOptions = {title: 'Game Details'};
    constructor(props){
        super(props);
        this.state = {home: [], away: [], periods: [], awayData: [],
          homeData: [], isLoading: true};
    }

    componentWillMount(){
      this.checkId();
    }

    checkId = () => {
      const { gamePk } = this.props.navigation.state.params;
      if(gamePk){
        this.getGameDetail();
      } else {
        this.getGameDetailFav();
      }
    }

    getGameDetailFav = () => {
        const { games } = this.props.navigation.state.params;
        const url='http://statsapi.web.nhl.com/api/v1/game/'+ games[0].gamePk +'/feed/live';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ home: responseJson.gameData.teams.home,
                            away: responseJson.gameData.teams.away,
                            periods: responseJson.liveData.linescore.periods,
                            awayData: responseJson.liveData.boxscore.teams.away.teamStats.teamSkaterStats,
                            homeData: responseJson.liveData.boxscore.teams.home.teamStats.teamSkaterStats,
                            isLoading: false});
       })

                .catch((error) => {
                  Alert.alert(error);
                });
    }

    getGameDetail = () => {
        const { gamePk } = this.props.navigation.state.params;
        const url='http://statsapi.web.nhl.com/api/v1/game/'+ gamePk +'/feed/live';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ home: responseJson.gameData.teams.home,
                            away: responseJson.gameData.teams.away,
                            periods: responseJson.liveData.linescore.periods,
                            awayData: responseJson.liveData.boxscore.teams.away.teamStats.teamSkaterStats,
                            homeData: responseJson.liveData.boxscore.teams.home.teamStats.teamSkaterStats,
                            isLoading: false});
       })

                .catch((error) => {
                  Alert.alert(error);
                });
    }


_renderItem = data => {
  const item = data.item;
  return(
    <View style={styles.cardBot}>
      <View>
    <HokiText>Goals: {item.home.goals}</HokiText>
    <HokiText>Shots on goal: {item.home.shotsOnGoal}</HokiText>
      </View>
      <View>
      <HokiText style={{color: '#ff4000'}}>{item.ordinalNum}</HokiText>
      </View>
      <View>
    <HokiText>Goals: {item.away.goals}</HokiText>
    <HokiText>Shots on goal: {item.away.shotsOnGoal}</HokiText>
      </View>
    </View>
  )
}





  render() {
    if (this.state.isLoading) {
     return (
       <View style={styles.container}>
       <View style={{alignItems: 'center', marginTop: 100}}>
         <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../assets/images/skatingSkelli.gif')} />
         <Text style={{fontFamily: 'montserrat-sb'}}> Cellying....</Text>
       </View></View>
     );
     }

    return (
      <View style={styles.container}>

      <View style={styles.cardTop}>
       <View>
         <Text style={styles.teamText}>{this.state.home.teamName}</Text>
         <Text style={styles.scoreText}>{this.state.homeData.goals}</Text>
         </View>
       <View>
        <Text style={styles.teamText}>{this.state.away.teamName}</Text>
        <Text style={styles.scoreText}>{this.state.awayData.goals}</Text>
         </View>
       </View>

       <View style={styles.cardGame}>
               <View>
               <HokiText>Shots: {this.state.homeData.shots}</HokiText>
               <HokiText>Powerplay goals: {this.state.homeData.powerPlayGoals}</HokiText>
               <HokiText>PenaltyMinutes: {this.state.homeData.pim}</HokiText>
               <HokiText>Blocked: {this.state.homeData.blocked}</HokiText>
               <HokiText>Giveaways: {this.state.homeData.giveaways}</HokiText>
               <HokiText>Hits: {this.state.homeData.hits}</HokiText>
               </View>
               <View>
               <HokiText>Shots: {this.state.awayData.shots}</HokiText>
               <HokiText>Powerplay goals: {this.state.awayData.powerPlayGoals}</HokiText>
               <HokiText>PenaltyMinutes: {this.state.awayData.pim}</HokiText>
               <HokiText>Blocked: {this.state.awayData.blocked}</HokiText>
               <HokiText>Giveaways: {this.state.awayData.giveaways}</HokiText>
               <HokiText>Hits: {this.state.awayData.hits}</HokiText>
               </View></View>

        <View>
        <FlatList data={this.state.periods}
        keyExtractor={item => item.num}
        renderItem={this._renderItem} />
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
      margin: 10
  },
 header: {
        flex: 1
    },
 cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
 },
 teamText: {
   fontFamily: 'montserrat-black',
   textAlign: 'center',
   fontSize: 25,
   color: '#ff4000',
 },

 scoreText: {
   fontSize: 22,
   textAlign: 'center',
   fontWeight: 'bold'
 },
 cardBot: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding: 5
 },
 cardGame: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding: 5,
   paddingBottom: 10
 }


});
