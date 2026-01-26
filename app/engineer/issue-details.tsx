import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "@/styles/engineerIssueStyles";

export default function EngineerIssueDetails() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Pothole Issue</Text>
          <Text style={styles.sub}>
            Sayajigunj • Ward 5
          </Text>

          <Text style={styles.section}>Captured Evidence</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                source={{ uri: "https://via.placeholder.com/120" }}
                style={styles.image}
              />
            ))}
          </ScrollView>

          <Text style={styles.section}>Update Status</Text>

          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.btnText}>Mark In Progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.successBtn}>
            <Text style={styles.btnText}>Mark Resolved</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
