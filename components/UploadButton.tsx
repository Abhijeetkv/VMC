import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "@/styles/surveyorStyles";

interface Props {
  onPress: () => void;
}

export default function UploadButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
      <Text style={styles.uploadText}>Upload Data</Text>
    </TouchableOpacity>
  );
}
