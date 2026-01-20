import React, { useState } from "react";
import { View, Text, Alert, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraPermissions, Camera } from "expo-camera";
import * as VideoThumbnails from "expo-video-thumbnails";
import axios from "axios";

import CameraRecorder from "@/components/CameraRecorder";
import FrameGallery from "@/components/FrameGallery";
import UploadButton from "@/components/UploadButton";
import styles from "@/styles/cameraStyles";

export default function SurveyorSurvey() {
  const [permission, requestPermission] = useCameraPermissions();

  const [openCamera, setOpenCamera] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [frames, setFrames] = useState<string[]>([]);

  // 🔹 Extract frames (1 frame every 3 sec)
  const extractFrames = async (uri: string, durationMs: number) => {
    try {
      const images: string[] = [];

      for (let time = 0; time < durationMs; time += 3000) {
        const { uri: frame } =
          await VideoThumbnails.getThumbnailAsync(uri, { time });
        images.push(frame);
      }

      setFrames(images);
    } catch (e) {
      console.log("Frame extraction error", e);
    }
  };

  // 🔹 Open camera with permissions
  const openCameraHandler = async () => {
    if (!permission?.granted) {
      const cam = await requestPermission();
      if (!cam.granted) {
        return Alert.alert("Camera permission required");
      }
    }

    const mic = await Camera.requestMicrophonePermissionsAsync();
    if (!mic.granted) {
      return Alert.alert("Microphone permission required");
    }

    setFrames([]);
    setVideoUri(null);
    setOpenCamera(true);
  };

  // 🔹 Called after recording completes
  const onRecordingComplete = async (
    uri: string,
    durationMs: number
  ) => {
    setOpenCamera(false);
    setVideoUri(uri);
    await extractFrames(uri, durationMs);
  };

  // 🔹 Upload
  const uploadData = async () => {
    if (!videoUri) return;

    const formData = new FormData();

    formData.append("video", {
      uri: videoUri,
      name: "survey.mp4",
      type: "video/mp4",
    } as any);

    frames.forEach((img, i) => {
      formData.append("images", {
        uri: img,
        name: `frame_${i}.jpg`,
        type: "image/jpeg",
      } as any);
    });

    await axios.post("https://your-api/upload", formData);
    Alert.alert("Success", "Uploaded successfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.topBar}>
          <Text style={styles.appTitle}>VMC Civic Monitor</Text>
          <Text style={styles.appSubtitle}>
            AI Powered Survey Reporting
          </Text>
        </View>

        {/* CAMERA CARD */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Report New Issue</Text>

          {/* CAMERA BOX */}
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={openCameraHandler}
          >
            <Text style={styles.cameraIcon}>🎥</Text>
            <Text style={styles.uploadText}>
              Tap to record site condition
            </Text>
          </TouchableOpacity>
        </View>

        {/* FRAMES */}
        <FrameGallery frames={frames} />

        {/* UPLOAD */}
        {videoUri && frames.length > 0 && (
          <UploadButton onPress={uploadData} />
        )}
      </ScrollView>

      {/* FULL SCREEN CAMERA */}
      <CameraRecorder
        visible={openCamera}
        onClose={() => setOpenCamera(false)}
        onRecorded={onRecordingComplete}
      />
    </SafeAreaView>
  );
}
