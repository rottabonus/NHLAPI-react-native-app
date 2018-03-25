import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, ActivityIndicator } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class GamePlayers extends React.Component {
    static navigationOptions = {title: 'Game Players'};
    constructor(props){
        super(props);
        this.state = {home: [], away: [], isLoading: true};
    }

    componentDidMount(){
      this.getGameDetail();
    }

    getGameDetail = () => {
        const { gamePk } = this.props.navigation.state.params;
        const url='http://statsapi.web.nhl.com/api/v1/game/'+ gamePk +'/feed/live';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ home: responseJson.liveData.boxscore.teams.home.players,
                            away: responseJson.liveData.boxscore.teams.away.players,
                            isLoading: false});
       })
                .catch((error) => {
                  Alert.alert(error);
                });
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
    return (


      <View style={styles.container}>

      <View style={styles.cardTop}>
      <View>
        <Text style={styles.teamText}>Home</Text>
        <Text style={styles.scoreText}>Players</Text>
        </View>
      <View>
       <Text style={styles.teamText}>Away</Text>
       <Text style={styles.scoreText}>Players</Text>
        </View>
      </View>

        <View style={styles.cardBot}>
        <View>
        <Text> LOL </Text>
         </View>
        <View>
        <Text> Lol2 </Text>
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
   padding: 15
 }

});
