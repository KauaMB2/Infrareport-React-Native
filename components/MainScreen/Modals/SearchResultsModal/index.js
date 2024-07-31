import { View, StyleSheet, ScrollView, Text, Image } from 'react-native'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import { setIsSearchResultsModalOn } from './../../../../Redux/ModalReducer/Actions'

const SearchResultsModal = ({searchResults}) => {
  const dispatch = useDispatch()
  const isSearchResultsModalOn = useSelector((state) => state.modalReducer.isSearchResultsModalOn) // Modal Reducer

  const handleCloseModal = () => {
    dispatch(setIsSearchResultsModalOn(false))
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSearchResultsModalOn}
      onRequestClose={() => {
        setIsSearchResultsModalOn(!isSearchResultsModalOn)
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Header handleCloseModal={handleCloseModal} setIsSearchResultsModalOn={setIsSearchResultsModalOn} />
          <ScrollView style={styles.modalContent}>
            {searchResults instanceof Array && searchResults.map((currentSearchedData, index) => (
              <View key={index} style={styles.resultItem}>
                <Image 
                    source={{ uri: `https://infrareportrestapi.pythonanywhere.com/${currentSearchedData.image}` }}
                    style={styles.image}
                    alt="Occurrence"
                  />
                <View style={styles.info}>
                  <Text style={styles.label}>Tipo de ocorrência:</Text>
                  <Text>{currentSearchedData.occurrence_type}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Comentário:</Text>
                  <Text>{currentSearchedData.user_comment}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Rua:</Text>
                  <Text>{currentSearchedData.street}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Inserção:</Text>
                  <Text>{currentSearchedData.created_at}</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.label}>Conclusão:</Text>
                  <Text>{currentSearchedData.concluded}</Text>
                </View>
                <View style={styles.separator}></View>
              </View>
            ))}
          </ScrollView>
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
    width: "90%",
    height: "80%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center',
    shadowColor: '#000', // IOS Shadow color command
    shadowOffset: { width: 0, height: 2 }, // IOS shadow offset command
    shadowOpacity: 0.25, // IOS shadow opacity color
    shadowRadius: 4, // IOS shadow radius
    elevation: 5, // Android shadow
  },
  modalContent: {
    padding: 10,
    width: "100%",
  },
  resultItem: {
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  }
})

export default SearchResultsModal