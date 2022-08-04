import { useState, useEffect, useMemo } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  AsyncStorage,
} from "react-native"
import Card from "../../components/Card"
import { styles } from "./styles"
import { FloatingAction } from "react-native-floating-action"
import api from "../../api"

const BlogsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [blogs, setBlogs] = useState([])

  const actions = [
    {
      text: "Create Blog",
      icon: require("../../assets/blog.png"),
      name: "bt_create_blog",
      position: 1,
    },
    {
      text: "My Blogs",
      icon: require("../../assets/blog.png"),
      name: "bt_my_blog",
      position: 2,
    },
    {
      text: "Edit User",
      icon: require("../../assets/blog.png"),
      name: "bt_edit_user",
      position: 3,
    },
    {
      text: "Log Out",
      icon: require("../../assets/blog.png"),
      name: "bt_logout_user",
      position: 4,
    },
  ]

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("userId")
      navigator.navigate("Login")
    } catch (err) {
      console.log(err)
    }
  }

  // const data = useMemo(() => blogs, [blogs]) // <- dependencies

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const { data } = await api.get("/blogs")
        console.log(data)
        setBlogs(data)
      } catch (error) {
        console.log(error.response.data.error)
        setError(error.response.data.error)
        alert(error.response.data.error)
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  return (
    <View>
      {/* <View style={{ marginTop: 10 }}>
        <TouchableHighlight
          onPress={removeToken}
          underlayColor='#fff'
          style={styles.btn}
        >
          <Text style={styles.btnTxt}>Log Out</Text>
        </TouchableHighlight>
      </View> */}

      <ScrollView style={styles.container}>
        {blogs &&
          blogs.map((blog) => (
            <Card key={blog.id} blog={blog} navigation={navigation} />
          ))}
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={async (name) => {
          if (name === "bt_create_blog") {
            navigation.navigate("CreateBlog")
          }
          if (name === "bt_my_blog") {
            navigation.navigate("MyBlog")
          }
          if (name === "bt_edit_user") {
            navigation.navigate("EditUser")
          }
          if (name === "bt_logout_user") {
            await AsyncStorage.removeItem("token")
            await AsyncStorage.removeItem("userId")
            navigation.navigate("Login")
          }
        }}
        color='#0096FF'
      />
      <StatusBar style='auto' />
    </View>
  )
}

export default BlogsScreen
