import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class GameDetail extends React.Component {
    static navigationOptions = {title: 'Game Details'};
    constructor(props){
        super(props);
        this.state = {test: 'YOYOYO'};
    }
    

    
    


  render() {
    return (
        
        
      <View style={styles.container}>
        
        <Text>{this.state.test}</Text>
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
 header: {
        flex: 1
    }   
    
});
