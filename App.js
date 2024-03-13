import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductsScreen from './Screens/ProductsScreen';
import ProductScreen from './Screens/ProductScreen';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import FavoritesScreen from './Screens/FavoritesScreen';

function HomeScreen({navigation}) {
  return (
      <View style={styles.container}>
        <Text style={styles.title}>Fake Store</Text>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('ProductsMain')} 
          style={styles.button}>
          <Text style={styles.buttonText}>Ver productos</Text>
        </TouchableOpacity>
      </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Product"
      component={ProductScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ProductsMain"
          component={ProductsStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="bag" color={color} size={size} />
            ),
            headerShown: false,
            tabBarLabel: "Productos",
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Fontisto name="favorite" color={color} size={size} />
            ),
            headerShown: false,
            tabBarLabel: "Favoritos",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 50,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#17A589",
    padding: 15,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  }
});
