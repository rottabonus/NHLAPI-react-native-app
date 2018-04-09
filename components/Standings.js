import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, Image} from 'react-native';
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

      _renderItem = data => {
        const item = data.item;
        return(
          <ListItem
            hideChevron={true}
            title={item.team.name}
            titleStyle={{fontFamily: 'montserrat-regular', fontSize: 11}}
            rightTitle={`${item.gamesPlayed} ${item.leagueRecord.wins} ${item.leagueRecord.losses} ${item.leagueRecord.ot} ${item.points} `}
            rightTitleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
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
          <Text style={{fontFamily: 'montserrat-sb'}}> Loading....</Text>
        </View>
      );
      }
    return (
        <View style={styles.header}>

        <Header placement="left"
        backgroundColor={'#cf5807'}
        leftComponent={{ icon: 'menu', color: '#ffff',
        onPress: () => this.props.navigation.navigate('DrawerOpen')}}
        centerComponent={{ text: 'Divisions', style: { color: '#ffff' } }}
        rightComponent={{ icon: 'home', color: '#ffff',
         onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>



        <View style={styles.buttons}>
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getMetropolitan} title="Metropolitan" />
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getAtlantic} title="Atlantic" />
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getCentral} title="Central" />
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getPacific} title="Pacific" />
        </View>
        <View style={{alignSelf: 'flex-end', paddingTop: 20, marginRight: '5%'}}><Text style={styles.column}>GP  W   L   OT  P</Text></View>
        <View>
        </View>
        <List>
        <FlatList
        data={this.state.currStandings}
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
    },

    column: {
      fontFamily: 'montserrat-sb',
      fontSize: 10
    }
});
