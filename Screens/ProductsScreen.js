import React, { useState, useEffect } from 'react'
import { Text, ScrollView, StyleSheet, View, Image, TouchableOpacity } from 'react-native'

const ProductsScreen = ({navigation}) => {
  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [products]);
  
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Productos</Text>
      
      {products ? (
        products.map((product) => (
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
                })
              }}
            >
              <Text style={styles.buttonText}>Ver Producto</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text>Cargando productos...</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    alignItems: 'center',
  },
  productContainer: {
    width: 300,
    height: 450,
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
  button: {
    backgroundColor: '#2471A3',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  }
})

export default ProductsScreen