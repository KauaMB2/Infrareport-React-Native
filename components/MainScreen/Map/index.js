import { View, Text, StyleSheet, Image } from 'react-native';
import GifImage from '@lowkey/react-native-gif';
import PreloadingGif from './../../../assets/preloading.gif';
import PersonIcon from "./../../../assets/AvatarIcon.png";
import MapView, { Marker } from 'react-native-maps';
import BathroomIcon from "./../../../assets/reportIcons/Bathroom.png";
import BridgeIcon from "./../../../assets/reportIcons/Bridge.png";
import BuildIcon from "./../../../assets/reportIcons/Build.png";
import ForestIcon from "./../../../assets/reportIcons/Forest.png";
import GrafittiIcon from "./../../../assets/reportIcons/Grafitti.png";
import HoleIcon from "./../../../assets/reportIcons/Hole.png";
import ParkIcon from "./../../../assets/reportIcons/Park.png";
import WaterIcon from "./../../../assets/reportIcons/Water.png";
import PersonSignIcon from "./../../../assets/reportIcons/PersonSign.png";
import SewageIcon from "./../../../assets/reportIcons/Sewage.png";
import StreetIcon from "./../../../assets/reportIcons/Street.png";
import StreetLampOffIcon from "./../../../assets/reportIcons/StreetLampOff.png";
import StreetLampOnIcon from "./../../../assets/reportIcons/StreetLampOn.png";
import TrafficLightIcon from "./../../../assets/reportIcons/TrafficLight.png";
import TrashIcon from "./../../../assets/reportIcons/Trash.png";
import VandalismIcon from "./../../../assets/reportIcons/Vandalism.png";
import WithoutLightIcon from "./../../../assets/reportIcons/WithoutLight.png";
import { useDispatch, useSelector } from 'react-redux';
import { setIsOccurrenceModalOn, setIsPostOccurrenceModalOn } from './../../../Redux/ModalReducer/Actions';
import { setUserName, setUserPoints, setUserPosition, setUserCategory, setProfileMedal } from './../../../Redux/UserReducer/Actions';
import { setCurrentPoint } from './../../../Redux/ReportReducer/Actions';
import { setMarkerPoints } from './../../../Redux/ReportReducer/Actions';
import { setLoadingMap } from './../../../Redux/MapReducer/Actions';
import { useEffect } from 'react';
import BronzeMedalIcon from "./../../../assets/Medals/BronzeMedalIcon.png";
import SilverMedalIcon from "./../../../assets/Medals/SilverMedalIcon.png";
import GoldMedalIcon from "./../../../assets/Medals/GoldMedalIcon.png";
import * as Location from 'expo-location';
import api from '../../../api/api';

const Map = () => {
  const dispatch = useDispatch();

  const handleMapClick = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate
    const currentCoordinate = { position: { lat: latitude, lng: longitude }, occurrenceType: "", comment: "" }
    dispatch(setCurrentPoint(currentCoordinate))
    dispatch(setIsPostOccurrenceModalOn(true))
  };

  const userPoints = useSelector((state) => state.userReducer.points); // Corrigido para 'points'
  const userPosition = useSelector((state) => state.userReducer.position);
  const userCep = useSelector((state) => state.userReducer.cep);
  const userPassword = useSelector((state) => state.userReducer.password);
  const userEmail = useSelector((state) => state.userReducer.email);
  const loadingMap = useSelector((state) => state.mapReducer.loadingMap);
  const markerPoints = useSelector((state) => state.reportReducer.markerPoints);

  const hashTableImage = {
    "Postes Danificados": StreetLampOnIcon,
    "Buracos nas Ruas": HoleIcon,
    "Calçadas Quebradas": StreetIcon,
    "Esgotos e Calhas Transbordando ou Bloqueados": SewageIcon,
    "Placas de Trânsito Quebradas ou Ausentes": PersonSignIcon,
    "Edifícios Abandonados ou Deteriorados": BuildIcon,
    "Problemas na Manutenção de Parques Públicos": ParkIcon,
    "Pichações e Atos de Vandalismo": GrafittiIcon,
    "Descarte Ilegal de Lixo": TrashIcon,
    "Semáforos com Mau Funcionamento": TrafficLightIcon,
    "Sinalização Insuficiente nas Ruas": StreetLampOffIcon,
    "Banheiros Públicos Mal Conservados": BathroomIcon,
    "Pontes ou Viadutos Danificados": BridgeIcon,
    "Corpos d'água Poluídos": WaterIcon,
    "Bancos ou Abrigos Públicos Danificados": VandalismIcon,
    "Vegetação Excessiva Bloqueando Estradas": ForestIcon,
    "Apagões": WithoutLightIcon,
    "User": PersonIcon
  };

  useEffect(() => {
    const loadProfileCategory = () => {
      if (userPoints >= 0 && userPoints < 600) {
        dispatch(setUserCategory("Bronze"));
        dispatch(setProfileMedal(BronzeMedalIcon));
      } else if (userPoints >= 600 && userPoints < 900) {
        dispatch(setUserCategory("Prata"));
        dispatch(setProfileMedal(SilverMedalIcon));
      } else if (userPoints >= 900 && userPoints <= 1000) {
        dispatch(setUserCategory("Ouro"));
        dispatch(setProfileMedal(GoldMedalIcon));
      }
    };

    const getAllOccurrences = async () => {
      console.log(`/getAllOccurrences/${userCep}/${1}/${userEmail}/${userPassword}`)
      const response = await api.get(`/getAllOccurrences/${userCep}/${1}/${userEmail}/${userPassword}`)
      console.log("AAAAAA")
      console.log(response)
      if (response.status === 200) {
        const data = response.data
        const pointsData = data.map((currentData) => (
          {
            position: {
              lat: currentData.latitude,
              lng: currentData.longitude
            },
            id: currentData.id,
            concluded: currentData.concluded,
            occurrence_type: currentData.occurrence_type
          }
        ));
        dispatch(setMarkerPoints(pointsData))
      }
    }

    const getCurrentPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.log('Permission to access location was denied')
        return
      }
      try{
        let location = await Location.getCurrentPositionAsync({})
        if(location.coords.latitude==null || location.coords.longitude==null){
          dispatch(setUserPosition({ latitude: -22.2491706, longitude: -45.707225 }))
        }
        dispatch(setUserPosition({ latitude: location.coords.latitude, longitude: location.coords.longitude }))
        dispatch(setLoadingMap(false))
      }catch{
        dispatch(setUserPosition({ latitude: -22.2491706, longitude: -45.707225 }))
        dispatch(setLoadingMap(false))
      }
    }

    loadProfileCategory()
    getCurrentPosition()
    getAllOccurrences()
    dispatch(setUserPoints(900))
  }, [])
  const handleClickIcon=(markerPoint)=>{
    dispatch(setCurrentPoint({
      position: { lat: markerPoint.position.latitude, lng: markerPoint.position.longitude },
      id: markerPoint.id,
      concluded: markerPoint.concluded,
      occurrence_type: markerPoint.occurrence_type
    }))
    dispatch(setIsOccurrenceModalOn(true))
  }
  return (
    <View style={styles.container}>
      {loadingMap ? (
        <View style={styles.loadingViewer}>
          <GifImage 
            source={PreloadingGif}
            style={styles.loadingGift}
            resizeMode={'cover'}
          />
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={
            userPosition
              ? {
                  latitude: userPosition.latitude,
                  longitude: userPosition.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }
              : null
          }
          onPress={handleMapClick}
        >
          {userPosition && (
            <Marker
              coordinate={{
                latitude: userPosition.latitude,
                longitude: userPosition.longitude,
              }}
              title="You are here"
            >
              <Image
                source={hashTableImage["User"]}
                style={{ width: 40, height: 40 }}
              />
            </Marker>
          )}
          {markerPoints && markerPoints.length > 0 && markerPoints.map((markerPoint, index) => (
            <Marker
              key={markerPoint.id}
              coordinate={{
                latitude: markerPoint.position.lat,
                longitude: markerPoint.position.lng,
              }}
              title={markerPoint.occurrence_type}
              description={markerPoint.comment}
              onClick={()=>{handleClickIcon(markerPoint)}}
            >
              <Image
                source={hashTableImage[markerPoint.occurrence_type]}
                style={{ width: 40, height: 40 }} // Adjust image size as needed
              />
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  circle: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'white', // Red with 50% opacity
    borderRadius: 25,
    top: 25, // Adjust this value to position the circle from the top
    right: 20, // Adjust this value to position the circle from the right
    zIndex: 10, // Ensure the circle appears above the map
  },
  avatarIcon: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  loadingViewer: {
    width: "100%",
    height: "100%",
    paddingTop: "45%",
  },
  loadingText: {
    fontWeight: "800",
    fontSize: 32,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loadingGift: {
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Map;