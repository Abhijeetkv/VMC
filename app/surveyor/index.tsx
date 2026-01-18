import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import styles from "@/styles/surveyorStyles";

const issues = [
  {
    id: "1",
    type: "Pothole",
    status: "PENDING",
    lat: 22.3072,
    lng: 73.1812,
  },
  {
    id: "2",
    type: "Garbage",
    status: "ASSIGNED",
    lat: 22.309,
    lng: 73.18,
  },
  {
    id: "3",
    type: "Drainage",
    status: "COMPLETED",
    lat: 22.308,
    lng: 73.179,
  },
];

export default function SurveyorDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Surveyor Dashboard</Text>

      {/* STATUS CARDS */}
      <View style={styles.row}>
        <View style={styles.statusCard}>
          <Text style={styles.label}>Pending</Text>
          <Text style={styles.value}>1</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.label}>Assigned</Text>
          <Text style={styles.value}>1</Text>
        </View>
        <View style={styles.statusCard}>
          <Text style={styles.label}>Completed</Text>
          <Text style={styles.value}>1</Text>
        </View>
      </View>

      {/* MAP */}
      <View style={styles.mapContainer}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 22.3072,
            longitude: 73.1812,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {issues.map((issue) => (
            <Marker
              key={issue.id}
              coordinate={{
                latitude: issue.lat,
                longitude: issue.lng,
              }}
              title={issue.type}
              description={issue.status}
            />
          ))}
        </MapView>
      </View>

      {/* ISSUE LIST */}
      <Text style={styles.sectionTitle}>Reported Issues</Text>

      <FlatList
        data={issues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.issueCard}>
            <Text style={styles.value}>{item.type}</Text>
            <Text
              style={[
                styles.status,
                item.status === "COMPLETED"
                  ? styles.green
                  : item.status === "ASSIGNED"
                  ? styles.blue
                  : styles.red,
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
