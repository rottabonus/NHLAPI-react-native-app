import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image } from 'react-native';
import { Header, Button, List, ListItem } from 'react-native-elements';
import { SQLite } from 'expo';
import { HokiText } from './StyledText';

const db = SQLite.openDatabase('favourites.db');

export default class Favourites extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {favTeams: []};
    }

componentDidMount(){
  db.transaction(tx => {
    tx.executeSql('create table if not exists favteams (listid integer primary key not null, name text, id int);');
  });
  this.updateList();
}

updateList = () => {
  db.transaction(tx => {
    tx.executeSql('select * from favteams', [], (_, { rows }) =>
                  this.setState({favTeams: rows._array})
                );
  });
}

deleteTeam = (id) => {
    db.transaction(tx => {
        tx.executeSql('delete from favteams where listid = ?;', [id]);}, null,
        this.updateList)
    }

    getTeam = (item) => {
        this.props.navigation.navigate('Favourite', {...item});
      }

  render() {
    if(this.state.favTeams.length < 1){
      return(
        <View style={styles.containerNoFav}>
        <Image style={{width:250, height: 300, alignSelf: 'center'}}
        source={require('../assets/images/leanSkelli.png')} />
        <Text style={{textAlign: 'center', fontSize: 22, padding: 8, fontFamily: 'montserrat-black'}}> No Favourite teams yet. </Text>
        <HokiText style={{textAlign: 'center'}}>Long press a team on a LIST to add to favourites!</HokiText>
        </View>
      )
    }
    return (
        <View style={styles.header}>

                <Header placement="left"
                backgroundColor={'#cf5807'}
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Favourites', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>
        <Text style={styles.heading}> Your Favourite Teams </Text>
        <Text style={styles.text}>Press once to see details and long to remove</Text>

        <List>
        <FlatList
            data={this.state.favTeams}
            keyExtractor={item => item.listid}
            renderItem={({item}) => <ListItem
            title={item.name}
            titleStyle={{fontFamily: 'montserrat-regular'}}
            onPress={() => this.getTeam(item)}
            onLongPress={() => this.deleteTeam(item.listid)}/>}/>
      </List>

      </View></View>
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
  text: {
    fontFamily: 'montserrat-sb',
        textAlign: 'center',
        fontSize: 22
  },

  heading: {
    fontFamily: 'montserrat-black',
    textAlign: 'center',
    fontSize: 20,
    color: '#ff4000',
    paddingTop: 30
  },

  containerNoFav: {
    flex: 1,
    backgroundColor: '#fff',
      borderColor: 'gray',
      margin: 20,
      justifyContent: 'center'
  },

});
