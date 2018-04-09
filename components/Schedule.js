import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, ActivityIndicator} from 'react-native';
import { List, ListItem, Header, Button } from "react-native-elements";



export default class Schedule extends React.Component {
    static navigationOptions = {header: null};
    constructor(props){
        super(props);
        this.state = {schedule: [], renderdate: '', newdate: '', yesterday: '', games: true};
    }

    componentWillMount(){
        this.getParsedDate();
    }

    componentDidMount(){
        this.getSchedule();

    }

getParsedDate = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let dateIso = date.toISOString();
    let formattedDate = dateIso.substring(0, 10);
    this.setState({
        yesterday: formattedDate
    });
}

    getSchedule = () => {
        const url='http://statsapi.web.nhl.com/api/v1/schedule/';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length === 1){
            this.setState({ schedule: responseJson.dates[0].games,
                          renderdate: responseJson.dates[0].date,
                          games: true});
       } else {
         this.setState({games: false})
       }})
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
                          renderdate: responseJson.dates[i].date,
                          games: true});
       }}})
                .catch((error) => {
                  Alert.alert(error);
                });
    }

    getYesterday = () => {
        const url='https://statsapi.web.nhl.com/api/v1/schedule?startDate='+ this.state.yesterday+'&endDate='+this.state.renderdate;
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if(responseJson.length === 1){
            this.setState({ schedule: responseJson.dates[0].games,
                          renderdate: this.state.yesterday,
                          games: true});
       } else {
         this.setState({games: false})
       }})

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
        backgroundColor={'#cf5807'}
        leftComponent={{ icon: 'menu', color: '#ffff',
        onPress: () => this.props.navigation.navigate('DrawerOpen')}}
        centerComponent={{ text: 'Games', style: { color: '#ffff' } }}
        rightComponent={{ icon: 'home', color: '#ffff',
         onPress: () => this.props.navigation.navigate('Frontpage')}}/>

        <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Date YYYY-MM-DD' onChangeText={(newdate) => this.setState({newdate})} value={this.state.newdate} />
        <View style={styles.buttons}><View>
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getScheduleDate} title="Search by Date"/>
        </View><View>
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getYesterday} title="Yesterdays games"/>
        </View></View>
        <View>
        <Text style={styles.text}>Schedule for {this.state.renderdate}</Text>
        </View>

        {
        this.state.games ?
        <List>
        <FlatList
        data={this.state.schedule}
        keyExtractor={item => item.gamePk}
        renderItem={({item}) => <ListItem
        title={`${item.teams.home.team.name} - ${item.teams.away.team.name}`}
        titleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
        subtitle={`${item.venue.name} ${item.teams.home.score} - ${item.teams.away.score}`}
        subtitleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
        onPress={() => this.getMatch(item)}
        />}/>
        </List> : <Text style={styles.textGame}> No games on selected date! </Text>
      }
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
  fontFamily: 'montserrat-black',
  textAlign: 'center',
  fontSize: 20,
  color: '#ff4000',
  paddingTop: 5

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

buttons: {
  flexDirection: 'row'
},

textGame: {
  fontFamily: 'montserrat-sb',
  textAlign: 'center',
  fontSize: 20,
  paddingTop: 5
}

});
