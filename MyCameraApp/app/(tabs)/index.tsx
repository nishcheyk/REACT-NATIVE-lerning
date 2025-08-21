import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // for safe area
import Animated, {
  SlideInDown,
  SlideInUp,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

type Note = {
  id: string;
  text: string;
  photoUri?: string;
};

export default function App() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [cameraOpen, setCameraOpen] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [photoUri, setPhotoUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const saved = await AsyncStorage.getItem("notes");
      if (saved) setNotes(JSON.parse(saved));
    } catch {
      Alert.alert("Error", "Failed to load notes");
    }
  };

  const saveNotes = async (newNotes: Note[]) => {
    try {
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
      setNotes(newNotes);
    } catch {
      Alert.alert("Error", "Failed to save notes");
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take photos"
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      setCameraOpen(false);
    }
  };

  const flipCamera = () => {
    setCameraType((prev) => (prev === "back" ? "front" : "back"));
  };

  const addNote = () => {
    if (!text.trim()) {
      Alert.alert("Validation", "Please enter some text");
      return;
    }
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      photoUri,
    };
    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);
    setText("");
    setPhotoUri(undefined);
  };

  if (!permission) {
    return (
      <View
        style={[
          styles.center,
          { paddingTop: insets.top, backgroundColor: "#121212", flex: 1 },
        ]}
      >
        <Text style={{ color: "white" }}>Requesting permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View
        style={[
          styles.center,
          { paddingTop: insets.top, backgroundColor: "#121212", flex: 1 },
        ]}
      >
        <Text style={{ color: "white", marginBottom: 12 }}>
          Camera permission is required
        </Text>
        <Button title="Grant permission" onPress={requestPermission} />
      </View>
    );
  }

  if (cameraOpen) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing={cameraType} />
        <View style={styles.cameraButtonContainer}>
          <Button title="Flip Camera" onPress={flipCamera} color="#6200ee" />
          <Button title="Take Photo" onPress={takePhoto} color="#03dac6" />
          <Button
            title="Cancel"
            onPress={() => setCameraOpen(false)}
            color="#cf6679"
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: "#121212" },
      ]}
    >
      <ScrollView keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
        <Animated.View
          entering={SlideInDown.delay(100)}
          style={styles.inputContainer}
        >
          <TextInput
            placeholder="Enter note text..."
            placeholderTextColor="#888"
            value={text}
            onChangeText={setText}
            style={styles.input}
            multiline
          />
          {photoUri && (
            <Animated.Image
              entering={FadeIn}
              exiting={FadeOut}
              source={{ uri: photoUri }}
              style={styles.photoPreview}
            />
          )}
        </Animated.View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#03dac6" }]}
            onPress={() => setCameraOpen(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#6200ee" }]}
            onPress={addNote}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Add Note</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View entering={FadeIn} style={styles.noteItem}>
              <Text style={styles.noteText}>{item.text}</Text>
              {item.photoUri && (
                <Image
                  source={{ uri: item.photoUri }}
                  style={styles.notePhoto}
                />
              )}
            </Animated.View>
          )}
          ListEmptyComponent={
            <Text style={{ color: "#777", textAlign: "center", marginTop: 20 }}>
              No notes yet
            </Text>
          }
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, paddingHorizontal: 16 },
  inputContainer: {
    marginTop: 10,
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "white",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: "top",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  photoPreview: {
    marginTop: 12,
    width: "100%",
    height: 240,
    borderRadius: 12,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#03dac6",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#121212",
    fontWeight: "700",
    fontSize: 16,
  },
  noteItem: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  noteText: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  notePhoto: {
    width: 160,
    height: 160,
    borderRadius: 14,
  },
  cameraButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    backgroundColor: "#121212cc",
  },
});
