import { useState, useEffect } from "react"
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
import api from "../../api"
import Card from "../../components/Card"
import { styles } from "./styles"

const MyBlogScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true)
      try {
        const { data } = await api.get("/blogs")
        console.log(data)
        const userIdString = await AsyncStorage.getItem("userId")
        const userId = JSON.parse(userIdString)
        await setBlogs(data.filter((x) => x.user_id === userId))
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
      <ScrollView style={styles.container}>
        {blogs &&
          blogs.map((blog) => (
            <Card key={blog.id} blog={blog} navigation={navigation} />
          ))}
      </ScrollView>
    </View>
  )
}

export default MyBlogScreen
