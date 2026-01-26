import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    padding: 16,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  sub: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 12,
  },

  section: {
    fontSize: 15,
    fontWeight: "700",
    marginVertical: 12,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },

  primaryBtn: {
    backgroundColor: "#3b82f6",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  successBtn: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 12,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
});
