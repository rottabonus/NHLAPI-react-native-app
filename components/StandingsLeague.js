import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, ActivityIndicator} from 'react-native';
import { List, ListItem, Button, Header } from "react-native-elements";
import { SQLite } from 'expo';

const url= 'http://statsapi.web.nhl.com/api/v1/standings/byLeague';
const db = SQLite.openDatabase('favourites.db');
export default class StandingsLeague extends React.Component {
   static navigationOptions = {header: null};
    constructor(props){
      super(props);
      this.state = {standings: [], isLoading: true}
    }


    componentDidMount(){
        this.getStandings();

    }


    getStandings = () => {
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    standings: responseJson.records[0].teamRecords,
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
    }


    getTeam = (id) => {
        this.props.navigation.navigate('StandingDetail', {...id});
      }

      saveTeam = (name, id) => {
        db.transaction(tx => {
          tx.executeSql('insert into favteams (name, id) values (?, ?)', [name, id]);
        }, null, Alert.alert('added to favourites'))
      }



  render() {
      if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text> Loading.... Ba dim ba dimb duu! </Text>
        </View>
      );
      }
    return (
        <View style={styles.header}>

                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'League', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>

        <View>
        </View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
        data={this.state.standings}
        keyExtractor={item => item.team.id}
        renderItem={({item}) => <ListItem
        hideChevron={true}
        title={item.team.name}
        subtitle={`RANK:${item.leagueRank} GP:${item.gamesPlayed} W:${item.leagueRecord.wins} L:${item.leagueRecord.losses} OT:${item.leagueRecord.ot} PTS:${item.points}`}
        onPress={() => this.getTeam(item)}
        onLongPress={() => this.saveTeam(item.team.name, item.team.id)}
        subtitleStyle={{fontSize: 14}}
        titleStyle={{color: '#7ab3ef', fontWeight: 'bold'}}

        />}/>
        </List>
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
    buttons: {
        flexDirection: 'row',
       justifyContent: 'space-around',
        padding: 1

    },
    header: {
        flex: 1
    }
});
