import {
  View,Text, StyleSheet
} from 'react-native'
import {Picker} from '@react-native-picker/picker'

const Dropdown = ({selectedOption, handleValueChange, occurrenceList}) => {
  return (
    <View style={styles.contentDiv}>
      <Text style={{ fontSize: 24}}>Ocorrências: </Text>
      <View style={styles.btnStyle}>
        <Picker
            selectedValue={selectedOption}
            mode={'dropdown'}
            onValueChange={handleValueChange}>
            {
              occurrenceList.map(occurrence=> <Picker.Item key={occurrence} label={occurrence} value={occurrence}/>)
            }
        </Picker>
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
  contentDiv:{
    width: "100%",
    marginBottom: 30,
  }
})

export default Dropdown
