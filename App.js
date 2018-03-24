import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import Front from './components/Front';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import StandingDetail from './components/StandingDetail';
import ScheduleDetail from './components/ScheduleDetail';
import HighlightVideo from './components/Video';
import Player from './components/Player';
import Search from './components/Search';
import GameDetail from './components/GameDetail';


export default class App extends React.Component {
  render() {
    return (
      <DrawerNavigation/>
    );
  }
}
        
const TabGame = TabNavigator({
    HighligthList: {screen: ScheduleDetail},
    GameDetail: {screen: GameDetail}
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true
} 
);        
        
const  StackStanding = StackNavigator({
        Standings: {screen: Standings},
        StandingDetail: {screen: StandingDetail},
        Player: {screen: Player}
        
        })       

const StackSchedule = StackNavigator({
        Schedule: {screen: Schedule},
        ScheduleDetail: {screen: TabGame},
        HighlightVideo: {screen: HighlightVideo}
})




const StackSearch = StackNavigator({
    Search: {screen: Search},
    Player: {screen: Player}
})
    
const DrawerNavigation = DrawerNavigator({
        
        Search: {screen: StackSearch},
         Standings: {screen: StackStanding},    
        Schedule: {screen: StackSchedule},
        Frontpage: {screen: Front}
        
        }) 



