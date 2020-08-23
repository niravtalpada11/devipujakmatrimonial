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
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Logo from './Images/company_logo.png';

export default class registerview extends Component {

  constructor(props) {
    super(props);
    state = {
      email   : '',
      password: '',
    }
  }
  
  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.logoview}>
              <Image source={Logo} style={{height:'100%',width:'100%'}} />
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => navigation.navigate('AddData')}>
              <Text style={styles.loginText}>Add Data</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainer , styles.registerButton]} onPress={() => navigation.navigate('ViewData')}>
              <Text>View Data</Text>
            </TouchableHighlight>

            <TouchableHighlight style={[styles.buttonContainer , styles.registerButton]} onPress={() => navigation.navigate('Checker')}>
              <Text>Image Upload Checker</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'rgb(4,64,90)',
    justifyContent:'center',
  },
  body:{
    alignItems:'center',
  },
  logoview:{
    justifyContent:'center',
    alignSelf:'center',
    width:150,
    height:150,
    borderRadius:150,
    overflow:'hidden'
  },
  header:{
    // marginTop:170,
    marginBottom:30,
  },
  title:{
    color:'rgb(247,91,94)',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center',
  },
  buttons:{
    // marginTop:20,
  },
  buttonContainer:{
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: 'rgb(247,91,94)',
  },
  registerButton:{
    backgroundColor: 'white',
  },
  loginText: {
    color: 'white',
  }
});
 