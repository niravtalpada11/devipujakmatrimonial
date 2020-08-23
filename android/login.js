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

export default class login extends Component {

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
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>NK Job Service</Text>
        </View>
        <View style={styles.inputpanal}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({email})}/>
        </View>
        <View style={styles.inputpanal}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}/>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
    
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
              <Text>Forgot your password?</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer , styles.registerButton]} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: 'rgb(4,64,90)',
  },
  header:{
    marginTop:170,
    marginBottom:30,
  },
  title:{
    color:'rgb(247,91,94)',
    fontWeight:'bold',
    fontSize:30,
  },
  inputpanal:{
    width:'70%',
    marginBottom:17,
  },
  inputs:{
    height:45,
    width:'100%',
    backgroundColor:'white',
    borderRadius: 20,
  },
  buttons:{
    marginTop:20,
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
 