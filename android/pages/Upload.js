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
    KeyboardAvoidingView,
    Picker
  } from 'react-native';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
  import ImagePicker from 'react-native-image-picker';

  export default class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        avtarsource:'',
        tmpavtar:null,
      }
    }

  selectimage = () => { ImagePicker.showImagePicker(options , (response) => {
    console.log('respones', response);
      if(response.didCancel){
        window.alert("User cancelled picker");
      }else if(response.error){
        window.alert("Imagepicker Error :", response.error);
      }else if(response.customButton){
        window.alert("user clicked button", response.customButton);
      }else{
        console.log('Image picker respinse 0', response);
        const soruce = {uri:response.uri};
        this.setState({tmpavtar : soruce});
        // this.setState({avtarsource : soruce});
        // console.log("avtar state", this.state.avtarsource.uri);
        this.upload(response);
      }
      // console.log(this.state.avtarsource);
  })
  }

  upload = (image) =>{

    this.setState({avtarsource : image});

  }

  onClickListener = async(viewId) => {
    console.log('viewId',viewId);
    if (viewId === 'add'){
      // const {avtarsource, firstname, lastname, gender, birthdate, age, height, weight, skintone, address, city, status, education, job, experience, fathername, mothername, fatheroccupation, motheroccupation, contactnumber} = this.state;
      const fileToUpload = this.state.avtarsource;
      const data = new FormData();
      data.append('name', 'Image Upload');
      data.append('file_attachment', fileToUpload);
      //Please change file upload URL
      await fetch(`http://192.168.43.39/Api/upload.php`, {
        method: 'post',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      })
        .then((response) => console.log(response));
    }
  }

    
  apiCall = (data, method) => fetch(`http://192.168.43.39/Api/${method}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data; ',
    },
      body: JSON.stringify(data),
    })
    .then((response) => console.log(response));

    render() {
      return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.uploadimage} onPress={this.selectimage}>
          {
            this.state.tmpavtar != null ? 
            <Image source={this.state.tmpavtar} style={{width:150,height:150}}></Image> : 
            <MaterialIcons name="camera-alt" style={{color:'black'}} size={40} /> 
          }
        </TouchableHighlight>

        <View style={styles.buttons}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('add')}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
      )}
  }

  const options={
    title:'Select Image',
    storageOptions:{
      skipBackup: true,
      path:'images',
    },
    quality:1,
    maxWidth: 150, 
    maxHeight: 150,
  }
  const styles = StyleSheet.create({
    uploadimage:{
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      width:150,
      height:150,
      borderRadius:150,
      marginBottom:20,
      marginTop:20,
      overflow:'hidden',
      backgroundColor:'white',
    },
    container: {
      flex:1,
      alignItems:'center',
      backgroundColor: 'rgb(4,64,90)'
    },
    buttons:{
      marginTop:20,
      alignSelf:'center',
    },
    buttonContainer:{
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:200,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: 'rgb(247,91,94)',
    },
  })