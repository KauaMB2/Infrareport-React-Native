import React, { useState } from 'react'
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import api from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setItem } from '../../AsyncStorageCommands/AsyncStorage'
import { setUserName, setUserEmail, setUserCityName, setUserPassword, setUserCep, setUserCellphone } from './../../Redux/UserReducer/Actions'
import EmailIcon from "./../../assets/Register_Login_Icons/EmailIcon.png"
import PersonIcon from "./../../assets/Register_Login_Icons/PersonIcon.png"
import CellphoneIcon from "./../../assets/Register_Login_Icons/CellphoneIcon.png"
import CepIcon from "./../../assets/Register_Login_Icons/CepIcon.png"
import CityIcon from "./../../assets/Register_Login_Icons/CityIcon.png"
import PasswordIcon from "./../../assets/Register_Login_Icons/PasswordIcon.png"

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.userReducer.name)
  const userEmail = useSelector((state) => state.userReducer.email)
  const userCellphone = useSelector((state) => state.userReducer.cellphone)
  const userCep = useSelector((state) => state.userReducer.cep)
  const userCityName = useSelector((state) => state.userReducer.cityName)
  const userPassword = useSelector((state) => state.userReducer.password)

  const [errorCode, setErrorCode] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [showCommentErrorMessage, setShowCommentErrorMessage] = useState(false)

  const handleRegister = async () => {
    if((userName=="")||(userEmail=="")||(userCellphone=="")||(userCep=="")||(userCityName=="")||(userPassword=="")){
      setErrorCode("Erro: Elementos vazios.")
      setErrorMessage("Por favor, verifique se preencheu todas as entradas de texto.")
      setShowCommentErrorMessage(true)
      return
    }
    try {
      const formData = {
        cep: userCep,
        city_name: userCityName,
        state_name: "string",
        email: userEmail,
        password: userPassword,
        neighborhood: "string",
        street: "string",
        residential_number: "string",
        citizen_name: userName
      }
      await api.post('/postCitizen/', formData)
      await setItem("userName", userName)
      await setItem("userPassword", userPassword)
      await setItem("userCep", userCep)
      await setItem("userCellphone", userCellphone)
      await setItem("userEmail", userEmail)
      await setItem("loggedIn", true)
      setErrorCode("")
      setErrorMessage("")
      setShowCommentErrorMessage(false)
      navigation.navigate("MainScreen")
    } catch (error) {
      try{
        const status = error.response.status;
        const data = error.response.data.Erro;
        setErrorCode(status)
        setErrorMessage(data)
        setShowCommentErrorMessage(true)
      }catch(erro2){
        setErrorCode("Erro desconhecido(0X005)")
        setErrorMessage(erro2.toString())
        setShowCommentErrorMessage(true)
      }
    }
  }
  const handleConectyourself = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Infrareport</Text>
      <Text style={styles.subHeading}>Bem vindo! Registre-se para iniciar!</Text>
      <View style={styles.inputView}>
        <Image source={PersonIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={userName}
          onChangeText={(text) => dispatch(setUserName(text))}
        />
      </View>
      <View style={styles.inputView}>
        <Image source={EmailIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userEmail}
          onChangeText={(text) => dispatch(setUserEmail(text))}
        />
      </View>
      <View style={styles.CepAndCellphoneView}>
        <View style={styles.littleInputView}>
          <Image source={CepIcon} style={{ width: 20, height: 20 }} />
          <TextInput
            style={styles.littleInput}
            placeholder="CEP"
            value={userCep}
            onChangeText={(text) => dispatch(setUserCep(text))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.littleInputView}>
          <Image source={CellphoneIcon} style={{ width: 20, height: 20 }} />
          <TextInput
            style={styles.littleInput}
            placeholder="Número"
            value={userCellphone}
            onChangeText={(text) => dispatch(setUserCellphone(text))}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.inputView}>
        <Image source={CityIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Nome da cidade"
          value={userCityName}
          onChangeText={(text) => dispatch(setUserCityName(text))}
        />
      </View>
      <View style={styles.inputView}>
        <Image source={PasswordIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={userPassword}
          onChangeText={(text) => dispatch(setUserPassword(text))}
        />
      </View>
      {showCommentErrorMessage && <Text style={styles.errorText}>{`${errorCode} - ${errorMessage}`}</Text>}

      <Button title="Registrar" onPress={handleRegister} />

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Já tem conta? </Text>
        <TouchableWithoutFeedback onPress={handleConectyourself}><Text style={styles.signupLink}>Conecte-se!</Text></TouchableWithoutFeedback>
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
  littleInput: {
    height: 40,
    width: '100%',
    padding: 10,
  },
  littleInputView: {
    height: 40,
    width: '45%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
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
  CepAndCellphoneView:{
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorText:{
    borderLeftColor: "red",
    borderLeftWidth: 1,
    paddingLeft: 7,
    color: "red",
    fontSize: 12
  }
})

export default RegisterScreen
