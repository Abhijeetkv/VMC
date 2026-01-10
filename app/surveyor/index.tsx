import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  Alert,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
  Camera,
} from "expo-camera";

import * as VideoThumbnails from "expo-video-thumbnails";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SurveyorDashboard() {
  const cameraRef = useRef<CameraView>(null);
  const recordStartTime = useRef<number>(0);

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [frames, setFrames] = useState<string[]>([]);

  /* ================================
     START RECORDING
  ================================= */
  const startRecording = async () => {
    // Camera permission
    if (!permission?.granted) {
      const cam = await requestPermission();
      if (!cam.granted) {
        Alert.alert("Permission required", "Camera permission needed");
        return;
      }
    }

    // Microphone permission (MANDATORY for video)
    const mic = await Camera.requestMicrophonePermissionsAsync();
    if (!mic.granted) {
      Alert.alert("Permission required", "Microphone permission needed");
      return;
    }

    setFrames([]);
    setVideoUri(null);
    setShowCamera(true);

    setTimeout(async () => {
      if (!cameraRef.current) return;

      try {
        recordStartTime.current = Date.now();
        setRecording(true);

        const video = await cameraRef.current.recordAsync({
          maxDuration: 60,
        });

        const durationMs = Date.now() - recordStartTime.current;

        setRecording(false);
        setShowCamera(false);
        setVideoUri(video.uri);

        await extractFrames(video.uri, durationMs);
      } catch (err) {
        console.error("Recording error:", err);
        setRecording(false);
        setShowCamera(false);
      }
    }, 300);
  };

  /* ================================
     STOP RECORDING
  ================================= */
  const stopRecording = () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
    }
  };

  
  const extractFrames = async (uri: string, durationMs: number) => {
    try {
      const images: string[] = [];

      // Android needs delay to flush video file
      await new Promise((r) => setTimeout(r, 800));

      for (let time = 0; time < durationMs; time += 3000) {
        const { uri: frame } =
          await VideoThumbnails.getThumbnailAsync(uri, { time });

        images.push(frame);
      }

      setFrames(images);
    } catch (error) {
      console.error("Frame extraction error:", error);
    }
  };

  /* ================================
     UPLOAD VIDEO + FRAMES
  ================================= */
  const uploadData = async () => {
    if (!videoUri) return;

    const formData = new FormData();

    formData.append("video", {
      uri: videoUri,
      name: "survey.mp4",
      type: "video/mp4",
    } as any);

    frames.forEach((img, index) => {
      formData.append("images", {
        uri: img,
        name: `frame_${index}.jpg`,
        type: "image/jpeg",
      } as any);
    });

    try {
      await axios.post("https://your-api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Uploaded successfully");
    } catch (error) {
      console.error(error);
      Alert.alert("Upload failed");
    }
  };

  /* ================================
     UI
  ================================= */
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Surveyor Dashboard</Text>

      {showCamera && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          mode="video"
        />
      )}

      <TouchableOpacity
        style={styles.recordBtn}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.recordText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>

      {frames.length > 0 && (
        <>
          <Text style={styles.subtitle}>
            Extracted Frames ({frames.length})
          </Text>

          <FlatList
            data={frames}
            numColumns={3}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.frameImage} />
            )}
          />
        </>
      )}

      {videoUri && frames.length > 0 && (
        <TouchableOpacity style={styles.uploadBtn} onPress={uploadData}>
          <Text style={styles.uploadText}>Upload Data</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

/* ================================
   STYLES
================================ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  camera: {
    height: 260,
    borderRadius: 12,
    overflow: "hidden",
  },
  recordBtn: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  recordText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: "600",
  },
  frameImage: {
    width: "31%",
    height: 100,
    margin: "1%",
    borderRadius: 8,
  },
  uploadBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginVertical: 20,
  },
  uploadText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
