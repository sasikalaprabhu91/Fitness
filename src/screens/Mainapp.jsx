import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

const Mainapp = () => {

  const page = useNavigation();
  const workout = [
    { id: 1, image: 'https://media.istockphoto.com/id/841069776/photo/happy-people-in-an-aerobics-class-at-the-gym.jpg?s=612x612&w=0&k=20&c=Msbb_TNBDZWWZfnuaZubcgE7Qa-qimYrl4D3aFQv9PY=', text: 'AEROBICS' },
    { id: 2, image: 'https://thumbs.dreamstime.com/b/fitness-girl-doing-incline-bench-press-dumbbells-young-fitness-woman-doing-chest-workout-dumbbells-incline-bench-325865384.jpg', text: 'STRENGTH TRAINING' },
    { id: 3, image: 'https://media.istockphoto.com/id/963115364/photo/sportswoman-jumping-and-stretching.jpg?s=612x612&w=0&k=20&c=Uzo9eENjr7zF7HokJsvY20pNmFiO7ImTnxYwja83lcU=', text: 'FULLBODY WORKOUTS' },
    { id: 4, image: 'https://thumbs.dreamstime.com/b/asian-young-woman-exercising-gym-doing-leg-raising-twisting-exercises-young-attractive-woman-doing-abs-workout-fitness-185359107.jpg', text: 'BEGINNER ABS WORKOUTS' },
    { id: 5, image: 'https://www.shutterstock.com/image-photo/sporty-woman-exercising-on-multistation-600nw-2180444683.jpg', text: 'BEGINNER ARM WORKOUTS' },
    { id: 6, image: 'https://thumbs.dreamstime.com/b/fitness-girl-doing-incline-bench-press-dumbbells-young-fitness-woman-doing-chest-workout-dumbbells-incline-bench-325865384.jpg', text: 'BEGINNER CHEST WORKOUTS' },
    { id: 7, image: 'https://thumbs.dreamstime.com/b/fitness-woman-doing-lunges-exercises-leg-muscle-workout-training-gym-active-girl-doing-front-forward-one-leg-step-fitness-134492281.jpg', text: 'BEGINNER LEG WORKOUTS' },
  ];

  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock variables
  const colors = {
    primary: 'plum',
    primary300: '#e0b0ff',
    primary200: '#d8a1ff',
  };
  const markedDatesArray = [
    { date: '2023-12-01', dots: [{ color: colors.primary }] },
    { date: '2023-12-05', dots: [{ color: colors.primary }] },
  ];
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onDateSelected = (date) => {
    setSelectedDate(date);
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, 170 * index, 170 * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.5],
      extrapolate: 'clamp',
    });


   

    const handlePress = (id) => {
      if (id === 1) {
        page.navigate('Aerobics'); // Use `.navigate` for navigation
      } else if (id === 2) {
        page.navigate('Strength');
      } else if (id === 3) {
        page.navigate('Fullbody');
      } else if (id === 4) {
        page.navigate('Abs');
      } else if (id === 5) {
        page.navigate('Arm');
      } else if (id === 6) {
        page.navigate('Chest');
      } else if (id === 7) {
        page.navigate('Leg');
      } else {
        console.log('Unhandled item:', id);
      }
    };
    

    return (
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }], opacity }]}>
        <TouchableOpacity  onPress={() => handlePress(item.id)}>
          <View>
            <Image source={{ uri: item.image }} style={styles.image}  />
            {/* Overlay for better text visibility */}
            <View style={styles.overlay} />
            <Text style={styles.itemText}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ flex: 1 ,}}>
       {/* <Text style={styles.headerText}>Home Workouts</Text> */}
      <View style={{backgroundColor:'white',marginTop:20,marginBottom:20,margin:10,borderRadius:10}}>
      <CalendarStrip
        selectedDate={new Date()}
        calendarAnimation={{ type: 'sequence', duration: 0 }}
        scrollable
        showMonth
        calendarHeaderStyle={{
          color: 'plum', // Change the month name color
          fontSize: 18, // Customize font size
          fontFamily: 'MontserratAlternates-Bold',
          
        }}
        useNativeDriver={false}
        onDateSelected={onDateSelected}
        highlightDateNumberStyle={[styles.numberStyle, { color: '#e768df', }]}
        upperCaseDays={false}
        highlightDateNameStyle={[styles.nameStyle, { color: '#e768df',  }]}
        dateNumberStyle={[styles.numberStyle, ]}
        dateNameStyle={[styles.nameStyle,]}
        leftSelector={<View />}
        rightSelector={<View />}
        scrollerPaging={true}
        style={{
          padding: 4,
          height: 100,
        }}
        dayComponentHeight={80}
        maxDayComponentSize={100}
        markedDates={markedDatesArray}
        markedDatesStyle={{ height: 2.5, width: 12, backgroundColor: colors.primary }}
      />

      </View>
      

     

      <View style={styles.main}>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text1}>WORKOUTS</Text>
        </View>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text1}>KCAL</Text>
        </View>
        <View>
          <Text style={styles.text}>0</Text>
          <Text style={styles.text1}>MINUTES</Text>
        </View>
      </View>

      <Animated.FlatList
        data={workout}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

export default Mainapp;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'plum',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    height: 70,
    margin: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  text1: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Bold',
  },
  headerText: {
    textAlign: 'center',
    color: 'plum',
    fontFamily: 'MontserratAlternates-Bold',
    margin: 20,
    fontSize: 18,
  },
  list: {
    marginVertical: 20,
  },
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 330,
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '700',
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    letterSpacing: 3,
    fontFamily: 'MontserratAlternates-Light',
  },
  numberStyle:{
    height:22,
    width:30,
    backgroundColor:'plum',
    fontSize:14,
    color:'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
    fontFamily: 'MontserratAlternates-Bold',
    
  },
  nameStyle:{
    height:22,
    width:30,
    backgroundColor:'#f8c0f3',
    color:'white',
    paddingTop:5,
    fontWeight:600,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 8,
    fontFamily: 'MontserratAlternates-Bold',
  }
});
