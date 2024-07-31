import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import GrayCreateIcon from "./../../../../assets/BottomBarIcons/GrayIcons/Create.png"
import BlueCreateIcon from "./../../../../assets/BottomBarIcons/BlueIcons/Create.png"
import { useSelector } from 'react-redux'

const AddTab = ({ handleCreateTabClick }) => {
  const isPostOccurrenceModalOn = useSelector((state)=> state.modalReducer.isPostOccurrenceModalOn)//Modal Reducer
  return (
      <TouchableOpacity style={styles.touchable} onPress={handleCreateTabClick}>
        <View style={styles.bottomTab}>
          {
            isPostOccurrenceModalOn ?
            <Image source={BlueCreateIcon} style={{ width: 20, height: 20 }}  />
            :
            <Image source={GrayCreateIcon} style={{ width: 20, height: 20 }}  />
          }
          <Text style={isPostOccurrenceModalOn ? {color:"#0096FF"} : {color:"gray"}}>Criar</Text>
        </View>
       </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  bottomTab:{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  touchable:{
    width: "30%"
  }
})
export default AddTab
