import React, { useRef, useState } from "react";
import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import * as VideoThumbnails from "expo-video-thumbnails";
import axios from "axios";

import CameraRecorder from "@/components/CameraRecorder";
import FrameGallery from "@/components/FrameGallery";
import UploadButton from "@/components/UploadButton";
import styles from "@/styles/surveyorStyles";

export default function SurveyorDashboard() {
  const cameraRef = useRef<CameraView>(null);
  const recordStartTime = useRef<number>(0);

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [frames, setFrames] = useState<string[]>([]);

  
  const extractFrames = async (uri: string, durationMs: number) => {
    try {
      const images: string[] = [];
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

  const startRecording = async () => {
    if (!permission?.granted) {
      const cam = await requestPermission();
      if (!cam.granted) {
        Alert.alert("Permission required", "Camera permission needed");
        return;
      }
    }

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
        console.error(err);
        setRecording(false);
        setShowCamera(false);
      }
    }, 300);
  };

  const stopRecording = () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
    }
  };

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

    await axios.post("https://your-api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Alert.alert("Success", "Uploaded successfully");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Surveyor Dashboard</Text>

      <CameraRecorder
        cameraRef={cameraRef}
        showCamera={showCamera}
        recording={recording}
        onStart={startRecording}
        onStop={stopRecording}
      />

      <FrameGallery frames={frames} />

      {videoUri && frames.length > 0 && (
        <UploadButton onPress={uploadData} />
      )}
    </SafeAreaView>
  );
}
