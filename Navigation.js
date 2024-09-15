import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

//screens
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Pokemones' component={Home} />
      <HomeStack.Screen name='Información Pokemon' component={Profile} />
    </HomeStack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeStackScreen />
    </NavigationContainer>
  );
}
