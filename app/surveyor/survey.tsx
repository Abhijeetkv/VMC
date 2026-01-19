import React, { useRef, useState } from "react";
import { View, Text, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions, Camera } from "expo-camera";
import * as VideoThumbnails from "expo-video-thumbnails";
import axios from "axios";

import CameraRecorder from "@/components/CameraRecorder";
import FrameGallery from "@/components/FrameGallery";
import UploadButton from "@/components/UploadButton";
import styles from "@/styles/cameraStyles";

export default function SurveyorSurvey() {
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
    } catch (e) {
      console.log(e);
    }
  };

  const startRecording = async () => {
    if (!permission?.granted) {
      const cam = await requestPermission();
      if (!cam.granted) return Alert.alert("Camera permission needed");
    }

    const mic = await Camera.requestMicrophonePermissionsAsync();
    if (!mic.granted) return Alert.alert("Microphone permission needed");

    setFrames([]);
    setVideoUri(null);
    setShowCamera(true);

    setTimeout(async () => {
      if (!cameraRef.current) return;

      recordStartTime.current = Date.now();
      setRecording(true);

      const video = await cameraRef.current.recordAsync({ maxDuration: 60 });
      const durationMs = Date.now() - recordStartTime.current;

      setRecording(false);
      setShowCamera(false);
      setVideoUri(video.uri);

      await extractFrames(video.uri, durationMs);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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

          <View style={styles.uploadBox}>
            {showCamera ? (
              <CameraView ref={cameraRef} style={styles.camera} mode="video" />
            ) : (
              <>
                <Text style={styles.cameraIcon}>🎥</Text>
                <Text style={styles.uploadText}>
                  Tap record to capture site condition
                </Text>
              </>
            )}

            <View
              style={[
                styles.statusBadge,
                recording ? styles.badgeRecording : styles.badgeIdle,
              ]}
            >
              <Text style={styles.badgeText}>
                {recording ? "RECORDING" : "READY"}
              </Text>
            </View>
          </View>

          <CameraRecorder
            cameraRef={cameraRef}
            showCamera={false}
            recording={recording}
            onStart={startRecording}
            onStop={stopRecording}
          />
        </View>

        {/* FRAMES */}
        <FrameGallery frames={frames} />

        {/* UPLOAD */}
        {videoUri && frames.length > 0 && (
          <UploadButton onPress={uploadData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
