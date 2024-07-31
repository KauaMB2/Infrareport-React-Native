import {
  View,Text, StyleSheet, TextInput
} from 'react-native'
const Commentary = ({typeComment, showCommentErrorMessage, commentErrorMessage}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.inputTextTitle}>Comentário:</Text>
          <TextInput
          multiline={true}
          numberOfLines={5}
          style={styles.textarea}
          onChangeText={(text)=>{typeComment(text)}}
          />
      </View>
      {showCommentErrorMessage && <Text style={styles.errorText}>{commentErrorMessage}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    marginBottom: 15,
  },
  textarea: {
    width: "100%",
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 5,
  },
  inputTextTitle:{
    fontSize: 20,
  },
  errorText:{
    borderLeftColor: "red",
    borderLeftWidth: 1,
    paddingLeft: 7,
    color: "red",
    fontSize: 12
  }
})

export default Commentary
