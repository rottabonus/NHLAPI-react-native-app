import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, ActivityIndicator} from 'react-native';
import { List, ListItem, Header, Button } from "react-native-elements";

export default class Schedule extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {schedule: [], renderdate: '', newdate: ''};
    }
    
    
    componentDidMount(){
        this.getSchedule();
    }

    
    getSchedule = () => {
        const url='http://statsapi.web.nhl.com/api/v1/schedule/';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ schedule: responseJson.dates[0].games,
                          renderdate: responseJson.dates[0].date});
       })
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    
    getScheduleDate = () => {
        const url='https://statsapi.web.nhl.com/api/v1/schedule?season=20172018';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
            let testDate = this.state.newdate;
            for(i=0; i<responseJson.dates.length; i++){  
            if(testDate == responseJson.dates[i].date) {
            this.setState({ schedule: responseJson.dates[i].games,
                          renderdate: responseJson.dates[i].date});
       }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }
    

    getMatch = (item) => {
        this.props.navigation.navigate('ScheduleDetail', {...item});
    }
    


  render() {
    return (
        <View style={styles.header}>
        
                <Header placement="left"
                leftComponent={{ icon: 'menu', color: '#fff',
                onPress: () => this.props.navigation.navigate('DrawerOpen')}}
                centerComponent={{ text: 'Games', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff',
                 onPress: () => this.props.navigation.navigate('Frontpage')}}/>
        
        <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Date YYYY-MM-DD' onChangeText={(newdate) => this.setState({newdate})} value={this.state.newdate} />
        <Button onPress={this.getScheduleDate} title="Search by Date"/>    
            
        <View>
        <Text style={styles.text}>Schedule for {this.state.renderdate}</Text>
        </View>
        <List>
        <FlatList 
        data={this.state.schedule}
        keyExtractor={item => item.gamePk}
        renderItem={({item}) => <ListItem 
        title={`${item.teams.home.team.name} - ${item.teams.away.team.name}`}
        subtitle={`${item.venue.name} ${item.teams.home.score} - ${item.teams.away.score}`}
        onPress={() => this.getMatch(item)}
        />}/>
        </List>
        
        </View>
        
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
    },
text: {
        textAlign: 'center'
},
input: {
        width: 280,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center'
}
    
});

