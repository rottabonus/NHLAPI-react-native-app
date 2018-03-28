import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, ActivityIndicator} from 'react-native';
import { List, ListItem, Button, Header } from "react-native-elements";
import { SQLite } from 'expo';

const url= 'http://statsapi.web.nhl.com/api/v1/standings/';
const db = SQLite.openDatabase('favourites.db');
export default class Standings extends React.Component {
   static navigationOptions = {header: null};
    constructor(props){
      super(props);
      this.state = {standings: [], isLoading: true, currStandings: [], division: 0}
    }


    componentWillMount(){
        this.getStandings();

    }


    getStandings = () => {
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    standings: responseJson.records,
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
    }

    changeData = (id) => {
	           this.setState({
               currStandings: this.state.standings[id].teamRecords
             });
                          }

    getMetropolitan = () => {
        let id = 0;
        this.changeData(id);
    }
    getAtlantic = () => {
      let id = 1;
      this.changeData(id);
    }

    getCentral = () => {
      let id = 2;
        this.changeData(id);
    }

    getPacific = () => {
      let id = 3;
        this.changeData(id);
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
                centerComponent={{ text: 'Divisions', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>



        <View style={styles.buttons}>
        <Button onPress={this.getMetropolitan} title="Metropolitan" />
        <Button onPress={this.getAtlantic} title="Atlantic" />
        <Button onPress={this.getCentral} title="Central" />
        <Button onPress={this.getPacific} title="Pacific" />
        </View>
        <View>
        </View>
        <List>
        <FlatList
        data={this.state.currStandings}
        keyExtractor={item => item.team.id}
        renderItem={({item}) => <ListItem
        title={item.team.name}
        subtitle={`RANK:${item.divisionRank} GP:${item.gamesPlayed} W:${item.leagueRecord.wins} L:${item.leagueRecord.losses} OT:${item.leagueRecord.ot} PTS:${item.points}`}
        onPress={() => this.getTeam(item)}
        onLongPress={() => this.saveTeam(item.team.name, item.team.id)}
        subtitleStyle={{fontSize: 14}}
        titleStyle={{color: '#7ab3ef', fontWeight: 'bold'}}
        hideChevron={true}
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
