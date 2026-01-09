import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as VideoThumbnails from "expo-video-thumbnails";
import axios from "axios";

export default function SurveyorDashboard() {
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [frames, setFrames] = useState<string[]>([]);

  // ========================
  // START RECORDING
  // ========================
  const startRecording = async () => {
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Alert.alert("Permission required", "Camera access is needed");
        return;
      }
    }

    setShowCamera(true);

    setTimeout(async () => {
      if (!cameraRef.current) return;

      try {
        setRecording(true);
        const video = await cameraRef.current.recordAsync();
        setVideoUri(video.uri);
        setRecording(false);
        setShowCamera(false);

        await extractFrames(video.uri);
      } catch (err) {
        console.error(err);
        setRecording(false);
        setShowCamera(false);
      }
    }, 300);
  };

  // ========================
  // STOP RECORDING
  // ========================
  const stopRecording = () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
    }
  };

  // ========================
  // EXTRACT IMAGES EVERY 2s
  // ========================
  const extractFrames = async (uri: string) => {
    try {
      const thumbnails: string[] = [];

      // Estimate up to 60s max (adjustable)
      for (let time = 0; time <= 60000; time += 2000) {
        try {
          const { uri: thumb } =
            await VideoThumbnails.getThumbnailAsync(uri, { time });
          thumbnails.push(thumb);
        } catch {
          break;
        }
      }

      setFrames(thumbnails);
    } catch (error) {
      console.error("Thumbnail error:", error);
    }
  };

  // ========================
  // UPLOAD (AXIOS)
  // ========================
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Surveyor Dashboard</Text>

      {/* CAMERA */}
      {showCamera && (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          mode="video"
        />
      )}

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? "Stop Recording" : "Start Recording"}
        </Text>
      </TouchableOpacity>

      {/* PREVIEW FRAMES */}
      {frames.length > 0 && (
        <>
          <Text style={styles.subtitle}>Captured Frames</Text>
          <ScrollView horizontal>
            {frames.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={styles.image} />
            ))}
          </ScrollView>
        </>
      )}

      {/* UPLOAD */}
      {videoUri && (
        <TouchableOpacity style={styles.uploadBtn} onPress={uploadData}>
          <Text style={styles.uploadText}>Upload Data</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 16 },
  camera: { height: 300, borderRadius: 10, overflow: "hidden" },
  button: {
    backgroundColor: "#111",
    padding: 12,
    marginTop: 16,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  image: { width: 80, height: 80, marginRight: 8, borderRadius: 6 },
  uploadBtn: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
  },
  uploadText: { color: "#fff", textAlign: "center", fontSize: 16 },
});
