import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Validation schema
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../services/Firebase'; // Ensure correct Firebase import
import { Darktheme } from '../theme/Darktheme';
import { Lighttheme } from '../theme/Lighttheme';

const Signup = () => {
  const signupImage = {
    uri: 'https://t3.ftcdn.net/jpg/03/02/20/10/360_F_302201067_2ytoUoIjmQTAiU1FPXSGQLGsVKeRJebB.jpg',
  };

  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignUp = (values, { resetForm }) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User created:', user);
        resetForm();
        navigation.navigate('Login'); // Navigate to Login page on success
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.coloredBackground}>
        <ImageBackground
          source={signupImage}
          resizeMode="cover"
          style={styles.imageBackground}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Track Progress.</Text>
            <Text style={styles.text}>Be Accountable.</Text>
            <Text style={styles.text}>Stay Motivated.</Text>
            <Text style={styles.joinText}>
              Join the Fit Me community. It's FREE.
            </Text>
          </View>
        </ImageBackground>
      </View>

      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            <Text style={styles.signupText}>Sign Up</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              {/* <Icon name="user" color="gray" size={20} style={styles.icon} /> */}
              <TextInput
                mode="outlined"
                label='Email'
                outlineColor='gray'
                placeholder="Enter your email"
                placeholderTextColor="gray"
                activeOutlineColor='plum'
                style={styles.input}
                theme={{ colors: { text: 'black', placeholder: 'gray' } }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                left={<TextInput.Icon icon='account' color={'plum'}/>}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label='Password'
                outlineColor='gray'
                placeholder="Choose a Password"
                placeholderTextColor="gray"
                activeOutlineColor='plum'
                style={styles.input}
                theme={{
                  colors: {
                    text: 'black',
                    placeholder: 'gray',
                    outlineColor: 'gray',
                    activeOutlineColor: 'plum',
                  },
                }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!passwordVisible}
                left={<TextInput.Icon icon="lock" color="plum" />}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? 'eye' : 'eye-off'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    color="plum"
                  />
                }
              />
            </View>
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                label='Confirm Password'
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                outlineColor='gray'
                activeOutlineColor='plum'
                style={styles.input}
                theme={{
                  colors: {
                    text: 'black',
                    placeholder: 'gray',
                    outlineColor: 'gray',
                    // activeOutlineColor: 'plum',
                  },
                }}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                left={<TextInput.Icon icon="lock" color="plum" />}
                right={
                  <TextInput.Icon
                    icon={confirmPasswordVisible ? 'eye' : 'eye-off'}
                    onPress={() =>
                      setConfirmPasswordVisible(!confirmPasswordVisible)
                    }
                    color="plum"
                  />
                }
              />
            </View>
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            {/* Complete Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Complete Sign Up</Text>
            </TouchableOpacity>

            {/* Login Prompt */}
            <View style={styles.loginPrompt}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
                Login here
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'LavenderBlush',
  },
  coloredBackground: {
    height: 250,
    width: '100%',
    backgroundColor: 'plum',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 60,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    height: 220,
    width: '100%',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    overflow: 'hidden',
    margin: 20,
  },
  textContainer: {
    paddingLeft: 33,
    paddingTop: 60,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    marginVertical: 5,
    letterSpacing: 4,
    lineHeight: 24,
    fontFamily: 'MontserratAlternates-Bold',
  },
  joinText: {
    color: 'white',
    marginTop: 20,
    letterSpacing: 1,
    fontWeight: '600',
    marginLeft: -13,
    fontFamily: 'MontserratAlternates-Light',
  },
  formContainer: {
    padding: 5,
    paddingLeft: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '95%',
  },
  input: {
    // flex: 1,
    // paddingVertical: 5,
    color: 'black',
    width:'100%'
  },
  signupText: {
    color: Darktheme ? 'plum' : Lighttheme.primary,
    paddingTop: 30,
    paddingLeft: 0,
    paddingBottom:5,
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Bold',
  },
  button: {
    height: 40,
    width: '80%',
    backgroundColor: 'plum',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 5,
  },
  loginPrompt: {
    flexDirection: 'row',
    marginTop: 30,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Light',
    color: 'plum',
  },
  loginLink: {
    fontFamily: 'MontserratAlternates-Light',
    fontSize: 16,
    color: 'plum',
    fontWeight: 'bold',
  },
});
