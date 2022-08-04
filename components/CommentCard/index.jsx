import { Children, useState, useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
} from "react-native"
import { styles } from "./styles"
import BlogIMG from "../../assets/blogimg.jpg"
import api from "../../api"

const Card = ({ comment, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState("")
  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/users/${comment?.user_id}`)
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
  }, [comment])

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{user}</Text>
        <Text style={{ fontSize: 15 }}>{comment.body}</Text>
      </View>

      <StatusBar style='auto' />
    </View>
  )
}

export default Card
