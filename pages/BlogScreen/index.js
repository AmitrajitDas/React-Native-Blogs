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
import Card from "../../components/Card"
import { styles } from "./styles"
import BlogIMG from "../../assets/blogimg.jpg"
import api from "../../api"

const BlogScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [blog, setBlog] = useState({})
  const [userID, setUserID] = useState()

  const { blogId, username } = route.params

  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] })
        return true
      })
    })
  })

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true)
      const userIdString = await AsyncStorage.getItem("userId")
      const userId = JSON.parse(userIdString)
      setUserID(userId)

      try {
        const { data } = await api.get(`/blogs/${blogId}`)
        console.log(data)
        await setBlog(data)
      } catch (error) {
        console.log(error.response.data.errors)
        setError(error.response.data.errors)
      }
      setLoading(false)
    }
    getBlog()
  }, [blogId])

  const editHandler = () => {
    navigation.push("EditBlog", {
      blogId: blogId,
    })
  }

  const deleteHandler = async () => {
    setLoading(true)
    try {
      const { data } = await api.delete(`/blogs/${blogId}`)
      console.log(data)
      await alert("Blog deleted!")
      await navigation.push("Blogs")
    } catch (error) {
      console.log(error.response.data.errors)
      setError(error.response.data.errors)
    }
    setLoading(false)
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={BlogIMG} style={{ width: 500, height: 200 }} />
      </View>
      {blog.user_id === userID ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{blog.title}</Text>
          <TouchableHighlight
            onPress={editHandler}
            underlayColor='#fff'
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Edit</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={deleteHandler}
            underlayColor='#fff'
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Delete</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>{blog.title}</Text>
        </View>
      )}

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
