import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import FooterButtons from './FooterButtons'
import Header from './Header'
import UserInfo from './UserInfo'
import UserPicture from './UserPicture'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfileModalOn, setIsChangeNumberModalOn, setIsChangePasswordModalOn } from './../../../../Redux/ModalReducer/Actions'
import { clear } from '../../../../AsyncStorageCommands/AsyncStorage'
import { setUserName, setUserCellphone, setUserCep, setUserEmail, setUserPassword, setUserCityName, setUserCategory, setUserPoints } from '../../../../Redux/UserReducer/Actions'
import { setMarkerPoints } from '../../../../Redux/ReportReducer/Actions'

const ProfileModal = ({navigation}) => {
  const dispatch=useDispatch()
  const userName = useSelector((state) => state.userReducer.name)//User Reducer
  const userPoints = useSelector((state) => state.userReducer.points)//User Reducer
  const userProfileMedal = useSelector((state)=> state.userReducer.profileMedal)//User Reducer
  const userEmail = useSelector((state)=> state.userReducer.email)//User Reducer
  const userCellphone = useSelector((state)=> state.userReducer.cellphone)//User Reducer
  const userPassword = useSelector((state)=> state.userReducer.password)//User Reducer
  const userProfileCategory = useSelector((state)=> state.userReducer.profileCategory)//User Reducer
  const isProfileModalOn = useSelector((state) => state.modalReducer.isProfileModalOn)//Modal Reducer

  const handleCloseModal=()=>{
    dispatch(setIsProfileModalOn(false))
  }
  const showChangeNumberModal=()=>{
    dispatch(setIsProfileModalOn(false))
    dispatch(setIsChangeNumberModalOn(true))
  }
  const showChangePasswordModal=()=>{
    dispatch(setIsProfileModalOn(false))
    dispatch(setIsChangePasswordModalOn(true))
  }
  const handleExitAccount=()=>{
    dispatch(setIsProfileModalOn(false))
    clear()
    dispatch(setUserName(""))
    dispatch(setUserEmail(""))
    dispatch(setUserCep(""))
    dispatch(setUserCellphone(""))
    dispatch(setUserPassword(""))
    dispatch(setUserCityName(""))
    dispatch(setUserPoints(0))
    dispatch(setUserCategory(""))
    dispatch(setMarkerPoints([]))
    navigation.navigate("RegisterScreen")
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isProfileModalOn}
        onRequestClose={handleCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Header handleCloseModal={handleCloseModal} />
            <View style={styles.modalContent}>
              <UserPicture userProfileMedal={userProfileMedal} userProfileCategory={userProfileCategory} userPoints={userPoints} userName={userName} />
              <UserInfo userCellphone={userCellphone} userEmail={userEmail} userPassword={userPassword} />
              <FooterButtons handleExitAccount={handleExitAccount} handleCloseModal={handleCloseModal} showChangePasswordModal={showChangePasswordModal} showChangeNumberModal={showChangeNumberModal} />
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
    height: 550,
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

export default ProfileModal