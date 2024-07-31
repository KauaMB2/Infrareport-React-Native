import {
  View,Text, StyleSheet, Button
} from 'react-native'
const FileInput = ({handleSelectImage}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.inputTextTitle}>Imagem:</Text>
      {/* Your image input */}
      <View style={styles.fileBtn}>
        <Button
          title="Escolha a imagem"
          onPress={handleSelectImage}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    marginBottom: 15,
  },
  inputTextTitle:{
    fontSize: 20,
  },
  fileBtn:{
    width: 160,
  }
})

export default FileInput
