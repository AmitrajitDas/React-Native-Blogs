import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from "react-native"
import { styles } from "./styles"
import LoginPNG from "../../assets/login.png"
import api from "../../api"

const EditUserScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userID, setUserID] = useState()

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const setCurrUser = async () => {
    const userIdString = await AsyncStorage.getItem("userId")
    const userId = JSON.parse(userIdString)
    setUserID(userId)
  }

  useEffect(() => {
    const getCurrUser = async () => {
      setLoading(true)
      const userIdString = await AsyncStorage.getItem("userId")
      const userId = JSON.parse(userIdString)
      try {
        const { data } = await api.get(`/users/${userId}`)
        console.log(data)
        setUsername(data.username)
        setEmail(data.email)
      } catch (error) {
        console.log(error)
        setError(error.response.data.errors)
        alert(error.response.data.errors)
      }
      setLoading(false)
    }
    getCurrUser()
  }, [])

  const updateHandler = async () => {
    setLoading(true)
    const userIdString = await AsyncStorage.getItem("userId")
    const userId = JSON.parse(userIdString)
    console.log(username, email, password, userID)
    try {
      const { data } = await api.patch(
        `/users/${userId}`,
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
      )
      console.log(data)
      alert("User Updated!")
      setPassword("")
      await navigation.push("Blogs")
    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
      alert(error.response.data.error)
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image
        source={LoginPNG}
        style={{ marginBottom: 30, height: 200, width: 200 }}
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder='Update username'
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='Update email'
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
        placeholder='Update password'
      />
      <TouchableHighlight
        onPress={updateHandler}
        underlayColor='#fff'
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Update</Text>
      </TouchableHighlight>
      <StatusBar style='auto' />
    </View>
  )
}

export default EditUserScreen
