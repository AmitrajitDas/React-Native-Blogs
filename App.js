import { useEffect, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button, AsyncStorage } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./pages/LoginScreen"
import SignupScreen from "./pages/SignupScreen"
import BlogsScreen from "./pages/BlogsScreen"
import BlogScreen from "./pages/BlogScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  const [auth, setAuth] = useState(false)
  // var token
  // useEffect(() => {
  //   const getToken = async () => {
  //     token = await AsyncStorage.getItem("token")
  //   }
  //   getToken()
  // }, [token])

  // const removeToken = async (key) => {
  //   try {
  //     await AsyncStorage.removeItem(key)
  //     navigator.navigate("Login")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={token === null ? "Login" : "Blogs"}
          initialRouteName='Login'
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0096FF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            // headerRight: () => (
            //   <Button
            //     onPress={() => removeToken("token")}
            //     title='Logout'
            //     color='#000'
            //     style={styles.navBtn}
            //   />
            // ),
          }}
        >
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name='Signup'
            component={SignupScreen}
            options={{ title: "Signup" }}
          />
          <Stack.Screen
            name='Blogs'
            component={BlogsScreen}
            options={{ title: "Blogs" }}
          />
          <Stack.Screen
            name='Blog'
            component={BlogScreen}
            options={{ title: "Read Blog" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  navBtn: {
    borderRadius: "50%",
  },
})
