import React from 'react';
import DatePicker from 'react-native-datepicker'

export const HokiDatePicker = (changeDate, date) => {
    return (
        <DatePicker
            style={ {width: 200} }
            date={ date }
            mode='date'
            placeholder='select date'
            format='YYYY-MM-DD'
            minDate='2018-09-15'
            maxDate='2019-06-01'
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={ {dateInput: { marginLeft: 36 } } }
            onDateChange={() => changeDate(date)}
        />
    )
}

//<HokiDatePicker changeDate={this.changeDate} date={this.state.newdate}/>
//<TextInput style={styles.input} placeholder='Date YYYY-MM-DD' onChangeText={(newdate) => this.setState({newdate})} value={this.state.newdate} />