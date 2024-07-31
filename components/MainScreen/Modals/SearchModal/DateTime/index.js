import {
  View,Text, StyleSheet, Pressable
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DateTimeDiv = ({dateStartPickerVisible, setStartDatePickerVisible, dateEndPickerVisible, setEndDatePickerVisible, startDate, endDate, handleDateEndConfirm, handleDateStartConfirm}) => {
  return (
    <View style={styles.dataAndTimeDiv}>
      <DateTimePickerModal
          date={startDate}
          isVisible={dateStartPickerVisible}
          mode="date"
          onConfirm={(date)=>{handleDateStartConfirm(date)}}
          onCancel={()=>{setStartDatePickerVisible(false)}}
      />
      <DateTimePickerModal
          date={endDate}
          isVisible={dateEndPickerVisible}
          mode="date"
          onConfirm={(date)=>{handleDateEndConfirm(date)}}
          onCancel={()=>{setEndDatePickerVisible(false)}}
      />
      <Text style={{ fontSize: 24}}>Intervalo de datas: </Text>
      <View  style={styles.dataAndTimePicker}>
        <Pressable style={styles.btnStyle} onPress={()=>{setStartDatePickerVisible(true)}}><Text style={styles.dataTextFormat}>{startDate ? startDate.toLocaleDateString() : 'No date selected'}</Text></Pressable>
        <Text style={styles.smallText}>Data inicial</Text>
        </View>
      <View  style={styles.dataAndTimePicker}>
        <Pressable style={styles.btnStyle} onPress={()=>{setEndDatePickerVisible(true)}}><Text style={styles.dataTextFormat}>{endDate ? endDate.toLocaleDateString() : 'No date selected'}</Text></Pressable>
        <Text style={styles.smallText}>Data final</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  btnStyle:{
    width: "100%",
    height: 45, 
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 20,
    shadowColor: '#000',//IOS Shadow color command
    shadowOffset: { width: 0, height: 2 },//IOS shadow offset command
    shadowOpacity: 0.5,//IOS shadow opacity command
    shadowRadius: 6,//IOS shadow radius command
    elevation: 2, // Android shadow
  },
  dataAndTimeDiv:{
    width: "100%",
  },
  dataTextFormat:{
    fontSize:20,
    height: "100%",
    marginVertical: 10,
    marginLeft: 5,
  },
  smallText:{
    color: "gray",
  },
  dataAndTimePicker:{
    marginBottom: 20,
  },
})

export default DateTimeDiv
