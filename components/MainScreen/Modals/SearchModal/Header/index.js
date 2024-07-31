import {
  View,Text, StyleSheet, Pressable, Image
} from 'react-native'
import CloseIcon from './../../../../../assets/close.png'
const Header = ({handleCloseModal}) => {
  return (
    <View style={styles.modalTop}>
      <View>
        <Text style={styles.modalTopText}>Pesquise as ocorrências</Text>
      </View>
      <Pressable onPress={handleCloseModal}>
        <Image source={CloseIcon} style={{ width: 34, height: 34 }}  />
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  modalTopText:{
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalTop:{
    backgroundColor: "#007bff",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  }
})

export default Header
