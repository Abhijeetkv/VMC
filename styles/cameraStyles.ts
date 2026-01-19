import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  topBar: {
    backgroundColor: "#2457e6",
    padding: 18,
  },
  appTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  appSubtitle: {
    color: "#dbe4ff",
    fontSize: 13,
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  // uploadBox: {
  //   height: width * 0.6,
  //   borderRadius: 14,
  //   borderWidth: 1.5,
  //   borderStyle: "dashed",
  //   borderColor: "#c7d2fe",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   overflow: "hidden",
  // },

  camera: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  cameraIcon: {
    fontSize: 48,
    marginBottom: 8,
  },

  uploadText: {
    fontSize: 14,
    color: "#475569",
  },

  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeIdle: {
    backgroundColor: "#22c55e",
  },
  badgeRecording: {
    backgroundColor: "#ef4444",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  recordBtn: {
    marginTop: 16,
    backgroundColor: "#2457e6",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  recordBtnActive: {
    backgroundColor: "#ef4444",
  },
  recordText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  frameImage: {
    width: width / 3 - 24,
    height: width / 3 - 24,
    margin: 4,
    borderRadius: 8,
  },

  uploadBtn: {
    marginHorizontal: 16,
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  uploadBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#c7d2fe",
    borderRadius: 12,
    height: 260, // ⭐ FIXED HEIGHT
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
    overflow: "hidden", // ⭐ VERY IMPORTANT
  },
});
