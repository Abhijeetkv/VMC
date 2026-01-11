import React from "react";
import { Text, FlatList, Image } from "react-native";
import styles from "../styles/surveyorStyles";

interface Props {
  frames: string[];
}

export default function FrameGallery({ frames }: Props) {
  if (frames.length === 0) return null;

  return (
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
  );
}
