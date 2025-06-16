// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   Text,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SignupScreen = ({ navigation }) => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (!firstName || !lastName || !mobile || !email || !password) {
//       Alert.alert('Error', 'All fields are required!');
//       return;
//     }

//     const newUser = { firstName, lastName, mobile, email:email.trim().toLowerCase(), password };
//     await AsyncStorage.setItem('localUser', JSON.stringify(newUser));
//     console.log('User saved:', newUser);
//     Alert.alert('Success', 'Signup successful. Please login.');
//     navigation.navigate('Login');
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View style={styles.container}>
//             <Image
//               source={require('../../assets/logo.png')}
//               style={styles.logo}
//               resizeMode="contain"
//             />
//             <Text style={styles.heading}>🔐 Create Your Account</Text>

//             <TextInput
//               placeholder="First Name"
//               value={firstName}
//               onChangeText={setFirstName}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Last Name"
//               value={lastName}
//               onChangeText={setLastName}
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Mobile"
//               value={mobile}
//               onChangeText={setMobile}
//               style={styles.input}
//               keyboardType="phone-pad"
//             />
//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               keyboardType="email-address"
//               autoCapitalize="none"
//             />
//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//             />

//             <View style={styles.buttonSpacing}>
//               <Button title="Sign Up" onPress={handleSignup} color="#007AFF" />
//             </View>

//             <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
//               Already have an account? <Text style={styles.linkBold}>Login</Text>
//             </Text>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     padding: 24,
//     backgroundColor: '#f2f2f2',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     alignSelf: 'center',
//     marginBottom: 30,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     marginVertical: 8,
//     padding: 12,
//     borderRadius: 10,
//     fontSize: 16,
//   },
//   buttonSpacing: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   link: {
//     marginTop: 10,
//     textAlign: 'center',
//     color: '#555',
//     fontSize: 15,
//   },
//   linkBold: {
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
// });

// export default SignupScreen;
















import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !mobile || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      mobile,
      email: email.trim().toLowerCase(),
      password,
    };
    await AsyncStorage.setItem('localUser', JSON.stringify(newUser));
    Alert.alert('Success', 'Signup successful. Please login.');
    navigation.navigate('Login');
  };

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inner}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.heading}>Create Your Account</Text>
              <Text style={styles.subHeading}>Join us and start shopping smarter!</Text>

              <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
                placeholderTextColor="#777"
              />
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
                placeholderTextColor="#777"
              />
              <TextInput
                placeholder="Mobile"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#777"
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#777"
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#777"
              />

              <TouchableOpacity onPress={handleSignup} style={styles.signupBtn}>
                <Text style={styles.signupText}>Sign Up</Text>
              </TouchableOpacity>

              <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
                Already have an account? <Text style={styles.linkBold}>Login</Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 25,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a11cb',
    marginBottom: 4,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    elevation: 2,
    color: '#000',
  },
  signupBtn: {
    width: '100%',
    backgroundColor: '#6a11cb',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#6a11cb',
  },
});
