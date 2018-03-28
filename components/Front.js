import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { Header, Button, List, ListItem } from 'react-native-elements';


export default class Front extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {favTeams: []};
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
        <Text style={styles.welcome}> Welcome </Text>
        <Text style={styles.frontText}> This bootstrapped create-react-native-app uses the famous 'uncodumented' NHL
        API to show some statistics with serious styles. </Text>
        <Text style={styles.featureText}> Search: Search a player by name </Text>
        <Text style={styles.featureText}> Standings: Show league and division standings </Text>
        <Text style={styles.featureText}> Games: Show scheduled games for today, yesterday or by date </Text>
        <Text style={styles.featureText}> GameDetails: show HighlightVideos and stats from game </Text>
        <Text style={styles.featureText}> Lists: Navigate by pushing listitems, and long pressing to save to favourites!</Text>

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

  frontText: {
      textAlign: 'center',
      fontSize: 16,
      padding: 15
  },

  welcome: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7ab3ef',
    paddingTop: 30
  },

  featureText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 5
}

});
