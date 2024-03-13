import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favs');
      const parsedExistingFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Agrega el nuevo producto a la lista de favoritos
      const updatedFavorites = [...parsedExistingFavorites, product];

      // Almacena la lista actualizada de favoritos en AsyncStorage
      await AsyncStorage.setItem('favs', JSON.stringify(updatedFavorites));

      setIsFavorited(true);
      Alert.alert('Añadido a favoritos', 'El producto se ha añadido a tus favoritos.');
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
    }
  };

  const getProduct = async () => {
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]); // Cambié [product] a [id]

  useEffect(() => {
    const checkIfFavorited = async () => {
      try {
        const existingFavorites = await AsyncStorage.getItem('favs');
        const parsedExistingFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
        setIsFavorited(parsedExistingFavorites.some((fav) => fav.id === id));
      } catch (error) {
        console.error('Error al comprobar favoritos:', error);
      }
    };

    checkIfFavorited();
  }, [id]);

  return (
    <View style={styles.container}>
      {product ? (
        <View>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Volver a Productos</Text>
          </Pressable>

          <View key={product.id} style={styles.productContainer}>
            <Image
              style={styles.productImage}
              source={{ uri: product.image }}
              alt={`${product.title} image`}
            />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              style={styles.buttonFav}
              onPress={handleAddToFavorites}
              disabled={isFavorited}
            >
              <Text style={styles.buttonText}>
                {isFavorited ? 'Añadido a favoritos' : 'Añadir a favoritos'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Cargando producto...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 30,
  },
  button: {
    backgroundColor: "#2471A3",
    width: 150,
    padding: 10,
    marginVertical: 30,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: "#fff"
  },
  productContainer: {
    width: 350,
    height: 600,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    marginVertical: 20,
    borderColor: '#2471A3',
    borderWidth: 3,
    borderRadius: 10,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: 50,
    color: "#2471A3"
  },
  productImage: {
    width: 150,
    height: 150,
  },
  productTitle: {
    fontSize: 20,
    color: '#503F58',
    fontWeight: '600',
  },
  productDescription: {
    fontSize: 15,
    color: '#503F58',
    fontWeight: '400',
  },
  productCategory: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2471A3',
  },
  productPrice: {
    fontSize: 30,
    color: '#17A589',
    fontWeight: '800',
    marginVertical: 10,
  },
  buttonFav: {
    backgroundColor: "#17A249",
    width: 150,
    padding: 10,
    marginVertical: 30,
    borderRadius: 5,
  }
})

export default ProductScreen