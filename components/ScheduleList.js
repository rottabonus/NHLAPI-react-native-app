import React from 'react';
import { List, ListItem } from "react-native-elements";
import { StyleSheet, View, FlatList, Text } from 'react-native';

 export const ScheduleList = ({ get, schedule, games  }) => {
    return (

        <View>
        {
            games ?
            <List>
                <FlatList
                    data={ schedule }
                    keyExtractor={item => item.gamePk.toString()}
                    renderItem={({item}) => <ListItem
                        title={`${item.teams.home.team.name} - ${item.teams.away.team.name}`}
                        titleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
                        subtitle={`${item.venue.name} ${item.teams.home.score} - ${item.teams.away.score}`}
                        subtitleStyle={{fontFamily: 'montserrat-regular', fontSize: 12}}
                        onPress={() => get(item)}
                    />}/>
            </List> : <Text style={styles.text}> No games on selected date! </Text>
    }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingBottom: 50,
        borderColor: 'gray'
    },
    text: {
        fontFamily: 'montserrat-sb',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 5
    }
});
