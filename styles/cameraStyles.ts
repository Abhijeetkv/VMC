import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  /* TOP BAR */
  topBar: {
    backgroundColor: "#2457e6",
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  appTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  appSubtitle: {
    color: "#dbe4ff",
    fontSize: 13,
    marginTop: 4,
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 14,
    padding: 16,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  /* UPLOAD BOX */
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#c7d2fe",
    borderRadius: 12,
    height: width * 0.6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },

  camera: {
    width: "100%",
    height: "100%",
  },

  cameraIcon: {
    fontSize: 48,
    marginBottom: 8,
  },

  uploadText: {
    color: "#475569",
    fontSize: 14,
  },

  /* STATUS BADGE */
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

  /* INFO BOX */
  infoBox: {
    backgroundColor: "#eef4ff",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 14,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1e3a8a",
  },
  infoText: {
    fontSize: 13,
    color: "#1e3a8a",
    marginBottom: 4,
  },
});
