import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, Image } from 'react-native';
import { Header, Button, List, ListItem } from 'react-native-elements';


export default class Front extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {favTeams: [], help: false};
    }


showHelp = () => {
  if(this.state.help){
    this.setState({
          help: false
        });
  } else {
    this.setState({
        help: true
    });
  }
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
      <View>
      <View style={{alignSelf: 'flex-end', marginRight: '5%'}}>
      <Text style={{fontWeight: 'bold', fontSize: 20}} onPress={this.showHelp}> ? </Text>
    </View>
      <View>
        <Text style={styles.welcome}> Welcome </Text>
        </View></View>
        <Text style={styles.frontText}> This bootstrapped create-react-native-app uses the famous 'uncodumented' NHL
        API to show some statistics with serious styles. </Text>

        {
        this.state.help ? <Text style={styles.featureText}> Search: Search a player by name{'\n'} Standings: Show league and division standings{'\n'}
        Games: Show scheduled games for today, yesterday or by date{'\n'} GameDetails: show HighlightVideos and stats from game{'\n'}
        Lists: Navigate by pushing listitems, and long pressing to save to favourites!</Text> : <Image style={{width:150, height: 300, alignSelf: 'center'}}
        source={require('../images/Skelli.png')} />
        }



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
},

row: {
  flexDirection: 'row'
}

});
