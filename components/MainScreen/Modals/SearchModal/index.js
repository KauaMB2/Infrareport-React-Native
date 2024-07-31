import { View, Text, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import {useState} from 'react'
import Dropdown from './Dropdown'
import DateTime from './DateTime'
import FooterButtons from './FooterButtons'
import Header from './Header'
import { setIsSearchModalOn, setIsSearchResultsModalOn } from './../../../../Redux/ModalReducer/Actions'
import { setSelectedOption, setStartDate, setEndDate } from './../../../../Redux/ReportReducer/Actions'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../../../api/api'

const SearchModal = ({setSearchResults}) => {
  const dispatch = useDispatch()
  const [commentErrorMessage, setCommentErrorMessage] = useState('')
  const [showCommentErrorMessage, setShowCommentErrorMessage] =  useState(false)
  const isSearchModalOn = useSelector((state)=> state.modalReducer.isSearchModalOn)//Modal Reducer
  const selectedOption = useSelector((state) => state.reportReducer.selectedOption)//Report Reducer
  const startDate = useSelector((state)=> state.reportReducer.startDate)//Report Reducer
  const endDate = useSelector((state)=> state.reportReducer.endDate)//Report Reducer
  const userPassword = useSelector((state)=> state.userReducer.password)//User Reducer
  const userEmail = useSelector((state)=> state.userReducer.email)//User Reducer
  const userCep = useSelector((state)=> state.userReducer.cep)//User Reducer

  const [dateStartPickerVisible, setStartDatePickerVisible] = useState(false)
  const [dateEndPickerVisible, setEndDatePickerVisible] = useState(false)
  const formatDateString = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const handleValueChange=(itemValue, itemIndex) =>{
    dispatch(setSelectedOption(itemValue))
  }
  const handleDateEndConfirm = (date) => {
    setEndDatePickerVisible(false)
    dispatch(setEndDate(date))
  }
  const handleDateStartConfirm = (date) => {    
    setStartDatePickerVisible(false)
    dispatch(setStartDate(date))
  }
  const handleCloseModal=()=>{
    setCommentErrorMessage("")
    setShowCommentErrorMessage(false)
    dispatch(setIsSearchModalOn(false))
  }
  const handleSearchButton = async ()=>{
    const formattedStartDate = formatDateString(startDate)
    const formattedEndDate = formatDateString(endDate)
    console.log(`/searchOccurrences/${userCep}/${formattedStartDate}/${formattedEndDate}/${selectedOption}/${1}/${userEmail}/${userPassword}`)
    const response = await api.get(`/searchOccurrences/${userCep}/${formattedStartDate}/${formattedEndDate}/${selectedOption}/${1}/${userEmail}/${userPassword}`)
    if(response.status===200){
      data = response.data
      if(data.length==0){
        setCommentErrorMessage("Não há nenhuma ocorrência desse tipo nesse período.")
        setShowCommentErrorMessage(true)
        return
      }
      if(data.length>0){
        setSearchResults(data)
        dispatch(setIsSearchModalOn(false))
        dispatch(setIsSearchResultsModalOn(true))
        setCommentErrorMessage("")
        setShowCommentErrorMessage(false)
      }
    }else{
      data = response.data
      setCommentErrorMessage(`Erro ${response.status} - ${data}`)
      setShowCommentErrorMessage(true)
    }
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSearchModalOn}
        onRequestClose={handleCloseModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Header handleCloseModal={handleCloseModal} />
            <View style={styles.modalContent}>
              <Dropdown showCommentErrorMessage={showCommentErrorMessage} commentErrorMessage={commentErrorMessage} selectedOption={selectedOption} handleValueChange={handleValueChange} />
              <DateTime dateEndPickerVisible={dateEndPickerVisible} setEndDatePickerVisible={setEndDatePickerVisible} dateStartPickerVisible={dateStartPickerVisible} setStartDatePickerVisible={setStartDatePickerVisible} startDate={startDate} endDate={endDate} handleDateEndConfirm={handleDateEndConfirm} handleDateStartConfirm={handleDateStartConfirm} />
              <FooterButtons handleSearchButton={handleSearchButton} handleCloseModal={handleCloseModal}/>
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
    height: 430,
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

export default SearchModal