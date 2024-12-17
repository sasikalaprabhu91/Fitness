import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // To save locally

const genderOptions = ['Male', 'Female', 'Non-Binary'];
const questions = [
  {
    question: "What is your gender?",
    options: genderOptions,
  },
  {
    question: "Enter your age:",
    options: [],
  },
  {
    question: "Enter your weight (kg):",
    options: [],
  },
  {
    question: "Enter your height (cm):",
    options: [],
  },
  {
    question: "Enter your nickname:",
    options: [],
  },
  {
    question: "What is your fitness goal?",
    options: ["Weight Loss", "Muscle Gain", "Endurance", "Flexibility"],
  },
  {
    question: "How often do you exercise?",
    options: ["Daily", "3-4 times a week", "Once a week", "Rarely"],
  },
  {
    question: "What's your body type?",
    options: ["Hourglass", "Rectangle", "Rounded", "Lightbulb"],
  },
  {
    question: "Any previous workout experience?",
    options: ["Yes, I workout daily", "Yes, less than a year ago", "Yes, more than 1 year ago", "No, I don't have any"],
  },
  {
    question: 'How fit are you?',
    options: [`I'm very fit`, `I'm fit`, `I'm not very fit`],
  },
];

const Schedule = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userEmail } = route.params; // Get the user's email passed from the Login screen

  const [selectedOptions, setSelectedOptions] = useState({}); // Store selected answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [age, setAge] = useState(''); // State for age input
  const [weight, setWeight] = useState(''); // State for weight input
  const [height, setHeight] = useState(''); // State for height input
  const [name, setName] = useState(''); // State for nickname input
  const [bmi, setBmi] = useState(null); // State to store calculated BMI
  const [bmiColor, setBmiColor] = useState('black'); // State for BMI color

  // Function to calculate BMI and set color based on range
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(calculatedBmi);

    // Set BMI color based on BMI range
    let bmiMessage = '';

  // Set BMI message based on BMI range
  if (calculatedBmi < 18.5) {
    setBmiColor('blue'); // Underweight
    bmiMessage = "Oh! Your BMI is too low. Focus on balanced nutrition and steady progress.";
  } else if (calculatedBmi >= 18.5 && calculatedBmi < 24.9) {
    setBmiColor('green'); // Normal weight
    bmiMessage = "Congrats !! You're in a healthy weight range! Keep up the great work!";
  } else if (calculatedBmi >= 25 && calculatedBmi < 29.9) {
    setBmiColor('orange'); // Overweight
    bmiMessage = "Your BMI suggests that you are overweight. A combination of regular physical activity and mindful eating can help.";
  } else if (calculatedBmi >= 30) {
    setBmiColor('red'); // Obese
    bmiMessage = "Your BMI indicates obesity. It’s important to focus on sustainable lifestyle changes, like incorporating regular exercise.";
  }

  };

  // Function to handle option selection
  const handleOptionSelect = async (option) => {
    // Save the selected option
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));

    // Save the gender only on the first question
    if (currentQuestionIndex === 0) {
      await AsyncStorage.setItem('userGender', option);
    }

    // If all questions are answered, calculate BMI and navigate to the next screen
    if (currentQuestionIndex === 3) {
      calculateBMI(); // Calculate BMI after height is entered
    }

    // Move to the next question or finish if it's the last one
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Navigate to the next screen (e.g., Dashboard)
      // Alert.alert('Survey Completed', `Your BMI is ${bmi}`);
      navigation.navigate('Dashboard', { userEmail, selectedOptions, nickname: name, bmi, bmiColor, bmiMessage});
    }
  };

  // Function to render each option or input field
  const renderOptionItem = () => {
    switch (currentQuestionIndex) {
      case 1: // Age input
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            onSubmitEditing={() => handleOptionSelect(age)}
          />
        );
      case 2: // Weight input
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            onSubmitEditing={() => handleOptionSelect(weight)}
          />
        );
      case 3: // Height input
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            onSubmitEditing={() => handleOptionSelect(height)}
          />
        );
      case 4: // Name input
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter your nickname"
            value={name}
            onChangeText={setName}
            onSubmitEditing={() => handleOptionSelect(name)}
          />
        );
      default:
        return (
          <FlatList
            data={questions[currentQuestionIndex].options} // Show options for other questions
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to FitMe!</Text>
      <Text style={{ fontSize: 18 }}>{questions[currentQuestionIndex].question}</Text>

      {/* Render the appropriate input or options */}
      {renderOptionItem()}
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  welcomeText: {
    fontSize: 17,
    fontWeight: '500',
    color: 'plum',
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
  optionButton: {
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:18
  },
  BmiText:{
    fontSize:15,
    textAlign:'center'

  }
});
