import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  commentInputWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  input: {
    borderColor: "#0096FF",
    height: 45,
    width: 200,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
  },
  commentBtnWrapper: {
    marginTop: 12,
  },
  btn: {
    backgroundColor: "#0096FF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnTxt: {
    color: "#fff",
    fontSize: 15,
  },
  commentList: {
    marginTop: 20,
    marginBottom: 20,
  },
})
