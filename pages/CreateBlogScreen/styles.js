import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -120,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  btn: {
    marginTop: 20,
    backgroundColor: "#0096FF",
    marginRight: 40,
    marginLeft: 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
  },

  btnTxt: {
    color: "#fff",
    fontSize: 15,
  },
  options: {
    marginTop: 20,
    color: "#0096FF",
    textDecorationLine: "underline",
  },
})
