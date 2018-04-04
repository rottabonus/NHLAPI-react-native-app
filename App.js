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
import GamePlayers from './components/GamePlayers';
import TeamDetail from './components/TeamDetails';
import StandingsLeague from './components/StandingsLeague';
import Favourites from './components/Favourites';

export default class App extends React.Component {
  render() {
    return (
      <DrawerNavigation/>
    );
  }
}

const TabGame = TabNavigator({
    HighligthList: {screen: ScheduleDetail},
    GameDetail: {screen: GameDetail},
    GamePlayers: {screen: GamePlayers}
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#cf5807'
          }
        }
      });

const TabTeam = TabNavigator({
  Players: {screen: StandingDetail},
  Team: {screen: TeamDetail}
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#cf5807'
          }
        }
      });



const TabStandings = TabNavigator({
      League: {screen: StandingsLeague},
      Divisions: {screen: Standings}
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            style: {
                backgroundColor: '#cf5807'
              }
            }
          });

const  TabFront = TabNavigator({
      Frontpage: {screen: Front},
      Favourites: {screen: Favourites}
    }, {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            style: {
                backgroundColor: '#cf5807'
              }
            }
          });

const StackFront = StackNavigator({
        Front: {screen: TabFront},
        Favourite: {screen: TabTeam}
})

const  StackStanding = StackNavigator({
        Standings: {screen: TabStandings},
        StandingDetail: {screen: TabTeam},
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

          Frontpage: {screen: StackFront},
          Games: {screen: StackSchedule},
         Standings: {screen: StackStanding},
         Search: {screen: StackSearch},
       }, {
         contentOptions: {
           activeTintColor: '#ff531a',
           itemsContainerStyle: {
             paddingTop: 70
           },
         labelStyle: {
           fontSize: 30,
           padding: 15,
         }
       }
     })
