import { View, StyleSheet, Image, Text, TextInput, Button } from 'react-native'
import Modal from 'react-native-modal'
import FooterButtons from './FooterButtons'
import Header from './Header'
import Inputs from './Inputs'
import { setIsProfileModalOn, setIsChangeNumberModalOn } from './../../../../Redux/ModalReducer/Actions'
import { useDispatch, useSelector } from 'react-redux'

const ChangeNumberModal = () => {
  const dispatch=useDispatch()
  const isChangeNumberModalOn=useSelector((state)=> state.modalReducer.isChangeNumberModalOn)

  const handleCloseModal=()=>{
    dispatch(setIsChangeNumberModalOn(false))
  }
  const backToProfileModal=()=>{
    dispatch(setIsChangeNumberModalOn(false))
    dispatch(setIsProfileModalOn(true))
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isChangeNumberModalOn}
        onRequestClose={backToProfileModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Header handleCloseModal={handleCloseModal} />
            <View style={styles.modalContent}>
              <Inputs />
              <FooterButtons backToProfileModal={backToProfileModal} />
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: "100%",
    height: 230,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
    shadowColor: '#000',//IOS Shadow color command
    shadowOffset: {width: 0,height: 2,},//IOS shadow offset command
    shadowOpacity: 0.25,//IOS shadow opacity color
    shadowRadius: 4,//IOS shadow radius
    elevation: 5,//Android shadow
  },
  modalContent:{
    padding: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  }
})

export default ChangeNumberModal