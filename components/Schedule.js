import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Button } from "react-native-elements";
import { getSchedule } from '../services/schedule'
import { MyHeader } from './Header'
import { ScheduleList } from './ScheduleList'
import { HokiDatePicker } from './DatePicker'

export default class Schedule extends React.Component {
    static navigationOptions = {header: null}
    constructor(props){
        super(props)
        this.state = { schedule: [], renderDate: '', newDate: '2018-09-16', yesterday: '', games: true, isLoading: true }
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
    const renderDate = date.toISOString().substring(0, 10)
    this.setState({ yesterday, renderDate })
}

    getScheduleDate  = async () => {
        const schedule = await getSchedule('https://statsapi.web.nhl.com/api/v1/schedule?season=20182019')
        let date = this.state.newDate
           const correctDate = schedule.dates.filter(d => d.date === date)
          if (correctDate[0].date === date){
            this.setState({ schedule: correctDate[0].games, renderDate: correctDate[0].date, games: true })
          }
    }

    getYesterday = async () => {
      const thisDate = this.state.renderDate
      const yesterday = this.state.yesterday
        const url = `https://statsapi.web.nhl.com/api/v1/schedule?startDate=${yesterday}&endDate=${thisDate}`;
          const yesterdaySchedule = await getSchedule(url)
            if(yesterdaySchedule.dates[0].date === yesterday){
              this.setState({ schedule: yesterdaySchedule.dates[0].games,
                              renderDate: yesterdaySchedule.dates[0].date,
                              games: true })
            } else {
              this.setState({ games: false })
            }
    }

    getMatch = (item) => {
        this.props.navigation.navigate('ScheduleDetail', {...item});
    }

    changeDate = (item) => {
        this.setState({newDate: item})
    }

  render() {
    return (
        <View style={styles.header}>
          <MyHeader  name="Games" navigation={this.props.navigation}/>
          <View style={styles.container}>
              <TextInput style={styles.input} placeholder='Date YYYY-MM-DD' onChangeText={(newDate) => this.setState({newDate})} value={this.state.newDate} />
        <View style={styles.buttons}><View>
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getScheduleDate} title="Search by Date"/>
        </View><View>
        <Button buttonStyle={{backgroundColor: '#ff751a'}} onPress={this.getYesterday} title="Yesterdays games"/>
        </View></View>
        <View>
        <Text style={styles.text}>Schedule for {this.state.renderDate}</Text>
        </View>
        <ScheduleList get={this.getMatch} schedule={this.state.schedule} games={this.state.games} />
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
}
});
