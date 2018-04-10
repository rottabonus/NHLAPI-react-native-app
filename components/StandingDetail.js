import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert} from 'react-native';
import { List, ListItem } from "react-native-elements";


const url = 'http://statsapi.web.nhl.com/api/v1/teams';


export default class StandingDetail extends React.Component {
   static navigationOptions = {title: 'Players'};
    constructor(props){
      super(props);
      this.state = {data: [], isLoading: true}
    }

    componentWillMount(){
      this.checkId();
    }

    checkId = () => {
      const { id } = this.props.navigation.state.params;
      if(id){
        this.getDataFav();
      } else {
        this.getData();
      }
    }


    getData  = () => {
        const { team } = this.props.navigation.state.params;
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                 for (i = 0; i < responseJson.teams.length; i++) {
                 let teamId = responseJson.teams[i].id;
                     if (team.id == teamId) {
                this.setState({
                  data: responseJson.teams[i]
                });
                         this.getPlayers();
                }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }

    getDataFav  = () => {
        const { id } = this.props.navigation.state.params;
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                 for (i = 0; i < responseJson.teams.length; i++) {
                 let teamId = responseJson.teams[i].id;
                     if (id == teamId) {
                this.setState({
                  data: responseJson.teams[i]
                });
                         this.getPlayers();
                }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }



     getPlayers = () => {
        const url = 'http://statsapi.web.nhl.com/api/v1/teams/' + this.state.data.id + '?hydrate=roster(person(stats(splits=statsSingleSeason)))';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ players: responseJson.teams[0].roster.roster,
                          isLoading: false});
       })
                .catch((error) => {
                  Alert.alert(error);
                });
    }

   getPlayerDetails = (item) => {
        this.props.navigation.navigate('Player', {...item});
    }

  render() {
      if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../images/skatingSkelli.gif')} />
          <Text style={{fontFamily: 'montserrat-sb'}}> Clapping....</Text>
        </View></View>
      );
      }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
       {this.state.data.name}
        </Text>

        <List>
        <FlatList
        data={this.state.players}
        keyExtractor={item => item.person.id}
        renderItem={({item}) => <ListItem
        title={`${item.person.fullName} # ${item.jerseyNumber}`}
        titleStyle={{fontFamily: 'montserrat-regular'}}
        subtitle={item.position.name}
        subtitleStyle={{fontFamily: 'montserrat-regular'}}
        avatar={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+item.person.id+'.jpg'}}
        onPress={() => this.getPlayerDetails(item)}

        />}/>
        </List>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
      paddingTop: 20,
      paddingBottom: 30,
      borderColor: 'gray',
      margin: 20
  },
    text: {
      fontFamily: 'montserrat-black',
      textAlign: 'center',
      fontSize: 26,
      color: '#ff4000',

    }



});
