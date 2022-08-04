import { useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
} from "react-native"
import api from "../../api"
import { styles } from "./styles"
import CreateBlogIMG from "../../assets/createblog.png"

// const UselessTextInput = (props) => {
//   return (
//     <TextInput
//       {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
//       editable
//       maxLength={40}
//       style={{ padding: 10, borderColor: "#0096FF" }}
//     />
//   )
// }

const EditBlogScreen = ({ navigation, route }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const { blogId } = route.params

  useEffect(() => {
    setLoading(true)
    api
      .get(`/blogs/${blogId}`)
      .then((res) => {
        console.log(res.data)
        setTitle(res.data.title)
        setBody(res.data.body)
      })
      .catch((error) => {
        console.log(error.response.data.errors)
        setError(error.response.data.errors)
      })
    setLoading(false)
  }, [navigation])

  const updateBlogHandler = async () => {
    setLoading(true)
    console.log(title, body)
    try {
      const { data } = await api.patch(
        `/blogs/${blogId}`,
        JSON.stringify({
          title: title,
          body: body,
        })
      )
      console.log(data)
      alert("Blog Updated!")
      navigation.push("Blogs")
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error)
      alert(error.response.data.error)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image
        source={CreateBlogIMG}
        style={{ marginBottom: 50, height: 200, width: 200 }}
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder='Update Blog Title'
      />
      {/* <UselessTextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        multiline
        numberOfLines={40}
        value={body}
        onChangeText={setBody}
        placeholder='Update Blog Description'
      /> */}
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={body}
        onChangeText={setBody}
        style={styles.input}
        multiline={true}
        numberOfLines={5}
        placeholder='Update Blog Description'
      />
      <TouchableHighlight
        onPress={updateBlogHandler}
        underlayColor='#fff'
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Update</Text>
      </TouchableHighlight>
      <StatusBar style='auto' />
    </View>
  )
}

export default EditBlogScreen
