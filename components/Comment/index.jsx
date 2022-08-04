import { useState, useEffect, useRef, useMemo } from "react"
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
import CommentCard from "../../components/CommentCard"
import { styles } from "./styles"
import api from "../../api"

const Comment = ({ blogId, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [click, setClick] = useState(false)

  // const { current: commentsArray } = useRef(comments)
  const commentsArray = useMemo(() => comments, [])

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/blogs/${blogId}/comments`)
        console.log(data)
        setComments(data)
      } catch (error) {
        console.log(error.response.data.errors)
        setError(error.response.data.errors)
        // alert(error.response.data.errors)
      }
      setLoading(false)
    }
    fetchComments()
  }, [blogId, comments])

  const commentHandler = async () => {
    setLoading(true)
    try {
      const { data } = await api.post(
        `/blogs/${blogId}/comments`,
        JSON.stringify({
          body: comment,
        })
      )
      console.log(data)
      setComment("")
      // navigation.push("Blogs")
      alert("Commented")
    } catch (error) {
      console.log(error.response.data.errors)
      setError(error.response.data.errors)
      // alert(error.response.data.errors)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.commentInputWrapper}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          style={styles.input}
          placeholder='Comment Here'
        />
        <View style={styles.commentBtnWrapper}>
          <TouchableHighlight
            onPress={commentHandler}
            underlayColor='#fff'
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Comment</Text>
          </TouchableHighlight>
        </View>
      </View>

      <ScrollView style={styles.commentList}>
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </ScrollView>
    </View>
  )
}

export default Comment
