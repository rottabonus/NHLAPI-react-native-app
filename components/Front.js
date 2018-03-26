import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { Header, Button, List, ListItem } from 'react-native-elements';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('favourites.db');

export default class Front extends React.Component {
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
        this.props.navigation.navigate('StandingDetail', {...item});
      }

  render() {
    return (
        <View style={styles.header}>

                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Frontpage', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>
        <Text> This is frontpage </Text>

        <List>
        <FlatList
            data={this.state.favTeams}
            keyExtractor={item => item.listid}
            renderItem={({item}) => <ListItem
            title={item.name}
            subtitle={item.id}
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
    }

});
