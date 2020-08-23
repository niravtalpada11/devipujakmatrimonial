import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import Register from './android/registerview';
import AddData from './android/pages/AddData';
import ViewData from './android/pages/ViewData';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { color } from 'react-native-reanimated';
import Checker from './android/pages/Upload';

export default function App(){
    const Stack = createStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: 'Welcome', headerShown: false }}
          />
            <Stack.Screen
            name="ViewData"
            component={ViewData}
            options={{ title: 'View Data' }}
          />
           <Stack.Screen
            name="AddData"
            component={AddData}
            options={{ title: 'Add Personal Data' , headerTitleStyle:{color:'rgb(247,91,94)'}}}
          />

          <Stack.Screen
            name="Checker"
            component={Checker}
            options={{ title: 'Add Personal Data' , headerTitleStyle:{color:'rgb(247,91,94)'}}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

// const Drawer = createDrawerNavigator();
//     function Drawer1() {
//       return (
//           <Drawer.Navigator>
//             <Drawer.Screen name="ViewData" component={ViewData} />
//             <Drawer.Screen name="AddData" component={AddData} />
//           </Drawer.Navigator>
//       );
//     }
