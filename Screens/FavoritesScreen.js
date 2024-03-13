import React, { useEffect, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const getFavs = async () => {
      try {
        const storedFavs = await AsyncStorage.getItem('favs');
        if (storedFavs) {
          const favsData = JSON.parse(storedFavs);
          setFavs(favsData);
        }

        if (favs.length > 0) {
          const favsData = [];

          for (let i = 0; i < favs.length; i++) {
            const id = favs[i];
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            favsData.push(data);
          }

          setFavs(favsData);
          await AsyncStorage.setItem('favs', JSON.stringify(favsData));
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    getFavs();
  }, [AsyncStorage]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Favoritos</Text>

      {favs.length ? (
        favs.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image
              style={styles.productImage}
              source={{ uri: product.image }}
              alt={`${product.title} image`}
            />
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Product', {
                  id: product.id,
                });
              }}
            >
              <Text style={styles.buttonText}>Ver Producto</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Aún no tienes favoritos...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    paddingVertical: 50,
    color: '#2471A3',
  },
  productContainer: {
    width: 300,
    height: 450,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    marginVertical: 20,
    borderColor: '#2471A3',
    borderWidth: 3,
    borderRadius: 10,
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
  button: {
    backgroundColor: '#2471A3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default FavoritesScreen;
