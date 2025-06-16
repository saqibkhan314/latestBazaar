// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   Image,
//   StyleSheet,
//   Switch,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ThemeContext } from '../../context/ThemeContext';
// import { AuthContext } from '../../context/AuthContext';
// import { AntDesign } from '@expo/vector-icons';

// const ProfileScreen = () => {
//   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
//   const { logout } = useContext(AuthContext);

//   const [imageUri, setImageUri] = useState(null);
//   const [fields, setFields] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     password: '',
//   });
//   const [editableFields, setEditableFields] = useState({
//     name: false,
//     email: false,
//     mobile: false,
//     password: false,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedImage = await AsyncStorage.getItem('profile_image');
//         if (savedImage) setImageUri(savedImage);

//         const userData = await AsyncStorage.getItem('localUser');
//         if (userData) {
//           const parsed = JSON.parse(userData);
//           const fullName = `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim();
//           setFields({
//             name: fullName,
//             email: parsed.email || '',
//             mobile: parsed.mobile || '',
//             password: parsed.password || '',
//           });
//         }
//       } catch (error) {
//         console.error('Error loading profile data:', error);
//       }
//     };
//     loadData();
//   }, []);

//   const saveFieldChanges = async () => {
//     const [firstName, ...rest] = fields.name.trim().split(' ');
//     const lastName = rest.join(' ');
//     const updatedUser = {
//       firstName: firstName || '',
//       lastName: lastName || '',
//       email: fields.email,
//       mobile: fields.mobile,
//       password: fields.password,
//     };
//     await AsyncStorage.setItem('localUser', JSON.stringify(updatedUser));
//     Alert.alert('Updated', 'Profile information updated.');
//   };

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       alert('Permission required!');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets[0]?.uri) {
//       const uri = result.assets[0].uri;
//       setImageUri(uri);
//       await AsyncStorage.setItem('profile_image', uri);
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert('Logged out', 'You have been successfully logged out.', [
//       { text: 'OK', onPress: () => logout() },
//     ]);
//   };

//   const toggleEdit = (field) => {
//     setEditableFields((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   const handleChange = (field, value) => {
//     setFields((prev) => ({ ...prev, [field]: value }));
//   };

//   const themeColors = {
//     bg: isDarkMode ? '#121212' : '#f9f9f9',
//     text: isDarkMode ? '#fff' : '#222',
//     border: isDarkMode ? '#555' : '#ccc',
//     placeholder: isDarkMode ? '#aaa' : '#888',
//     inputBg: isDarkMode ? '#1f1f1f' : '#fff',
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
//       <TouchableOpacity onPress={pickImage}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.image} />
//         ) : (
//           <View style={styles.imagePlaceholder}>
//             <Text style={{ color: '#888' }}>Pick Image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       {['name', 'email', 'mobile', 'password'].map((field) => (
//         <View key={field} style={[styles.inputRow, { borderColor: themeColors.border }]}>
//           <TextInput
//             value={fields[field]}
//             editable={editableFields[field]}
//             secureTextEntry={field === 'password'}
//             onChangeText={(text) => handleChange(field, text)}
//             style={[
//               styles.input,
//               {
//                 color: themeColors.text,
//                 backgroundColor: themeColors.inputBg,
//               },
//             ]}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             placeholderTextColor={themeColors.placeholder}
//           />
//           <TouchableOpacity onPress={() => toggleEdit(field)} style={styles.editIcon}>
//             <AntDesign name="edit" size={20} color="#007AFF" />
//           </TouchableOpacity>
//         </View>
//       ))}

//       <TouchableOpacity style={styles.saveBtn} onPress={saveFieldChanges}>
//         <Text style={styles.saveBtnText}>Save Changes</Text>
//       </TouchableOpacity>

//       <View style={styles.row}>
//         <Text style={[styles.label, { color: themeColors.text }]}>Dark Mode</Text>
//         <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
//       </View>

//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 25,
//   },
//   image: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     marginBottom: 25,
//   },
//   imagePlaceholder: {
//     height: 120,
//     width: 120,
//     borderRadius: 60,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 25,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginVertical: 8,
//     width: '100%',
//     height: 50,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 6,
//   },
//   editIcon: {
//     marginLeft: 10,
//   },
//   saveBtn: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   saveBtnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 25,
//     justifyContent: 'space-between',
//     width: '60%',
//   },
//   label: {
//     fontSize: 16,
//   },
//   logoutBtn: {
//     backgroundColor: '#e63946',
//     paddingVertical: 10,
//     paddingHorizontal: 35,
//     borderRadius: 10,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
// });

// export default ProfileScreen;




















// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Image,
//   StyleSheet,
//   Switch,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { ThemeContext } from '../../context/ThemeContext';
// import { AuthContext } from '../../context/AuthContext';
// import { AntDesign } from '@expo/vector-icons';

// const ProfileScreen = () => {
//   const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
//   const { logout } = useContext(AuthContext);

//   const [imageUri, setImageUri] = useState(null);
//   const [fields, setFields] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     password: '',
//   });
//   const [editableFields, setEditableFields] = useState({
//     name: false,
//     email: false,
//     mobile: false,
//     password: false,
//   });

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const savedImage = await AsyncStorage.getItem('profile_image');
//         if (savedImage) setImageUri(savedImage);

//         const userData = await AsyncStorage.getItem('localUser');
//         if (userData) {
//           const parsed = JSON.parse(userData);
//           const fullName = `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim();
//           setFields({
//             name: fullName,
//             email: parsed.email || '',
//             mobile: parsed.mobile || '',
//             password: parsed.password || '',
//           });
//         }
//       } catch (error) {
//         console.error('Error loading profile data:', error);
//       }
//     };
//     loadData();
//   }, []);

//   const saveFieldChanges = async () => {
//     const [firstName, ...rest] = fields.name.trim().split(' ');
//     const lastName = rest.join(' ');
//     const updatedUser = {
//       firstName: firstName || '',
//       lastName: lastName || '',
//       email: fields.email,
//       mobile: fields.mobile,
//       password: fields.password,
//     };
//     await AsyncStorage.setItem('localUser', JSON.stringify(updatedUser));
//     Alert.alert('Updated', 'Profile information updated.');
//   };

//   const pickImage = async () => {
//     const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!permission.granted) {
//       alert('Permission required!');
//       return;
//     }
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets[0]?.uri) {
//       const uri = result.assets[0].uri;
//       setImageUri(uri);
//       await AsyncStorage.setItem('profile_image', uri);
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', onPress: () => logout(), style: 'destructive' },
//     ]);
//   };

//   const toggleEdit = (field) => {
//     setEditableFields((prev) => ({
//       ...prev,
//       [field]: !prev[field],
//     }));
//   };

//   const handleChange = (field, value) => {
//     setFields((prev) => ({ ...prev, [field]: value }));
//   };

//   const themeColors = {
//     bg: isDarkMode ? '#0d0d0d' : '#f2f2f2',
//     card: isDarkMode ? '#1e1e1e' : '#fff',
//     text: isDarkMode ? '#fff' : '#222',
//     border: isDarkMode ? '#444' : '#ccc',
//     placeholder: isDarkMode ? '#999' : '#888',
//   };

//   return (
//     <ScrollView style={{ backgroundColor: themeColors.bg }} contentContainerStyle={styles.scroll}>
//       <TouchableOpacity onPress={pickImage}>
//         {imageUri ? (
//           <Image source={{ uri: imageUri }} style={styles.image} />
//         ) : (
//           <View style={styles.imagePlaceholder}>
//             <Text style={{ color: '#999' }}>Tap to pick image</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       <View style={[styles.card, { backgroundColor: themeColors.card }]}>
//         {['name', 'email', 'mobile', 'password'].map((field) => (
//           <View key={field} style={[styles.inputRow, { borderColor: themeColors.border }]}>
//             <TextInput
//               value={fields[field]}
//               editable={editableFields[field]}
//               secureTextEntry={field === 'password'}
//               onChangeText={(text) => handleChange(field, text)}
//               style={[styles.input, { color: themeColors.text }]}
//               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//               placeholderTextColor={themeColors.placeholder}
//             />
//             <TouchableOpacity onPress={() => toggleEdit(field)} style={styles.editIcon}>
//               <AntDesign name="edit" size={18} color="#007AFF" />
//             </TouchableOpacity>
//           </View>
//         ))}

//         <TouchableOpacity style={styles.saveBtn} onPress={saveFieldChanges}>
//           <Text style={styles.saveBtnText}>Save</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.row}>
//         <Text style={[styles.label, { color: themeColors.text }]}>Dark Mode</Text>
//         <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
//       </View>

//       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scroll: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   image: {
//     height: 130,
//     width: 130,
//     borderRadius: 65,
//     marginBottom: 20,
//     borderWidth: 2,
//     borderColor: '#007AFF',
//   },
//   imagePlaceholder: {
//     height: 130,
//     width: 130,
//     borderRadius: 65,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   card: {
//     width: '100%',
//     borderRadius: 15,
//     padding: 20,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     marginBottom: 20,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     paddingVertical: 10,
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//   },
//   editIcon: {
//     marginLeft: 10,
//   },
//   saveBtn: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveBtnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '60%',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//   },
//   logoutBtn: {
//     backgroundColor: '#e63946',
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//   },
//   logoutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default ProfileScreen;






















import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  const [imageUri, setImageUri] = useState(null);
  const [fields, setFields] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profile_image');
        if (savedImage) setImageUri(savedImage);

        const userData = await AsyncStorage.getItem('localUser');
        if (userData) {
          const parsed = JSON.parse(userData);
          const fullName = `${parsed.firstName || ''} ${parsed.lastName || ''}`.trim();
          setFields({
            name: fullName,
            email: parsed.email || '',
            mobile: parsed.mobile || '',
            password: parsed.password || '',
          });
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    };
    loadData();
  }, []);

  const saveFieldChanges = async () => {
    const [firstName, ...rest] = fields.name.trim().split(' ');
    const lastName = rest.join(' ');
    const updatedUser = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: fields.email,
      mobile: fields.mobile,
      password: fields.password,
    };
    await AsyncStorage.setItem('localUser', JSON.stringify(updatedUser));
    Alert.alert('Updated', 'Profile information updated.');
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profile_image', uri);
    }
  };

  const handleLogout = () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout(), style: 'destructive' },
    ]);
  };

  const toggleEdit = (field) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (field, value) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <Feather name="camera" size={22} color="#fff" style={styles.cameraIcon} />
            </View>
          ) : (
            <View style={styles.imagePlaceholder}>
              <Feather name="camera" size={24} color="#fff" />
              <Text style={{ color: '#fff', marginTop: 5 }}>Tap to pick</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.card}>
          {['name', 'email', 'mobile', 'password'].map((field) => (
            <View key={field} style={styles.inputRow}>
              <TextInput
                value={fields[field]}
                editable={editableFields[field]}
                secureTextEntry={field === 'password'}
                onChangeText={(text) => handleChange(field, text)}
                style={styles.input}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                placeholderTextColor="#ccc"
              />
              <TouchableOpacity onPress={() => toggleEdit(field)}>
                <AntDesign name="edit" size={18} color="#ff9900" />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.saveBtn} onPress={saveFieldChanges}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.toggleRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View> */}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#0007',
    padding: 5,
    borderRadius: 20,
  },
  imagePlaceholder: {
    height: 130,
    width: 130,
    borderRadius: 65,
    backgroundColor: '#9995',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#ffffffcc',
    width: '100%',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: '#e63946',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
