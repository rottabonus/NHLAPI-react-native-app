import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class Search extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {player: [], isLoading: false, search: '', playerFound: false};
    }



startSearch = () => {
    this.setState({
        playerFound: false
    });
    this.findPlayerOne();
}

endSearch = () => {
    this.setState({
        isLoading: false

    });
}


findPlayerOne = () => {
        for(i = 1; i < 11; i++){
            const url='http://statsapi.web.nhl.com/api/v1/teams/'+i+'?hydrate=roster(person(stats(splits=statsSingleSeason)))';
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for(i = 0; i < responseJson.teams[0].roster.roster.length; i++){
                    let player = responseJson.teams[0].roster.roster[i].person.fullName;
                    if(player == this.state.search) {
                        this.setState({
                   player: responseJson.teams[0].roster.roster[i].person,
                            playerFound: true,
                            isLoading: false
                });
                }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    if(!this.state.playerFound){
        this.findPlayerTwo();
    }

}

findPlayerTwo = () => {
        for(i = 12; i < 27; i++){
            const url='http://statsapi.web.nhl.com/api/v1/teams/'+i+'?hydrate=roster(person(stats(splits=statsSingleSeason)))';
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for(i = 0; i < responseJson.teams[0].roster.roster.length; i++){
                    let player = responseJson.teams[0].roster.roster[i].person.fullName;
                    if(player == this.state.search) {
                        this.setState({
                   player: responseJson.teams[0].roster.roster[i].person,
                            playerFound: true,
                            isLoading: false
                });
                }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    if(!this.state.playerFound){
        this.findPlayerThree();
    }
}

findPlayerThree = () => {
        for(i = 28; i < 31; i++){
            const url='http://statsapi.web.nhl.com/api/v1/teams/'+i+'?hydrate=roster(person(stats(splits=statsSingleSeason)))';
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for(i = 0; i < responseJson.teams[0].roster.roster.length; i++){
                    let player = responseJson.teams[0].roster.roster[i].person.fullName;
                    if(player == this.state.search) {
                        this.setState({
                   player: responseJson.teams[0].roster.roster[i].person,
                            playerFound: true,
                            isLoading: false
                });
                }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    if(!this.state.playerFound){
        this.findPlayerFour();
    }
}


findPlayerFour = () => {
        for(i = 52; i < 55; i++){
            const url='http://statsapi.web.nhl.com/api/v1/teams/'+i+'?hydrate=roster(person(stats(splits=statsSingleSeason)))';
            fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for(i = 0; i < responseJson.teams[0].roster.roster.length; i++){
                    let player = responseJson.teams[0].roster.roster[i].person.fullName;
                    if(player == this.state.search) {
                        this.setState({
                   player: responseJson.teams[0].roster.roster[i].person,
                            playerFound: true,
                            isLoading: false
                });
                } this.endSearch();
                }})

                .catch((error) => {
                  Alert.alert(error);
                });
    }
}



  render() {
      if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text> Loading.... Ba dim ba dimb ba duu! </Text>
        </View>
      );
    }
      if(this.state.playerFound) {
          return(
              <View style={styles.header}>

                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Search', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>

                 <View style={styles.container}>
        <Text>FoundPlayer</Text>

        <TextInput style={styles.input} placeholder='i.e. Patrik Laine' onChangeText={(search) => this.setState({search})} value={this.state.search} />
        <Button onPress={this.startSearch} title="Get Player By Name"/>
        <Button style={{paddingTop: 20}} onPress={() => this.props.navigation.navigate('Player', {person: this.state.player})} title="Player Details"/>
      </View></View>
          );
      }
    return (
        <View style={styles.header}>

        <Header placement="left"
        backgroundColor={'#cf5807'}
        leftComponent={{ icon: 'menu', color: '#ffff',
        onPress: () => this.props.navigation.navigate('DrawerOpen')}}
        centerComponent={{ text: 'Search', style: { color: '#ffff' } }}
        rightComponent={{ icon: 'home', color: '#ffff',
         onPress: () => this.props.navigation.navigate('Frontpage')}}/>

      <View style={styles.container}>
        <Text>Searchpage</Text>

        <TextInput style={styles.input} placeholder='i.e. Patrik Laine' onChangeText={(search) => this.setState({search})} value={this.state.search} />
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.startSearch} title="Get Player By Name"/>
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
  input: {
        width: 280,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center'
},

});
