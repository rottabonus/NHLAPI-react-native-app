import React from 'react';
import { StyleSheet, Text, View, Alert, Image, ActivityIndicator, FlatList, Picker } from 'react-native';
import { Button } from 'react-native-elements';



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
            Alert.alert("is a goalie");
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
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          <Text> Loading.... Ba dim ba dimb duu! </Text>
        </View>
      );
      }

     if(this.state.career.length < 1){
         return(
         <View style={styles.container}>
         <View style={styles.cardTop}>
        <View style={styles.text}>
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
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
        <Image style={{width:150, height: 300, marginLeft: '10%'}}
        source={require('../images/Skelli.png')} />
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
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
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
         <Text> Stats </Text>
        <Text> Games: {this.state.season.games} </Text>
        <Text> Save%: {this.state.season.evenStrengthSavePercentage} </Text>
        <Text> GamesStarted: {this.state.season.gamesStarted} </Text>
        <Text> GoalsAgainst%: {this.state.season.goalAgainstAverage} </Text>
        <Text> GoalsAgainst: {this.state.season.goalsAgainst} </Text>
        <Text> Wins: {this.state.season.wins} </Text>
        <Text> Losses: {this.state.season.losses} </Text>
        <Text> Ties: {this.state.season.ties} </Text>
        <Text> OT: {this.state.season.ot} </Text>
        <Text> Saves: {this.state.season.saves} </Text>
        <Text> ShotsAgainst: {this.state.season.shotsAgainst} </Text>
        <Text> Time on ice: {this.state.season.timeOnIce} </Text>
        </View>

        <View style={styles.stats}>
        <Text> Select season </Text>
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
        <Text>{person.fullName} </Text>
        <Text>Birthdate: {person.birthDate}</Text>
        <Text>Height: {person.height}</Text>
        <Text>Nationality: {person.nationality}</Text>
        <Text>Position: {person.primaryPosition.name}</Text>
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
         <Text> Stats </Text>
        <Text> Games: {this.state.season.games} </Text>
        <Text> Points: {this.state.season.points} </Text>
        <Text> Goals: {this.state.season.goals} </Text>
        <Text> Assists: {this.state.season.assists} </Text>
        <Text> PlusMinus: {this.state.season.plusMinus} </Text>
        <Text> Blocked: {this.state.season.blocked} </Text>
        <Text> Hits: {this.state.season.hits} </Text>
        <Text> Pim: {this.state.season.pim} </Text>
        <Text> Shots: {this.state.season.shots} </Text>
        <Text> Shifts: {this.state.season.shifts} </Text>
        <Text> Time on ice: {this.state.season.timeOnIce} </Text>
        </View>

        <View style={styles.stats}>
        <Text> Select season </Text>
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
        paddingTop: 35
    },
    cardTop: {
        flexDirection: 'row'
    },
     stats: {
         marginLeft: '5%',
        padding: 10
     },
    image: {
        padding: 20
    },

    cardBot: {
        flexDirection: 'row'
    }
    });
