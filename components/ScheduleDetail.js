import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { List, ListItem } from "react-native-elements";



export default class ScheduleDetail extends React.Component {
      static navigationOptions = {title: 'Highlights'};
    constructor(props){
      super(props);
      this.state = {game: [], isLoading: true, highlights: []}
    }


    componentDidMount(){
        this.checkId();
    }

    checkId = () => {
      const { gamePk } = this.props.navigation.state.params;
      if(gamePk){
        this.getHighlights();
      } else {
        this.getHighLightsFav();
      }
    }


    getHighLightsFav = () => {
      const { games } = this.props.navigation.state.params;
      const url='http://statsapi.web.nhl.com/api/v1/game/'+ games[0].gamePk +'/content';
      fetch(url)
      .then(response => response.json())
      .then(responseJson => {
          this.setState({ highlights: responseJson.highlights.gameCenter.items,
                          isLoading: false
          });
      })
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
        <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../assets/images/skatingSkelli.gif')} />
          <Text style={{fontFamily: 'montserrat-sb'}}> Sniping....</Text>
        </View></View>
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
        titleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
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
      fontFamily: 'montserrat-black',
      textAlign: 'center',
      fontSize: 20,
      color: '#ff4000',

    }
});
