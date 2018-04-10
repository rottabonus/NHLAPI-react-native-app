import React from 'react';
import { DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import { Image, View, Text } from 'react-native';
import Front from './components/Front';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import StandingDetail from './components/StandingDetail';
import ScheduleDetail from './components/ScheduleDetail';
import HighlightVideo from './components/Video';
import Player from './components/Player';
import Search from './components/Search';
import GameDetail from './components/GameDetail';
import TeamDetail from './components/TeamDetails';
import StandingsLeague from './components/StandingsLeague';
import Favourites from './components/Favourites';
import TeamSchedule from './components/TeamSchedule';
import { Font } from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      fontLoaded: false
    })
  }

componentDidMount() {
  this.loadAssetAsync();
}

async loadAssetAsync() {
        await Expo.Font.loadAsync({
         'montserrat-black': require('./assets/fonts/MontserratBlack.ttf'),
         'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
         'montserrat-sb': require('./assets/fonts/Montserrat-SemiBold.ttf'),
         'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        });;

        this.setState({ fontLoaded: true});
      }

  render() {
    if (!this.state.fontLoaded){
      return (
        <View style={{ flex: 1, paddingTop: 20}}>
        <View style={{alignItems: 'center', marginTop: 130}}>
          <Image style={{width:170, height: 170}} source={require('./images/skatingSkelli.gif')} />
          <Text> Skating... </Text>
        </View></View>
      );
      }

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
    animationEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#cf5807'
          }
        }
      });

const TabTeam = TabNavigator({
  Players: {screen: StandingDetail},
  Team: {screen: TeamDetail},
  Schedule: {screen: TeamSchedule}
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
        Favourite: {screen: TabTeam},
        ScheduleDetail: {screen: TabGame}
})

const  StackStanding = StackNavigator({
        Standings: {screen: TabStandings},
        StandingDetail: {screen: TabTeam},
        ScheduleDetail: {screen: TabGame},
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
           fontSize: 24,
           padding: 15,
           fontFamily: 'montserrat-black',
           fontWeight: 'normal'
         },
       }
     })
