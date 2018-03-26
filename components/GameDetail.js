import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class GameDetail extends React.Component {
    static navigationOptions = {title: 'Game Details'};
    constructor(props){
        super(props);
        this.state = {home: [], away: [], periods: [], awayData: [],
          homeData: [], isLoading: true, overTime: false};
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
                            this.checkOverTime();
       })

                .catch((error) => {
                  Alert.alert(error);
                });
    }

    checkOverTime = () => {
        if(this.state.periods.length > 3){
          this.setState({
            overTime: true
          });
        }
    }


  render() {
    if (this.state.isLoading) {
     return (
       <View style={{ flex: 1, paddingTop: 20 }}>
         <ActivityIndicator />
         <Text> Loading.... Ba dim ba dimb ba duu! </Text>
       </View>
     );
     }

     if(this.state.periods.length === 0){
       return(
         <View style={styles.container}>
        <Text> Game not played (here image) </Text>
         </View>
       )
     }

     if (this.state.overTime) {
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

          <View style={styles.cardBot}>
          <View style={styles.periodOne}>
          <Text style={styles.scoreText}> 1st </Text>
          <Text> hGoals: {this.state.periods[0].home.goals} </Text>
           </View>
          <View style={styles.periodOne}>
          <Text style={styles.scoreText}> 1st </Text>
          <Text> aGoals: {this.state.periods[0].away.goals} </Text>
           </View>
          </View>

          <View style={styles.cardBot}>
          <View style={styles.periodTwo}>
          <Text style={styles.scoreText}> 2nd </Text>
          <Text> hGoals: {this.state.periods[1].home.goals} </Text>
           </View>
          <View style={styles.periodTwo}>
          <Text style={styles.scoreText}> 2nd </Text>
          <Text> aGoals: {this.state.periods[1].away.goals} </Text>
           </View>
          </View>

          <View style={styles.cardBot}>
          <View style={styles.periodOne}>
          <Text style={styles.scoreText}> 3rd </Text>
          <Text> hGoals: {this.state.periods[2].home.goals} </Text>
           </View>
          <View style={styles.periodOne}>
          <Text style={styles.scoreText}> 3rd </Text>
          <Text> aGoals: {this.state.periods[2].away.goals} </Text>
          </View>
         </View>

          <View style={styles.cardBot}>
          <View style={styles.periodTwo}>
          <Text style={styles.scoreText}> OT </Text>
          <Text> hGoals: {this.state.periods[3].home.goals} </Text>
           </View>
          <View style={styles.periodTwo}>
          <Text style={styles.scoreText}> OT </Text>
          <Text> aGoals: {this.state.periods[3].away.goals} </Text>
           </View>
          </View>

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

        <View style={styles.cardBot}>
        <View style={styles.periodOne}>
        <Text style={styles.scoreText}> 1st </Text>
        <Text> hGoals: {this.state.periods[0].home.goals} </Text>
         </View>
        <View style={styles.periodOne}>
        <Text style={styles.scoreText}> 1st </Text>
        <Text> aGoals: {this.state.periods[0].away.goals} </Text>
         </View>
        </View>

        <View style={styles.cardBot}>
        <View style={styles.periodTwo}>
        <Text style={styles.scoreText}> 2nd </Text>
        <Text> hGoals: {this.state.periods[1].home.goals} </Text>
         </View>
        <View style={styles.periodTwo}>
        <Text style={styles.scoreText}> 2nd </Text>
        <Text> aGoals: {this.state.periods[1].away.goals} </Text>
         </View>
        </View>

        <View style={styles.cardBot}>
        <View style={styles.periodOne}>
        <Text style={styles.scoreText}> 3rd </Text>
        <Text> hGoals: {this.state.periods[2].home.goals} </Text>
         </View>
        <View style={styles.periodOne}>
        <Text style={styles.scoreText}> 3rd </Text>
        <Text> aGoals: {this.state.periods[2].away.goals} </Text>
        </View>
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
 header: {
        flex: 1
    },
 cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
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
   padding: 15,
   paddingTop: 20
 },
 periodOne: {
   backgroundColor: 'gray'
 },

 periodTwo: {
   backgroundColor: 'white'
 }


});
