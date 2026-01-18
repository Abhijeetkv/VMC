import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /* ===== SCREEN ===== */
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },

  /* ===== INFO CARDS ===== */
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  label: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 4,
  },

  value: {
    fontSize: 17,
    fontWeight: "600",
    color: "#020617",
  },

  /* ===== STATUS TEXT ===== */
  statusGreen: {
    color: "#16a34a",
    fontWeight: "600",
  },

  statusRed: {
    color: "#dc2626",
    fontWeight: "600",
  },

  /* ===== PRIMARY ACTION ===== */
  startBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },

  startText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ===== FOOTER NOTE ===== */
  note: {
    marginTop: 12,
    fontSize: 13,
    color: "#475569",
    textAlign: "center",
    lineHeight: 18,
  },

  /* ===== CAMERA SUPPORT ===== */
  cameraContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  recordBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#ef4444",
    alignSelf: "center",
    marginBottom: 24,
  },

  /* ===== FRAME GALLERY ===== */
  frameImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 8,
  },

  /* ===== UPLOAD BUTTON ===== */
  uploadBtn: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },

  uploadText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  row: {
  flexDirection: "row",
  justifyContent: "space-between",
},

statusCard: {
  backgroundColor: "#fff",
  padding: 14,
  borderRadius: 10,
  width: "32%",
  alignItems: "center",
},

mapContainer: {
  height: 220,
  borderRadius: 14,
  overflow: "hidden",
  marginVertical: 12,
},

sectionTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginVertical: 8,
},

issueCard: {
  backgroundColor: "#fff",
  padding: 14,
  borderRadius: 10,
  marginBottom: 8,
  flexDirection: "row",
  justifyContent: "space-between",
},

status: {
  fontWeight: "700",
},

green: { color: "#16a34a" },
blue: { color: "#2563eb" },
red: { color: "#dc2626" },

});

