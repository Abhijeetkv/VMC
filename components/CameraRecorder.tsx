import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { CameraView } from "expo-camera";
import styles from "../styles/surveyorStyles";

interface Props {
  cameraRef: any;
  showCamera: boolean;
  recording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export default function CameraRecorder({
  cameraRef,
  showCamera,
  recording,
  onStart,
  onStop,
}: Props) {
  return (
    <>
      {showCamera && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          mode="video"
        />
      )}

      <TouchableOpacity
        style={styles.recordBtn}
        onPress={recording ? onStop : onStart}
      >
        <Text style={styles.recordText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>
    </>
  );
}
