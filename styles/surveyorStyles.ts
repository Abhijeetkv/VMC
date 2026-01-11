import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  camera: {
    height: "60%",
    borderRadius: 12,
    overflow: "hidden",
  },
  recordBtn: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  recordText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: "600",
  },
  frameImage: {
    width: "31%",
    height: 100,
    margin: "1%",
    borderRadius: 8,
  },
  uploadBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginVertical: 20,
  },
  uploadText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
