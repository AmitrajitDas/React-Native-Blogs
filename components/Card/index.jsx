import { Children, useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { Text, View, Image, TouchableHighlight } from "react-native"
import { styles } from "./styles"
import BlogIMG from "../../assets/blogimg.jpg"
import api from "../../api"

const Card = ({ blog, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState("")
  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/users/${blog?.user_id}`)
        console.log(data)
        await setUser(data.username)
      } catch (error) {
        console.log(error.response.data.error)
        setError(error.response.data.error)
        alert(error.response.data.error)
      }
      setLoading(false)
    }
    getUser()
  }, [])

  return (
    <TouchableHighlight
      underlayColor='#fff'
      onPress={() =>
        navigation.push("Blog", {
          blogId: blog?.id,
          username: user && user,
        })
      }
    >
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image source={BlogIMG} style={{ width: 270, height: 100 }} />
          </View>

          <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>
            {blog.title}
          </Text>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>By {user}</Text>
            <Text>{new Date(blog.created_at).toDateString()}</Text>
          </View>
        </View>
        <StatusBar style='auto' />
      </View>
    </TouchableHighlight>
  )
}

export default Card
