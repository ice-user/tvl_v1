import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebaseconfig';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Reset errors
    setErrors({});

    let tempErrors = {};
    if (!fullName) tempErrors.fullName = 'Full name is required';
    if (!email) tempErrors.email = 'Email is required';
    if (!password) tempErrors.password = 'Password is required';
    if (password !== confirmPassword) tempErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCredential.user, { displayName: fullName });

      setLoading(false);
      Alert.alert('Success', 'Account created!');
      router.replace('/');
    } catch (error) {
      setLoading(false);
      console.log('Signup error:', error.code);

      let message = 'Something went wrong. Please try again.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          message = 'Password must be at least 6 characters.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password signup is disabled in Firebase.';
          break;
        default:
          message = error.message;
      }

      Alert.alert('Signup Failed', message);
    }
  };

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
              value={fullName}
              onChangeText={setFullName}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

            <TextInput
              placeholder="Email"
              placeholderTextColor="#666"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              placeholder="Password"
              placeholderTextColor="#666"
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#666"
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TouchableOpacity
              style={[styles.signupButton, loading && { backgroundColor: '#ccc' }]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#122017" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink} onPress={() => router.push('/')}>
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
    paddingHorizontal: 8,
    backgroundColor: 'rgba(37, 239, 118, 0.1)',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    backgroundColor: 'rgba(37, 239, 118, 0.2)',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
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
    marginBottom: 4,
    color: '#000',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: primaryColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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
  errorText: {
    color: '#f66',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
  },
});
