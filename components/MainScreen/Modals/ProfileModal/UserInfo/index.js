import { View, StyleSheet, Image, TextInput } from 'react-native'
import EmailIcon from "../../../../../assets/Register_Login_Icons/EmailIcon.png"
import PasswordIcon from "../../../../../assets/Register_Login_Icons/PasswordIcon.png"
import CellphoneIcon from "../../../../../assets/Register_Login_Icons/CellphoneIcon.png"

const UserInfo = ({userCellphone, userEmail, userPassword }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Image source={EmailIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Email"
          value={userEmail}
        />
      </View>
      <View style={styles.inputView}>
        <Image source={PasswordIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          editable={false}
          value={userPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.inputView}>
        <Image source={CellphoneIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          editable={false}
          placeholder="Cellphone"
          value={userCellphone}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
  },
  input: {
    height: 40,
    width: '100%',
    padding: 5,
  },
  inputView: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  }
})

export default UserInfo