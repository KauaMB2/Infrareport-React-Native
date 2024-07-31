import { View, Text, TextInput, Button, Image , StyleSheet, TouchableWithoutFeedback } from 'react-native'

import logoImage from "./../../assets/logoImage.png"
import EmailIcon from "./../../assets/Register_Login_Icons/EmailIcon.png"
import PasswordIcon from "./../../assets/Register_Login_Icons/PasswordIcon.png"
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from "../../AsyncStorageCommands/AsyncStorage"
import { setUserName, setUserEmail, setUserCityName, setUserPassword, setUserCep, setUserCellphone } from '../../Redux/UserReducer/Actions'
import { useState } from 'react'
import api from "./../../api/api"

const LoginScreen = ({navigation}) => {
  const dispatch=useDispatch()
  const userEmail = useSelector((state)=> state.userReducer.email)//User Reducer
  const userPassword = useSelector((state)=> state.userReducer.password)//User Reducer

  const [errorCode, setErrorCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showCommentErrorMessage, setShowCommentErrorMessage] = useState(false)

  const handleLogin = async () => {
    if((userEmail=="")||(userPassword=="")){
      setErrorCode("Erro: Elementos vazios.")
      setErrorMessage("Por favor, verifique se preencheu todas as entradas de texto.")
      setShowCommentErrorMessage(true)
      return
    }
    try {
      const formData = {
        email: userEmail,
        password: userPassword
      }
      const response = await api.post('/login/citizen', formData)
      const data = await response.data
      await setItem("userName", data.citizen_name)
      await setItem("userPassword", userPassword)
      await setItem("userCep", data.cep)
      await setItem("userCellphone", "99999999999")
      await setItem("userEmail", userEmail)
      await setItem("loggedIn", true)
      setErrorCode("")
      setErrorMessage("")
      setShowCommentErrorMessage(false)
      dispatch(setUserCep(data.cep))
      dispatch(setUserCellphone("99999999999"))
      dispatch(setUserName(data.citizen_name))
      navigation.navigate('MainScreen')
    } catch (error) {
      try{
        const status = error.response.status;
        const data = error.response.data.Erro;
        setErrorCode(status)
        setErrorMessage(data)
        setShowCommentErrorMessage(true)
      }catch(error2){
        setErrorCode("Erro desconhecido(0X005)")
        setErrorMessage(error2.toString())
        setShowCommentErrorMessage(true)
      }
    }
  }
  const handleRegister = () => {
    navigation.navigate('RegisterScreen')
  }

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={{ width: 160, height: 160 }} />
      <Text style={styles.heading}>Infrareport</Text>
      <Text style={styles.subHeading}>Bem vindo! Conecte-se para iniciar!</Text>
      <View style={styles.inputView}>
        <Image source={EmailIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userEmail}
          onChangeText={text => dispatch(setUserEmail(text))}
        />
      </View>
      <View style={styles.inputView}>
        <Image source={PasswordIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={userPassword}
          secureTextEntry
          onChangeText={text => dispatch(setUserPassword(text.toString()))}
        />
      </View>
      {showCommentErrorMessage && <Text style={styles.errorText}>{`${errorCode} - ${errorMessage}`}</Text>}
      <Button title="Logar" onPress={handleLogin} />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem conta? </Text>
        <TouchableWithoutFeedback onPress={handleRegister}><Text style={styles.signupLink}>Cadastre-se!</Text></TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 35,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    padding: 5,
  },
  inputView: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
  },
  signupLink: {
    fontSize: 14,
    color: 'blue',
    marginLeft: 5,
    fontWeight: "600",
  },
  errorText:{
    borderLeftColor: "red",
    borderLeftWidth: 1,
    paddingLeft: 7,
    color: "red",
    fontSize: 12
  },
  errorText:{
    borderLeftColor: "red",
    borderLeftWidth: 1,
    paddingLeft: 7,
    color: "red",
    fontSize: 12
  }
})

export default LoginScreen
