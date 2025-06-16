// import React, { useContext, useState } from 'react';
// import { View, Text, FlatList, Button, StyleSheet, RefreshControl } from 'react-native';
// import { CartContext } from '../../context/CartContext';

// const CartScreen = () => {
//   const { cart, dispatch } = useContext(CartContext);
//   const [message, setMessage] = useState('');
//   const [refreshing, setRefreshing] = useState(false);

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(''), 2000);
//   };

//   const handleRemove = (id) => {
//     dispatch({ type: 'REMOVE_FROM_CART', payload: id });
//     showMessage('Removed from cart');
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     setTimeout(() => setRefreshing(false), 1000); // Simulated refresh
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {message !== '' && (
//         <View style={styles.toast}>
//           <Text style={styles.toastText}>{message}</Text>
//         </View>
//       )}

//       {cart.length === 0 ? (
//         <Text style={{ padding: 20 }}>Your cart is empty</Text>
//       ) : (
//         <>
//           <FlatList
//             data={cart}
//             keyExtractor={(item) => item.id.toString()}
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
//             contentContainerStyle={{ padding: 10 }}
//             renderItem={({ item }) => (
//               <View style={styles.card}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.price}>${item.price} x {item.quantity}</Text>
//                 <Button title="Remove" onPress={() => handleRemove(item.id)} />
//               </View>
//             )}
//           />
//           <Text style={styles.total}>Total: ${getTotalPrice()}</Text>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   toast: {
//     position: 'absolute',
//     top: 10,
//     left: '10%',
//     right: '10%',
//     backgroundColor: '#dc3545',
//     padding: 12,
//     borderRadius: 10,
//     zIndex: 999,
//     alignItems: 'center',
//     elevation: 6,
//   },
//   toastText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   card: {
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 4,
//   },
//   price: {
//     color: '#009688',
//     marginBottom: 8,
//   },
//   total: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 16,
//     textAlign: 'right',
//     backgroundColor: '#f1f1f1',
//   },
// });

// export default CartScreen;















import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CartContext } from '../../context/CartContext';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CartScreen = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    showMessage('Removed from cart');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>${item.price} x {item.quantity}</Text>
        <TouchableOpacity
          style={styles.removeBtn}
          onPress={() => handleRemove(item.id)}
        >
          <AntDesign name="delete" size={16} color="#fff" />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#e0c3fc', '#8ec5fc']} style={styles.container}>
      {message !== '' && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{message}</Text>
        </View>
      )}

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
            contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.totalBar}>
            <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
          </View>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toast: {
    position: 'absolute',
    top: 10,
    left: '10%',
    right: '10%',
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
    zIndex: 999,
    alignItems: 'center',
    elevation: 6,
  },
  toastText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    backgroundColor: '#f2f2f2',
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    color: '#009688',
    marginTop: 4,
    fontSize: 14,
  },
  removeBtn: {
    marginTop: 6,
    backgroundColor: '#f44336',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    borderRadius: 20,
  },
  removeText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
  },
  totalBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffffcc',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#444',
    marginTop: 10,
  },
});

export default CartScreen;
