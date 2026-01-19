import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "@/styles/cameraStyles";

interface Props {
  cameraRef: any;
  showCamera: boolean;
  recording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function CameraRecorder({
  recording,
  onStart,
  onStop,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.recordBtn,
        recording && styles.recordBtnActive,
      ]}
      onPress={recording ? onStop : onStart}
    >
      <Text style={styles.recordText}>
        {recording ? "Stop Recording" : "Start Recording"}
      </Text>
    </TouchableOpacity>
  );
}
