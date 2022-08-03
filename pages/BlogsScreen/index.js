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
  ]

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
      <ScrollView style={styles.container}>
        {blogs &&
          blogs.map((blog) => (
            <Card key={blog.id} blog={blog} navigation={navigation} />
          ))}
      </ScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          navigation.navigate("CreateBlog")
        }}
        color='#0096FF'
      />
      <StatusBar style='auto' />
    </View>
  )
}

export default BlogsScreen
