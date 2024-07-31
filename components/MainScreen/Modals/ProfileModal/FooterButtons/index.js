import {
  View,Text, StyleSheet, Pressable
} from 'react-native'
const FooterButtons = ({handleExitAccount, handleCloseModal, showChangePasswordModal, showChangeNumberModal}) => {
  return (
    <View style={[styles.contentDiv, styles.footerDiv]}>
      <View style={styles.blueButtonsView}>
        <Pressable
          style={[styles.buttonClose]}
          onPress={handleCloseModal}>
          <Text style={{color: "gray", display: "flex", alignSelf: "center"}}>Voltar</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonExit]}
          onPress={handleExitAccount}>
          <Text style={{color: "white"}}>Sair da conta</Text>
        </Pressable>
      </View>
      <View style={styles.blueButtonsView}>
        <Pressable
          style={[styles.buttonLittle, styles.searchButton]}
          onPress={showChangeNumberModal}>
          <Text style={{color: "white"}}>Redefinir número</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonLittle, styles.searchButton]}
          onPress={showChangePasswordModal}>
          <Text style={{color: "white"}}>Redefinir senha</Text>
        </Pressable>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonLittle: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 8,
    justifyContent: "center",
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 8,
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white"
  },
  buttonExit: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 8,
    justifyContent: "center",
    borderColor: "gray",
    backgroundColor: "red"
  },
  searchButton:{
    backgroundColor: '#2196F3'
  },
  contentDiv:{
    width: "100%",
    height: 100,
    marginBottom: 30,
  },
  footerDiv:{
    flexDirection: "row",
    justifyContent: "center",
  },
  blueButtonsView:{
    flexDirection: "column",
    justifyContent: "space-between",
  }
})

export default FooterButtons
