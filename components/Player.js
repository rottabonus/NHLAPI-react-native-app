import React from 'react';
import { StyleSheet, Text, View, Alert, Image, FlatList, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { HokiText } from './StyledText';


export default class Player extends React.Component {
      static navigationOptions = {title: 'Player'};
    constructor(props){
        super(props);
        this.state = {isGoalie: false, notPlayed: false, isLoading: true, career: [], season: []}

    }



    componentWillMount(){
        this.checkGoalie();
        this.getCareerStats();
    }

    componentDidMount(){
        this.setState({isLoading: false});
    }



    checkGoalie = () => {
        const { person } = this.props.navigation.state.params
        if(person.primaryPosition.name === "Goalie"){
            this.setState({
                isGoalie: true
            });
        }
    }




    getCareerStats = () => {
        const { person } = this.props.navigation.state.params
    const url = 'http://statsapi.web.nhl.com/api/v1/people/'+person.id+'?hydrate=stats(splits=yearByYear)';
        fetch(url)
        .then(response => response.json())
        .then(responseJson => {

            let nhl = "National Hockey League";
            for(i = 0; i < responseJson.people[0].stats[0].splits.length; i++){
                if(responseJson.people[0].stats[0].splits[i].league.name === nhl){
                    this.setState({
                        career: [...this.state.career, responseJson.people[0].stats[0].splits[i]]});
        }}})
        .catch((error) => {
                  Alert.alert(error);
                });


    }


  render() {
     const { person } = this.props.navigation.state.params
     if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <View style={{alignItems: 'center', marginTop: 100}}>
          <Image style={{width:170, height: 170, alignSelf: 'center'}} source={require('../images/skatingSkelli.gif')} />
          <Text style={{fontFamily: 'montserrat-sb'}}> Wheeling....</Text>
        </View></View>
      );
      }

     if(this.state.career.length < 1){
         return(
         <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}>{person.fullName} </Text>
        <HokiText>Birthdate: {person.birthDate}</HokiText>
        <HokiText>Height: {person.height}</HokiText>
        <HokiText>Nationality: {person.nationality}</HokiText>
        <HokiText>Position: {person.primaryPosition.name}</HokiText>
        </View>

        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>

        <View style={styles.cardTop}>
        <View>
        <Image style={{width:200, height: 150, marginLeft: '10%'}}
        source={require('../images/leanSkelli.png')} />
        </View>
        <View>
        <Text> No games on NHL </Text>
        </View></View>
      </View>
         );
     }


    if (this.state.isGoalie){
        return(
        <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}>{person.fullName} </Text>
        <HokiText>Birthdate: {person.birthDate}</HokiText>
        <HokiText>Height: {person.height}</HokiText>
        <HokiText>Nationality: {person.nationality}</HokiText>
        <HokiText>Position: {person.primaryPosition.name}</HokiText>
        </View>

        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>

        <View style={styles.cardBot}>

        <View style={styles.stats}>
         <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}> Stats </Text>
        <HokiText> Games: {this.state.season.games} </HokiText>
        <HokiText> Save%: {this.state.season.savePercentage} </HokiText>
        <HokiText> GamesStarted: {this.state.season.gamesStarted} </HokiText>
        <HokiText> GoalsAgainst%: {this.state.season.goalAgainstAverage} </HokiText>
        <HokiText> GoalsAgainst: {this.state.season.goalsAgainst} </HokiText>
        <HokiText> Wins: {this.state.season.wins} </HokiText>
        <HokiText> Losses: {this.state.season.losses} </HokiText>
        <HokiText> Ties: {this.state.season.ties} </HokiText>
        <HokiText> OT: {this.state.season.ot} </HokiText>
        <HokiText> Saves: {this.state.season.saves} </HokiText>
        <HokiText> ShotsAgainst: {this.state.season.shotsAgainst} </HokiText>
        <HokiText> Time on ice: {this.state.season.timeOnIce} </HokiText>
        </View>

        <View style={styles.stats}>
        <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}> Select season </Text>
        <Picker
        style={{width: 140 }}
            selectedItem={this.state.season}

            onValueChange={(itemValue, itemIndex) => this.setState({season: itemValue})} >

            { this.state.career.map((item, key)=>(
            <Picker.Item label={item.season} value={item.stat} key={key} />)
            )}

          </Picker>
        </View>

        </View>
      </View>
        );
    }

    return (
      <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}>{person.fullName} </Text>
        <HokiText>Birthdate: {person.birthDate}</HokiText>
        <HokiText>Height: {person.height}</HokiText>
        <HokiText>Nationality: {person.nationality}</HokiText>
        <HokiText>Position: {person.primaryPosition.name}</HokiText>
        </View>

        <View style={styles.image}>
        <Image
          style={{width: 140, height: 140}}
          source={{uri: 'https://nhl.bamcontent.com/images/headshots/current/168x168/'+person.id+'.jpg'}}
        />
        </View>
        </View>

        <View style={styles.cardBot}>

        <View style={styles.stats}>
         <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}> Stats </Text>
        <HokiText> Games: {this.state.season.games} </HokiText>
        <HokiText> Points: {this.state.season.points} </HokiText>
        <HokiText> Goals: {this.state.season.goals} </HokiText>
        <HokiText> Assists: {this.state.season.assists} </HokiText>
        <HokiText> PlusMinus: {this.state.season.plusMinus} </HokiText>
        <HokiText> Blocked: {this.state.season.blocked} </HokiText>
        <HokiText> Hits: {this.state.season.hits} </HokiText>
        <HokiText> Pim: {this.state.season.pim} </HokiText>
        <HokiText> Shots: {this.state.season.shots} </HokiText>
        <HokiText> Shifts: {this.state.season.shifts} </HokiText>
        <HokiText> Time on ice: {this.state.season.timeOnIce} </HokiText>
        </View>

        <View style={styles.stats}>
        <Text style={{fontFamily: 'montserrat-black', color: '#ff4000'}}> Select season </Text>
        <Picker
        style={{width: 140 }}
            selectedValue={this.state.season}

            onValueChange={(itemValue, itemIndex) => this.setState({season: itemValue})} >

            { this.state.career.map((item, key)=>(
            <Picker.Item label={item.season} value={item.stat} key={key} />)
            )}

          </Picker>
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
      borderColor: 'gray',
      margin: 20
  },
    text: {
        marginLeft: '5%',
        paddingTop: 35,

    },
    cardTop: {
        flexDirection: 'row',

    },
     stats: {
         marginLeft: '2%',
        padding: 10
     },
    image: {
        padding: 20
    },

    cardBot: {
        flexDirection: 'row'
    }
    });
