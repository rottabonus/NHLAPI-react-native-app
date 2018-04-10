import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Image } from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class TeamSchedule extends React.Component {
    static navigationOptions = {title: 'Schedule'};
    constructor(props){
        super(props);
        this.state = {schedule: [], isLoading: true};
    }

    componentWillMount(){
      this.checkId();
    }

    checkId = () => {
      const { id } = this.props.navigation.state.params;
      if(id){
        this.getScheduleFav();
      } else {
        this.getSchedule();
      }
    }

    getScheduleFav = () => {
      const { id } = this.props.navigation.state.params;
      const url = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-09-01&endDate=2018-04-11&teamId=' + id;
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    schedule: responseJson.dates,
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
    }

    getSchedule = () => {
      const { team } = this.props.navigation.state.params;

      const url = 'https://statsapi.web.nhl.com/api/v1/schedule?startDate=2017-09-01&endDate=2018-05-11&teamId=' + team.id;
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    schedule: responseJson.dates,
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });


    }

    getFavTeamGame = (item) => {
         this.props.navigation.navigate('ScheduleDetail', {...item});
    }


    _renderItem = data => {
      const item = data.item;
      if(item.games[0].status.detailedState === "Final"){
        return(
          <ListItem
            hideChevron={true}
            rightTitle={`${item.games[0].teams.home.score} - ${item.games[0].teams.away.score}`}
            titleStyle={{fontFamily: 'montserrat-regular', fontSize: 8}}
            title={`${item.games[0].teams.away.team.name} - ${item.games[0].teams.home.team.name}`}
            rightTitleStyle={{fontFamily: 'montserrat-regular', fontSize: 8, color: 'black'}}
            onPress={() => this.getFavTeamGame(item) }
            />
        )
      }

      return(
      <ListItem
        hideChevron={true}
        title={`${item.games[0].teams.away.team.name} - ${item.games[0].teams.home.team.name}`}
        titleStyle={{fontFamily: 'montserrat-regular', fontSize: 8}}
        rightTitle={"Upcoming"}
        rightTitleStyle={{fontFamily: 'montserrat-regular', fontSize: 8, color: 'black', fontWeight: 'normal'}}
        />
      );
    }

  render() {
    const { team } = this.props.navigation.state.params;
    if (this.state.isLoading) {
    return (
      <View style={styles.container}>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../images/skatingSkelli.gif')} />
        <Text style={{fontFamily: 'montserrat-sb'}}> Clapping....</Text>
      </View></View>
    );
    }
    return (

      <View style={styles.container}>
      <Text style={styles.teamText}>Schedule</Text>
      <List>
      <FlatList
      data={this.state.schedule}
      keyExtractor={item => item.games[0].gamePk}
      renderItem={this._renderItem}
      />
      </List>
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
    padding: 5
  },
});
