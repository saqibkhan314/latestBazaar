// import React, { useState, useContext } from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   Text,
//   StyleSheet,
//   Alert,
//   Image,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../../context/AuthContext';

// const LoginScreen = ({ navigation }) => {
//   const { login } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const savedUser = await AsyncStorage.getItem('localUser');

//       if (savedUser) {
//         const parsed = JSON.parse(savedUser);

//         if (parsed.email === email.trim().toLowerCase() && parsed.password === password) {
//           await AsyncStorage.setItem('access_token', 'local_dummy_token');
//           login('local_dummy_token', 'local_dummy_refresh_token');
//           return;
//         } else {
//           Alert.alert('Login Failed', 'Incorrect email or password.');
//           return;
//         }
//       }

//       Alert.alert('Login Failed', 'No user found. Please sign up first.');
//     } catch (err) {
//       Alert.alert('Error', 'Something went wrong. Try again.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
//     >
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
//             <Text style={styles.heading}>Hi there 👋, welcome back!</Text>

//             <TextInput
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               style={styles.input}
//               autoCapitalize="none"
//               keyboardType="email-address"
//             />
//             <TextInput
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//             />

//             <View style={styles.buttonSpacing}>
//               <Button title="Login" onPress={handleLogin} color="#007AFF" />
//             </View>

//             <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
//               Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
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
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#333',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     marginVertical: 10,
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

// export default LoginScreen;


















import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-web';

const { width } = Dimensions.get('window');

export const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('localUser');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);

        if (parsed.email === email.trim().toLowerCase() && parsed.password === password) {
          await AsyncStorage.setItem('access_token', 'local_dummy_token');
          login('local_dummy_token', 'local_dummy_refresh_token');
          return;
        } else {
          Alert.alert('Login Failed', 'Incorrect email or password.');
          return;
        }
      }

      Alert.alert('Login Failed', 'No user found. Please sign up first.');
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.inner}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.subHeading}>Login to continue</Text>

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
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

              <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>

              <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
                Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
    </SafeAreaView>
    
  );
};

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeading: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
    color: '#000',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#6a11cb',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    fontSize: 15,
    color: '#333',
  },
  linkBold: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
