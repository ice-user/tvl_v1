import { useRouter } from 'expo-router';
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

import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig'; // adjust path if needed
// import { auth } from '../../firebase/firebaseconfig'; // adjust path if needed


const primaryColor = '#38e07b';
const backgroundLight = '#f6f8f7';
const backgroundDark = '#122017';

export default function LoginScreen() {
  const router = useRouter();

  const handleForgotPassword = () => {
  if (!email) {
    Alert.alert('Reset Password', 'Please enter your email address first.');
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert(
        'Reset Email Sent',
        'Check your inbox for a password reset link.'
      );
    })
    .catch((error) => {
      console.error('Reset error:', error);
      let message = 'Could not send reset email.';

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No account exists for that email.';
          break;
        case 'auth/invalid-email':
          message = 'That email address is not valid.';
          break;
        default:
          message = error.message;
      }

      Alert.alert('Reset Failed', message);
    });
};

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});

    const tempErrors = {};
    if (!email) tempErrors.email = 'Email is required';
    if (!password) tempErrors.password = 'Password is required';
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)/home'); // Redirect to homepage
    } catch (error) {
      setLoading(false);
      console.log('Login error:', error.code);

      let message = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          message = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email address.';
          break;
        default:
          message = error.message;
      }

      Alert.alert('Login Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to SmartFit Gym</Text>
            <Text style={styles.subtitle}>
              Your AI-powered fitness journey starts here.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            {/* Face ID placeholder */}
            <TouchableOpacity style={styles.faceIdButton}>
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

            <TouchableOpacity
              style={[styles.loginButton, loading && { backgroundColor: '#ccc' }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#122017" />
              ) : (
                <Text style={styles.buttonText}>Log In</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
  <Text style={styles.forgotText}>Forgot Password?</Text>
</TouchableOpacity>


            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={() => router.push('/(tabs)/signUp')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: backgroundLight },
  scrollContent: { flexGrow: 1 },
  content: { paddingHorizontal: 24, paddingVertical: 16 },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 8,
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
  buttonsContainer: { marginTop: 32 },
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
    marginBottom: 4,
    color: '#000',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: primaryColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
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
  errorText: {
    color: '#f66',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 13,
  },
  forgotText: {
  textAlign: 'right',
  color: primaryColor,
  marginBottom: 16,
  textDecorationLine: 'underline',
},

});
