import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class GameDetail extends React.Component {
    static navigationOptions = {title: 'Game Details'};
    constructor(props){
        super(props);
        this.state = {home: [], away: [], periods: [], awayData: [],
          homeData: [], isLoading: true};
    }

    componentWillMount(){
      this.getGameDetail();
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
    <Text>Goals: {item.home.goals}</Text>
    <Text>Shots on goal: {item.home.shotsOnGoal}</Text>
      </View>
      <View>
      <Text>{item.ordinalNum}</Text>
      </View>
      <View>
    <Text>Goals: {item.away.goals}</Text>
    <Text>Shots on goal: {item.away.shotsOnGoal}</Text>
      </View>
    </View>
  )
}





  render() {
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
               <Text>Shots: {this.state.homeData.shots}</Text>
               <Text>Powerplay goals: {this.state.homeData.powerPlayGoals}</Text>
               <Text>PenaltyMinutes: {this.state.homeData.pim}</Text>
               <Text>Blocked: {this.state.homeData.blocked}</Text>
               <Text>Giveaways: {this.state.homeData.giveaways}</Text>
               <Text>Hits: {this.state.homeData.hits}</Text>
               </View>
               <View>
               <Text>Shots: {this.state.awayData.shots}</Text>
               <Text>Powerplay goals: {this.state.awayData.powerPlayGoals}</Text>
               <Text>PenaltyMinutes: {this.state.awayData.pim}</Text>
               <Text>Blocked: {this.state.awayData.blocked}</Text>
               <Text>Giveaways: {this.state.awayData.giveaways}</Text>
               <Text>Hits: {this.state.awayData.hits}</Text>
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
   fontSize: 30,
   fontWeight: 'bold'
 },

 scoreText: {
   fontSize: 22,
   textAlign: 'center'
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
