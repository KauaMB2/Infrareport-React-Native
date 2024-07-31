import { View, StyleSheet } from 'react-native'

import CreateTab from './CreateTab'
import SearchTab from './SearchTab'
import ProfileTab from './ProfileTab'
import { useDispatch, useSelector } from 'react-redux'
import { setIsProfileModalOn, setIsSearchModalOn, setIsPostOccurrenceModalOn } from './../../../Redux/ModalReducer/Actions'
import { setCurrentPoint } from './../../../Redux/ReportReducer/Actions'

const BottomNavigator = () => {
  const dispatch=useDispatch()
  const userPosition = useSelector((state)=> state.userReducer.position)//User Reducer

  const handleProfileModalOn=()=>{
    dispatch(setIsProfileModalOn(true))
  }
  const handleSearchModalOn=()=>{
    dispatch(setIsSearchModalOn(true))
  }
  const handleCreateTabClick=()=>{
    const { latitude, longitude } = userPosition
    const currentCordenate = { position: { lat: latitude, lng: longitude }, occurrenceType: "", comment: "" }
    dispatch(setCurrentPoint(currentCordenate))
    dispatch(setIsPostOccurrenceModalOn(true))
  }
  return (
    <View style={styles.bottomNavigator}>
      <SearchTab handleSearchModalOn={handleSearchModalOn} />
      <CreateTab handleCreateTabClick={handleCreateTabClick} />
      <ProfileTab handleProfileModalOn={handleProfileModalOn} />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNavigator:{
    height: "7%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: 'white',
    borderTopColor: "gray",
    borderTopWidth: 0.5,
  }
})

export default BottomNavigator
