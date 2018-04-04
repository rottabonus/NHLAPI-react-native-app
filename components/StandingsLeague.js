import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, Image} from 'react-native';
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

  _renderItem = data => {
    const item = data.item;
    return(
      <ListItem
        hideChevron={true}
        title={item.team.name}
        rightTitle={`${item.gamesPlayed} ${item.leagueRecord.wins} ${item.leagueRecord.losses} ${item.leagueRecord.ot} ${item.points} `}
        rightTitleContainerStyle={{alignItems: 'flex-end', flex: 1}}
        titleContainerStyle={{flex: 1, alignItems: 'flex-start'}}
        onPress={() => this.getTeam(item)}
        onLongPress={() => this.saveTeam(item.team.name, item.team.id)}
        />

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
        <View style={styles.header}>

        <Header placement="left"
        backgroundColor={'#cf5807'}
        leftComponent={{ icon: 'menu', color: '#ffff',
        onPress: () => this.props.navigation.navigate('DrawerOpen')}}
        centerComponent={{ text: 'League', style: { color: '#ffff' } }}
        rightComponent={{ icon: 'home', color: '#ffff',
         onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>

      <View style={{alignSelf: 'flex-end', paddingTop: 20, marginRight: '5%'}}><Text>GP  W   L   OT  P</Text></View>

        <View>
        </View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
        data={this.state.standings}
        keyExtractor={item => item.team.id}
        renderItem={this._renderItem}
        />
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
