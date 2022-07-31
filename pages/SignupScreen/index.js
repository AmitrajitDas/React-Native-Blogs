import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
} from "react-native"
import { styles } from "./styles"
import LoginPNG from "../../assets/login.png"

const SignupScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={LoginPNG}
        style={{ marginBottom: 50, height: 200, width: 200 }}
      />
      <TextInput
        onPressIn={handleFocus}
        onPressOut={handleBlur}
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        placeholder='Enter username'
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
        onPress={() => alert("This is a button!")}
        underlayColor='#fff'
        style={styles.btn}
      >
        <Text style={styles.btnTxt}>Signup</Text>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor='#fff'
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.options}>Already Signed up? Log in instead</Text>
      </TouchableHighlight>
      <StatusBar style='auto' />
    </SafeAreaView>
  )
}

export default SignupScreen
