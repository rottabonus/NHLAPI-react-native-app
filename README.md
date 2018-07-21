This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app) and [Expo](https://docs.expo.io/versions/latest/workflow/create-react-native-app)

Some UI elements are from [React Native Elements](https://react-native-training.github.io/react-native-elements/)

This application uses the ['Undocumented NHL API'](http://statsapi.web.nhl.com/api/v1)

[Here](https://www.kevinsidwar.com/iot/2017/7/1/the-undocumented-nhl-stats-api) and [here](https://github.com/erunion/sport-api-specifications/tree/master/nhl) and [here](https://github.com/dword4/nhlapi) is some useful information about the API 

Application is under construction!

![showcase](https://github.com/rottabonus/NHLAPI-react-native-app/blob/master/showcase.gif)

**Implemented features**:

1. Search games by date
    1. Basic validation for game-search by date (app wont crash)
1. Details of played games
    1. HighlightVideos of searched games
    1. Navigation between GameDetails and HighlightVideo
1. Team details
    1. Team rosters
    1. Team schedule
1. Player details
    1. Player info and Player stats by season
1. Get Player by name
    1. Basic validation for player-search by name (app wont crash)
1. Save favourite Team
1. Standings:
    1. League
    1. Divisions
1. Some basic styles

**Todo:**

1. As I started my react journey with this application, I have A LOT of refactoring to do....
1. Find players by nationality
1. Login
1. Polished UI
1. Playoff brackets
1. Save favourite player
1. Fix Search: After searching a player by name and returning to searchpage == reset state
1. Notifications when Favourite Team plays

