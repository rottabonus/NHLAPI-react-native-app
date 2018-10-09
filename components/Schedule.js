import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, ActivityIndicator} from 'react-native';
import { List, ListItem, Header, Button } from "react-native-elements";
import { getSchedule } from '../services/schedule'
import { MyHeader } from './Header'

export default class Schedule extends React.Component {
    static navigationOptions = {header: null}
    constructor(props){
        super(props)
        this.state = { schedule: [], renderdate: '', newdate: '', yesterday: '', games: true, isLoading: true }
    }

    componentWillMount(){
        this.getParsedDate()
    }

  async componentDidMount(){
      const schedule = await getSchedule('http://statsapi.web.nhl.com/api/v1/schedule/')
      if (schedule.dates.length > 0){
        this.setState({ schedule: schedule.dates[0].games, games: true, isLoading: false })
      } else {
        this.setState({ games: false, isLoading: false })
      }
    }

getParsedDate = () => {
    const date = new Date()
    let yday = new Date()
    yday.setDate(date.getDate() - 1)
    const yesterday = yday.toISOString().substring(0,10)
    const renderdate = date.toISOString().substring(0, 10)
    this.setState({ yesterday, renderdate })
}

    getScheduleDate  = async () => {
        const schedule = await getSchedule('https://statsapi.web.nhl.com/api/v1/schedule?season=20182019')
        let date = this.state.newdate
           const correctDate = schedule.dates.filter(d => d.date === date)
          if (correctDate.length === 1){
            this.setState({ schedule: correctDate[0].games, renderdate: correctDate[0].date })
          }
    }

    getYesterday = async () => {
      const thisDate = this.state.renderdate
      const yesterday = this.state.yesterday
        const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yesterday}&endDate=${thisDate}`;
          const yesterdaySchedule = await getSchedule(url)
            if(yesterdaySchedule.dates[0].date === yesterday){
              this.setState({ schedule: yesterdaySchedule.dates[0].games,
                              renderdate: yesterdaySchedule.dates[0].date,
                              games: true })
            } else {
              this.setState({ games: false })
            }
    }

    getMatch = (item) => {
        this.props.navigation.navigate('ScheduleDetail', {...item});
    }

  render() {
    return (
        <View style={styles.header}>
          <MyHeader  name="Games" navigation={this.props.navigation}/>

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
    )
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
