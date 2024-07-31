import {useState, useEffect} from 'react'
import LoginScreen from './components/LoginScreen'
import RegisterScreen from './components/RegisterScreen'
import MainScreen from './components/MainScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { setUserName, setUserCellphone, setUserCep, setUserEmail, setUserPassword } from './Redux/UserReducer/Actions'
import { useDispatch } from 'react-redux'
import { getItem } from './AsyncStorageCommands/AsyncStorage'

const Stack = createStackNavigator()
const App = () => {
  const dispatch=useDispatch()
  const [loggedIn, setLoggedIn]=useState(false)
  useEffect(()=>{
    currentLoggedIn=getItem("loggedIn")
    if(currentLoggedIn==null){
      setLoggedIn(false)
      return
    }
    if(currentLoggedIn==true){
      dispatch(setUserName(getItem("userName")))
      dispatch(setUserEmail(getItem("userEmail")))
      dispatch(setUserCep(getItem("userCep")))
      dispatch(setUserCellphone(getItem("userCellphone")))
      dispatch(setUserPassword(getItem("userPassword")))
    }
    setLoggedIn(currentLoggedIn)
  },[])
  // //USER STATES
  // const userPoints = useSelector((state) => state.userReducer.position)//User Reducer
  // const userName = useSelector((state) => state.userReducer.name)//User Reducer
  // const userPosition = useSelector((state)=> state.userReducer.position)//User Reducer
  // const userProfileMedal = useSelector((state)=> state.userReducer.profileMedal)//User Reducer
  // const userEmail = useSelector((state)=> state.userReducer.email)//User Reducer
  // const userCategory = useSelector((state)=> state.userReducer.profileCategory)//User Reducer
  // const userCellphone = useSelector((state)=> state.userReducer.cellphone)//User Reducer
  // const userPassoword = useSelector((state)=> state.userReducer.password)//User Reducer
  // const userCep = useSelector((state)=> state.userReducer.cep)//User Reducer
  // const userCityName = useSelector((state)=> state.userReducer.cityName)//User Reducer

  // //REPORT STATES
  // const userComment = useSelector((state) => state.reportReducer.userComment)//Report Reducer
  // const selectedOption = useSelector((state) => state.reportReducer.selectedOption)//Report Reducer
  // const startDate = useSelector((state)=> state.reportReducer.startDate)//Report Reducer
  // const endDate = useSelector((state)=> state.reportReducer.endDate)//Report Reducer
  // const markerPoints = useSelector((state)=> state.reportReducer.markerPoints)//Report Reducer

  // //MODAL STATES
  // const isProfileModalOn = useSelector((state) => state.modalReducer.isProfileModalOn)//Modal Reducer
  // const isChangeNumberModalOn = useSelector((state) => state.modalReducer.isChangeNumberModalOn)//Modal Reducer
  // const isChangePasswordModalOn = useSelector((state)=> state.modalReducer.isChangePasswordModalOn)//Modal Reducer
  // const isSearchModalOn = useSelector((state)=> state.modalReducer.isSearchModalOn)//Modal Reducer
  // const isPostOccurrenceModalOn = useSelector((state)=> state.modalReducer.isPostOccurrenceModalOn)//Modal Reducer
  
  // //MAP STATES
  // const loadingMap = useSelector((state)=> state.mapReducer.loadingMap)//Modal Reducer

  //<RegisterScreen EmailIcon={EmailIcon} PersonIcon={PersonIcon} CellphoneIcon={CellphoneIcon} CepIcon={CepIcon} CityIcon={CityIcon} PasswordIcon={PasswordIcon} setEmail={setEmail} email={email} password={password} setPassword={setPassword} cellphone={cellphone} setCellphone={setCellphone} cityName={cityName} setCityName={setCityName} userName={userName} setUserName={setUserName} cep={cep} setCep={setCep} />
  //<LoginScreen logoImage={logoImage} PasswordIcon={PasswordIcon} EmailIcon={EmailIcon} setEmail={setEmail} email={email} password={password} setPassword={setPassword} />
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ loggedIn ? "MainScreen" : "RegisterScreen"} screenOptions={{headerShown: false}}> 
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
    // <MainScreen
    //   profileMedal={profileMedal} postOccurrence={postOccurrence} handleMapClick={handleMapClick} occurrenceList={occurrenceList} cep={cep} setCep={setCep} cityName={cityName} setCityName={setCityName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} cellphone={cellphone} setCellphone={setCellphone} currentPoint={currentPoint} setCurrentPoint={setCurrentPoint}
    //   endDate={endDate} setEndDate={setEndDate} points={userPoints} userName={userName}
    //   userComment={userComment} loadingMap={loadingMap} userPosition={userPosition} setUserComment={setUserComment} selectedOption={selectedOption} setSelectedOption={setSelectedOption} markerPoints={markerPoints} setMarkerPoints={setMarkerPoints} profileCategory={profileCategory} setUserCategory={setUserCategory}
    //   isSearchModalOn={isSearchModalOn} handleMapClick={handleMapClick} setIsSearchModalOn={setIsSearchModalOn} isPostOccurrenceModalOn={isPostOccurrenceModalOn} setIsPostOccurrenceModalOn={setIsPostOccurrenceModalOn} startDate={startDate} setStartDate={setStartDate}
    //   isChangePasswordModalOn={isChangePasswordModalOn} setIsChangePasswordModalOn={setIsChangePasswordModalOn} isChangeNumberModalOn={isChangeNumberModalOn} setIsChangeNumberModalOn={setIsChangeNumberModalOn} ProfileMedal={profileMedal}  PasswordIcon={PasswordIcon} EmailIcon={EmailIcon} CellphoneIcon={CellphoneIcon} AvatarIcon={AvatarIcon} isProfileModalOn={isProfileModalOn} setIsProfileModalOn={setIsProfileModalOn}/>
  )
}
export default App
