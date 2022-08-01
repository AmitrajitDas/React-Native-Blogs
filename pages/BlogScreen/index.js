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
import BlogIMG from "../../assets/blogimg.jpg"
import api from "../../api"

const BlogScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [blog, setBlog] = useState({})

  const { blogId, username } = route.params

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/blogs/${blogId}`)
        console.log(data)
        setBlog(data)
      } catch (error) {
        console.log(error.response.data.errors)
        setError(error.response.data.errors)
      }
      setLoading(false)
    }
    getBlog()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={BlogIMG} style={{ width: 500, height: 200 }} />
      </View>
      <Text style={styles.title}>{blog.title}</Text>
      <Text style={styles.body}>{blog.body}</Text>
      <View
        style={{
          marginTop: 20,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>
          Contributed by: {username}
        </Text>
        <Text>{new Date(blog.created_at).toDateString()}</Text>
      </View>
      {/* <Text style={{ marginTop: 20 }}>Date</Text> */}
      <StatusBar style='auto' />
    </ScrollView>
  )
}

export default BlogScreen
