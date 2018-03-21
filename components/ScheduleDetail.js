import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Alert } from 'react-native';
import { List, ListItem } from "react-native-elements";



export default class ScheduleDetail extends React.Component {
      static navigationOptions = {title: 'Match'}; 
    constructor(props){
      super(props);
      this.state = {game: [], isLoading: true, highlights: []}
    }
    
    
    componentDidMount(){
        this.getGameDetail();
        this.getHighlights();
    }
    
    getGameDetail = () => {
        const { gamePk } = this.props.navigation.state.params;
        const url='http://statsapi.web.nhl.com/api/v1/game/'+ gamePk +'/feed/live';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ game: responseJson});
       })
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    
   getHighlights = () => {
        const { gamePk } = this.props.navigation.state.params;
        const url='http://statsapi.web.nhl.com/api/v1/game/'+ gamePk +'/content';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ highlights: responseJson.highlights.gameCenter.items,
                            isLoading: false   
            });
        })
    }
   
   getHighlightVideo = (item) => {
        this.props.navigation.navigate('HighlightVideo', {...item});
   }
    
 
  render() {
      if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text> Loading.... Ba dim ba dimb duu! </Text>
        </View>
      );
      }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
        Highlights of the game:
        </Text>
        
        <List>
        <FlatList 
        data={this.state.highlights}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ListItem 
        title={item.title}
        subtitle={item.duration}
         onPress={() => this.getHighlightVideo(item)}
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
      paddingTop: 30,
      paddingBottom: 30,
      borderColor: 'gray',
      margin: 20
  },
    text: {
        textAlign: 'center'
        
    }      
});
