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
import api from "../../api"

const BlogScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [blogs, setBlogs] = useState([])

  //   useEffect(() => {
  //     const fetchBlogs = async () => {
  //       setLoading(true)
  //       try {
  //         const { data } = await api.get("/blogs")
  //         console.log(data)
  //         setBlogs(data)
  //       } catch (error) {
  //         console.log(error.response.data.error)
  //         setError(error.response.data.error)
  //         alert(error.response.data.error)
  //       }
  //       setLoading(false)
  //     }
  //     fetchBlogs()
  //   }, [])

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>Blog</Text>
      </View>
      <StatusBar style='auto' />
    </ScrollView>
  )
}

export default BlogScreen
