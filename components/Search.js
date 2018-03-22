import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList } from 'react-native';
import { Header, Button } from 'react-native-elements';

export default class Search extends React.Component {
    static navigationOptions = {title: 'Search'};
    constructor(props){
        super(props);
        this.state = {data: []};
    }
    

    
    


  render() {
    return (
        <View style={styles.header}>
        
                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Search', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>
        
      <View style={styles.container}>
        <Text>Searchpage</Text>
        
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
