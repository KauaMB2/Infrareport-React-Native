import { View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import Dropdown from './Dropdown'
import FooterButtons from './FooterButtons'
import Header from './Header'
import Commentary from './Commentary'
import FileInput from './FileInput'
import { useState } from 'react'
import { setIsPostOccurrenceModalOn } from './../../../../Redux/ModalReducer/Actions'
import { setSelectedOption, setUserComment, setMarkerPoints, setSelectedImage } from './../../../../Redux/ReportReducer/Actions'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../../../api/api'
import { launchImageLibrary } from 'react-native-image-picker'
import GOOGLE_MAPS_API_KEY from './GOOGLE_MAPS_API_KEY'

const PostOccurrenceModal = () => {
  const dispatch=useDispatch()
  const [commentErrorMessage, setCommentErrorMessage] = useState('')
  const [showCommentErrorMessage, setShowCommentErrorMessage] =  useState(false)
  const [neighborhoodGeocoding, setNeighborhoodGeocoding] = useState('')
  const [streetGeocoding, setStreetGeocoding] = useState('')
  const isPostOccurrenceModalOn=useSelector((state)=> state.modalReducer.isPostOccurrenceModalOn)//Modal Reducer
  const userComment = useSelector((state) => state.reportReducer.userComment)//Report Reducer
  const selectedOption = useSelector((state) => state.reportReducer.selectedOption)//Report Reducer
  const currentPoint = useSelector((state) => state.reportReducer.currentPoint)//Report Reducer
  const markerPoints = useSelector((state) => state.reportReducer.markerPoints)//Report Reducer
  const selectedImage = useSelector((state) => state.reportReducer.image)//Report Reducer
  const userEmail = useSelector((state) => state.userReducer.email)//User Reducer
  const userCep = useSelector((state)=> state.userReducer.cep)//User Reducer

  const postOccurrence=async()=>{
    try{
      try {
        const geocodingResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}&latlng=${currentPoint.position.lat},${currentPoint.position.lng}`
        )
        const geocodeData = await geocodingResponse.json()
        console.log(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}&latlng=${currentPoint.position.latitude},${currentPoint.position.longitude}`)
        if (geocodeData.status !== 'OK' || !geocodeData.results || geocodeData.results.length === 0) {
          console.log('Geocoding API returned an error or no results: ');
          console.log(geocodeData)
          return;
        }
        let foundAllAddressInfo = 0;
        // Iterate through the address_components
        for (const component of geocodeData.results[0].address_components) {
          // Check if the component has the "neighborhood" type
          if (component.types.includes('neighborhood')) {
            setNeighborhoodGeocoding(component.long_name);
            foundAllAddressInfo++;
          }
          // Check if the component has the "route" type
          if (component.types.includes('route')) {
            setStreetGeocoding(component.long_name);
            foundAllAddressInfo++;
          }
          if (foundAllAddressInfo === 2) {
            break;
          }
        }
      } catch (error) {
        console.log('Error fetching geocoding data:', error);
      }
      const formData={
        citizen_email: userEmail,
        cep: parseInt(userCep),
        occurrence_type: selectedOption,
        neighborhood: neighborhoodGeocoding,
        street: streetGeocoding,
        user_comment: userComment,
        latitude: currentPoint.position.lat,
        longitude: currentPoint.position.lng,
        image: selectedImage
      }
      currentPoint.occurrence_type=selectedOption
      currentPoint.comment=userComment
      console.log(currentPoint)
      console.log(newMarkers)
      const response=await api.post('/occurrence/',formData)
      const data=await response.data
      currentPoint.id=data.id
      const newMarkers = [...markerPoints, currentPoint]
      dispatch(setMarkerPoints(newMarkers))
      dispatch(setIsPostOccurrenceModalOn(false))
      dispatch(setUserComment(""))
    }catch(error){
      try{
        const status = error.response.status;
        const data = error.response.data.Erro;
        setCommentErrorMessage(`${status} - ${data}`)
        setShowCommentErrorMessage(true)
      }catch(error2){
        setCommentErrorMessage("Erro desconhecido(0X005) - "+error2)
        setShowCommentErrorMessage(true)
      }
    }
  }
  const typeComment=(text)=>{
    if(text!=""){
      setShowCommentErrorMessage(false)
    }
    dispatch(setUserComment(text))
  }
  const handleCloseModal=()=>{
    dispatch(setIsPostOccurrenceModalOn(false))
    setShowCommentErrorMessage(false)
    dispatch(setUserComment(""))
  }
  const handleValueChange = (itemValue, itemIndex) =>{
    dispatch(setSelectedOption(itemValue))
  }
  const handleSelectImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          dispatch(setSelectedImage(asset))
        }
      }
    )
  }
  const validateData=()=>{
    if(userComment.trim() === ''){
      setShowCommentErrorMessage(true)
      setCommentErrorMessage('O comentário não pode estar vazio.')
      return
    }
    postOccurrence()
  }
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPostOccurrenceModalOn}
        onRequestClose={() => {
          dispatch(setIsPostOccurrenceModalOn(false))
          dispatch(setUserComment(""))
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Header handleCloseModal={handleCloseModal} />
            <View style={styles.modalContent}>
              <Dropdown selectedOption={selectedOption} handleValueChange={handleValueChange} />
              <Commentary typeComment={typeComment} showCommentErrorMessage={showCommentErrorMessage} commentErrorMessage={commentErrorMessage} />
              <FileInput handleSelectImage={handleSelectImage} />
              <FooterButtons validateData={validateData} handleCloseModal={handleCloseModal} />
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
    height: 480,
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

export default PostOccurrenceModal