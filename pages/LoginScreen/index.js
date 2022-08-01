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
import { AsyncStorage } from "react-native"
import { styles } from "./styles"
import LoginPNG from "../../assets/login.png"
import api from "../../api"

const LoginScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const loginHandler = async () => {
    setLoading(true)
    console.log(email, password)
    try {
      const { data } = await api.post(
        "/login",
        JSON.stringify({
          email: email,
          password: password,
        })
      )
      console.log(data)
      await AsyncStorage.setItem("token", data.token)
      await navigation.navigate("Blogs")
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error)
      alert(error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={LoginPNG}
        style={{ marginBottom: 50, height: 200, width: 200 }}
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='Enter email'
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder='Enter password'
      />
      <TouchableHighlight
        onPress={loginHandler}
        underlayColor='#fff'
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor='#fff'
        onPress={() => navigation.navigate("Signup")}
      >
        <Text style={styles.options}>New User? Sign Up</Text>
      </TouchableHighlight>

      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

export default LoginScreen
