import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class Front extends React.Component {
    static navigationOptions = {title: 'Frontpage'};
    constructor(props){
        super(props);
        this.state = {team: '', got: null};
    }
    

    
    findTeam = () => {
        const url='http://statsapi.web.nhl.com/api/v1/teams/' +this.state.team;
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ got: responseJson.teams[0].name
                
            });
        })
    }


  render() {
    return (
        <View style={styles.header}>
        
                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Standings', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>
        
      <View style={styles.container}>
        <Text>Find NHL team by id (1-30, 52-54)</Text>
        <TextInput style={{width: 200, borderColor: 'gray', borderWidth: 1}} keyboardType='numeric' onChangeText={(team) => this.setState({team})} value={this.state.team} />
        <Button onPress={this.findTeam} title="Search"/>
        <Text>{this.state.got}</Text>
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
