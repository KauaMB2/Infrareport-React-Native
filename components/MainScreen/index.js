import { View, StyleSheet } from 'react-native'
import Map from './Map'
import SearchModal from './Modals/SearchModal'
import SearchResultsModal from './Modals/SearchResultsModal'
import ProfileModal from './Modals/ProfileModal'
import ChangeNumberModal from './Modals/ChangeNumberModal'
import ChangePasswordModal from './Modals/ChangePasswordModal'
import PostOccurrenceModal from './Modals/PostOccurrenceModal'
import BottomNavigator from './BottomNavigator'
import { useState } from 'react'


const MainScreen=({ route, navigation})=>{
    const [currentPoint, setCurrentPoint]=useState(null)
    const [searchResults, setSearchResults] = useState([])
    return (
        <View style={styles.container}>
            <Map setCurrentPoint={setCurrentPoint}/>
            <BottomNavigator setCurrentPoint={setCurrentPoint}/>
            <SearchModal setSearchResults={setSearchResults} />
            <SearchResultsModal searchResults={searchResults} />
            <ProfileModal navigation={navigation} />
            <ChangeNumberModal />
            <ChangePasswordModal />
            <PostOccurrenceModal />
        </View>
      )
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default MainScreen