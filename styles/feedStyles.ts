import { StyleSheet } from "react-native";

export const feedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  header: {
    backgroundColor: "#1e4fd8",
    padding: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  filterCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    elevation: 3,
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  filterTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  clearText: {
    color: "#2563eb",
    fontWeight: "600",
  },

  filterRow: {
    flexDirection: "row",
    gap: 6,
  },

  filterBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
  },

  filterBoxActive: {
    borderWidth: 2,
    borderColor: "#111827",
  },

  emptyWrap: {
    alignItems: "center",
    marginTop: 80,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  picker: {
    width: "100%",
    color: "#111827",
    fontSize: 14,
  },

  emptySubtitle: {
    color: "#888",
    marginTop: 6,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },

  cardImage: {
    height: 180,
    width: "100%",
  },

  cardContent: {
    padding: 14,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },

  statusPending: {
    backgroundColor: "#fecaca",
  },

  statusProgress: {
    backgroundColor: "#fde68a",
  },

  statusCompleted: {
    backgroundColor: "#bbf7d0",
  },

  cardDesc: {
    marginTop: 6,
  },

  cardMeta: {
    fontSize: 12,
    marginTop: 6,
  },

  aiText: {
    fontSize: 12,
    color: "#2563eb",
    marginTop: 4,
  },
  filterItem: {
    flex: 1,
  },

  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 4,
    marginLeft: 4,
  },
});
