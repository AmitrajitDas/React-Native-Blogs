import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "./pages/LoginScreen"
import SignupScreen from "./pages/SignupScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  const [auth, setAuth] = useState()
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0096FF",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title='Info'
                color='#000'
                style={styles.navBtn}
              />
            ),
          }}
          initialRouteName='Login'
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
