import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function Signup() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Join SmartFit Gym today and start your personalized fitness journey!
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#666"
              style={styles.input}
              autoCapitalize="words"
              autoCorrect={false}
            />
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
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink} onPress={() => {}}>
                Log In
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
    backgroundColor: backgroundDark,
  },
  scrollContent: {
    flexGrow: 1,
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
    backgroundColor: 'rgba(37, 239, 118, 0.1)',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Lexend',
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
  formContainer: {
    marginTop: 16,
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
  signupButton: {
    backgroundColor: primaryColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#122017',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  signInLink: {
    color: primaryColor,
    textDecorationLine: 'underline',
  },
});
