// Login.js
import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import auth from '../services/Firebase';
import { Darktheme } from '../theme/Darktheme';
import { Lighttheme } from '../theme/Lighttheme';

const Login = () => {
  const loginimage = {
    uri: 'https://c4.wallpaperflare.com/wallpaper/169/486/515/working-out-fitness-model-sport-wallpaper-preview.jpg',
  };

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [resetEmail, setResetEmail] = useState(''); // Email for password reset
  const [resetLoading, setResetLoading] = useState(false); // Loading state for password reset

  const theme = Darktheme ? Darktheme : Lighttheme;

  const next = () => {
    navigation.navigate('Signup');
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true); // Start loading state
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user.email);
        Alert.alert('Success', `Welcome back, ${user.email}`);
        setEmail('');
        setPassword('');
        navigation.navigate('Schedule', { userEmail: user.email });
      })
      .catch((error) => {
        setLoading(false); // Stop loading state
        const errorMessage =
          error.code === 'auth/user-not-found'
            ? 'User not found.'
            : error.code === 'auth/wrong-password'
            ? 'Incorrect password.'
            : 'Login failed. Please try again.';
        console.error('Login failed:', errorMessage);
        Alert.alert('Login Failed', errorMessage);
      });
  };

  const handlePasswordReset = () => {
    if (!resetEmail) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!isValidEmail(resetEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setResetLoading(true); // Start loading state
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        Alert.alert('Success', 'Password reset email sent! Check your inbox.');
        setIsModalVisible(false); // Close modal
        setResetEmail(''); // Clear email input
      })
      .catch((error) => {
        const errorMessage =
          error.code === 'auth/user-not-found'
            ? 'User not found.'
            : 'Failed to send reset email. Please try again.';
        console.error('Reset email failed:', errorMessage);
        Alert.alert('Error', errorMessage);
      })
      .finally(() => {
        setResetLoading(false); // Stop loading state
      });
  };
  
  

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ImageBackground source={loginimage} resizeMode="cover" style={styles.imageBackground}>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>Welcome Back!</Text>
            <Text style={styles.text}>Login to continue</Text>
            <Text style={styles.text}>your fitness journey and</Text>
            <Text style={styles.text}>reach your goals.</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Login Form */}
      <View style={styles.loginForm}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.inputContainer}>
          {/* Email Input */}
          <TextInput
            mode="outlined"
            label="Email"
            outlineColor="gray"
            textColor="gray"
            placeholder="Enter your email"
            placeholderTextColor={'gray'}
             theme={{
              colors: {
                placeholder: 'gray',
                primary: 'plum', // Active label and underline color
              
              },
            }}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon icon="email" color="plum" />}
          />

          {/* Password Input */}
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            outlineColor="gray"
            textColor="gray"
            placeholderTextColor={'gray'}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            theme={{
              colors: {
                placeholder: 'gray',
                primary: 'plum', // Active label and underline color
              
              },
            }}
            left={<TextInput.Icon icon="lock" color="plum" />}
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye' : 'eye-off'}
                color="plum"
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center' }}>
          <Text style={[styles.linkText, { color: 'gray' }]}>Don't have an account?</Text>
          <Text style={styles.signupText} onPress={next}>
            Signup
          </Text>
        </View>

        <Text
          style={styles.forgotPasswordText}
          onPress={() => setIsModalVisible(true)}
        >
          Forgot password?
        </Text>
      </View>

      {/* Password Reset Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              placeholderTextColor="gray"
              value={resetEmail}
              onChangeText={setResetEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              mode="outlined"
            />
            <TouchableOpacity style={styles.modalButton} onPress={handlePasswordReset}>
              {resetLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Send Reset Email</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'LavenderBlush',
  },
  headerContainer: {
    height: 250,
    width: '100%',
    backgroundColor: 'plum',
    borderBottomLeftRadius: 20,
   borderBottomRightRadius: 60,
    borderTopLeftRadius:20,
    overflow: 'hidden',
  },
  imageBackground: {
    height: 220,
    width: '100%',
     borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    overflow: 'hidden',
    margin:20,
    paddingRight:10
  },
  textWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 60,
    paddingRight: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'MontserratAlternates-Bold',
    letterSpacing: 4,
    lineHeight: 24,
    fontSize: 15,
  },
  loginForm: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Bold',
    color: 'plum',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    height: 40,
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  linkText: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'MontserratAlternates-Light',
  },
  signupText: {
    color: 'plum',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'MontserratAlternates-Light',
  },
  forgotPasswordText: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-Light',
    textDecorationLine: 'underline',
    color: 'plum',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'plum',
  },
  modalInput: {
    marginBottom: 10,
  },
  modalButton: {
    height: 40,
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
