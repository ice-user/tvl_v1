import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useRouter}  from 'expo-router';
const router = useRouter();

const backgroundImageUri = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU4FdUsIL1vw-6UJdVrp4jr2YrYs-uAZaP2KmY3n26MOaMEDofajjQVHeIA0fHwrvf0w3bfalm3W9eohz9xDdi2a5uf-3gW_hHuPrqDrpcqXm4t10AKF5NCYzbAsJ6kVbRfoekaukOJnIjlqRy_GE6A-kLlSC5FcMmevfJmqLVmz-lwO1EiXVmsV81nviBqXfgN1qTpzCngWIhDbIv2ErN9JG3XqyxCPLlfXicecWWcvgjzYIuZ0YxeaK6m7PJ5vT8zoN0pPGAcM8a';

export default function SmartFitGym() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <ImageBackground source={{ uri: backgroundImageUri }} style={styles.headerImage}>
          <View style={styles.headerOverlay} />
        </ImageBackground> */}
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to SmartFit Gym</Text>
            <Text style={styles.subtitle}>
              Your AI-powered fitness journey starts here. Log in to access personalized workouts and
              track your progress.
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.faceIdButton}>
              {/* Replace with actual icon from react-native-vector-icons or similar */}
              <Text style={styles.iconPlaceholder}>🙂</Text>
              <Text style={styles.buttonText}>Log In with Face ID</Text>
            </TouchableOpacity>

            <View style={styles.orDividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666"
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLink} onPress={() => {router.push('/(tabs)/signUp')}}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      
    </View>
  );
}

const primaryColor = '#38e07b';
const backgroundLight = '#f6f8f7';
const backgroundDark = '#122017';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImage: {
    height: 220,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'column',
    justifyContent: 'center',
    
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    paddingHorizontal: 8,

  },
  title: {
    fontFamily: 'Lexend', // Make sure font is loaded or fallback is used
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    backgroundColor: 'rgba(37, 239, 118, 0.2)',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    maxWidth: '100%',
    width: 500,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    textAlign: 'center',
  },
  buttonsContainer: {
    marginTop: 32,
  },
  faceIdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconPlaceholder: {
    fontSize: 20,
    marginRight: 8,
    color: '#122017',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#122017',
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#666',
  },
  input: {
    height: 56,
    borderRadius: 8,
    backgroundColor: 'rgba(56,224,123,0.2)',
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#000',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: primaryColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  signUpLink: {
    color: primaryColor,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(56,224,123,0.2)',
    backgroundColor: backgroundLight,
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  
  active: {
    color: primaryColor,
  },
});
