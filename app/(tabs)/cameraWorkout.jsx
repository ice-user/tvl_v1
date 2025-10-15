import {
    Camera, // 👈 New: Use the official CameraType enum
    useCameraPermissions
} from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function CameraWorkout() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  // 💡 Change default state to use the enum value
  const [type, setType] = useState(Camera.back); 
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let interval;

    if (permission?.granted && cameraRef.current) {
      interval = setInterval(async () => {
        if (processing) return; // avoid overlap

        setProcessing(true);
        try {
          // Use low quality for performance in a repeating snapshot loop
          const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.3 });
          // TODO: Send photo.base64 to your AI model here or process it locally
          console.log('Captured frame, length:', photo.base64.length);
        } catch (e) {
          console.error('Error capturing frame:', e);
        }
        setProcessing(false);
      }, 1000); // capture every 1 second, adjust as needed
    }

    return () => clearInterval(interval);
  }, [permission, processing]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.center}>
        <Text>Camera is not supported on web. Please use a mobile device.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* type now uses the enum value */}
      <Camera style={styles.camera} ref={cameraRef} type={type} /> 
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setType(
            type === CameraType.back ? CameraType.front : CameraType.back // Toggle using enum
          )}
          disabled={loading || processing}
        >
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  message: { textAlign: 'center', paddingBottom: 10 },
  camera: { flex: 1 },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00000088',
  },
  button: {
    backgroundColor: '#38e07b',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});