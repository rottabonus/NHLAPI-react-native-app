import React from 'react';
import { StyleSheet, Text, View, Alert, FlatList, ActivityIndicator } from 'react-native';

export default class TeamDetail extends React.Component {
    static navigationOptions = {title: 'Team'};
    constructor(props){
        super(props);
        this.state = {details: [], isLoading: true};
    }

    componentWillMount(){
      this.getDetails();
    }


    getDetails = () => {
      const { team } = this.props.navigation.state.params;
      //another const from //

      const url = 'http://statsapi.web.nhl.com/api/v1/teams/' + team.id
                fetch(url)
                .then((response) => response.json())
                .then((responseJson) =>  {
                  this.setState({
                    details: responseJson.teams[0],
                    isLoading: false});
                })
                .catch((error) => {
                  Alert.alert(error);
                });
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
    return (

      <View style={styles.container}>
         <Text style={styles.teamText}> {this.state.details.name} </Text>

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
  teamText: {
    fontSize: 30,
    fontWeight: 'bold'
  },


});
