import React from 'react';
import { DrawerNavigator, StackNavigator} from 'react-navigation';
import Front from './components/Front';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import StandingDetail from './components/StandingDetail';
import ScheduleDetail from './components/ScheduleDetail';
import HighlightVideo from './components/Video';
import Player from './components/Player';


export default class App extends React.Component {
  render() {
    return (
      <DrawerNavigation/>
    );
  }
}
        
const  StackStanding = StackNavigator({
        Standings: {screen: Standings},
        StandingDetail: {screen: StandingDetail},
        Player: {screen: Player}
        
        })       

const StackSchedule = StackNavigator({
        Schedule: {screen: Schedule},
        ScheduleDetail: {screen: ScheduleDetail},
        HighlightVideo: {screen: HighlightVideo}
})    
    
const DrawerNavigation = DrawerNavigator({
        
         Standings: {screen: StackStanding},    
        Schedule: {screen: StackSchedule},
        Frontpage: {screen: Front}
        
        }) 



