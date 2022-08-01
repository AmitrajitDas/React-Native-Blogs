import axios from "axios"
import { AsyncStorage } from "react-native"

const api = axios.create({
  baseURL: "http://10.0.2.2:3000",
  // withCrendentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token")
    // const parsedToken = JSON.parse(token)
    config.headers.Authorization = token ? `Bearer ${token}` : ""
    return config
  },
  (res) => res,
  (error) => {
    console.log(res.status)
    // let res = error.response
    // console.error(res.status)
    // return Promise.reject(error)
  }
)

export default api
