import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { Video } from 'expo';
import { MaterialIcons, Octicons } from '@expo/vector-icons';

export default class HighlightVideo extends React.Component {
    static navigationOptions = {title: 'HighlightVideo'};
    constructor(props){
        super(props);
        this.state = {mute: false, shouldPlay: true};
    }
    
    
    
    handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }
    
     handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }


  render() {
      const { description, playbacks } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>{description}</Text>
    <View><Video
  source={{uri: playbacks[7].url}}
  rate={1.0}
  volume={1.0}
  isMuted={this.state.mute}
  resizeMode="cover"
  shouldPlay={this.state.shouldPlay}
  isLooping
  style={{ width: 400, height: 224 }}
/><View style={styles.controlBar}>
            <MaterialIcons 
              name={this.state.mute ? "volume-mute" : "volume-up"}
              size={40} 
              color="white" 
              onPress={this.handleVolume} />
            <MaterialIcons 
              name={this.state.shouldPlay ? "pause" : "play-arrow"} 
              size={40} 
              color="white" 
              onPress={this.handlePlayAndPause} />
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
	}
    
});
