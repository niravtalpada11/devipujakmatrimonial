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
// import { Picker } from '@react-native-community/picker';
// import ImagePicker from "react-native-customized-image-picker";
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'

export default class AddData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avtarsource:'',
      tmpavtar:null,
      firstname: 'Nirav',
      lastname: 'abc',
      gender:'Male',
      birthdate:'11-02-1996',
      age:'24',
      height:'24',
      weight:'24',
      skintone:'White',
      address:'abc',
      city:'abc',
      status:'Merried',
      education:'MBA',
      job:'White',
      experience:'2 Year',
      fathername:'abc',
      mothername:'abc',
      fatheroccupation:'abc',
      motheroccupation:'abc',
      contactnumber:'1234',
    }
  }

  validate = () => {
    const {avtarsource,firstname, lastname, gender, birthdate, age, height, weight, skintone, address, city, status, education, job, experience, fathername, mothername, fatheroccupation, motheroccupation, contactnumber} = this.state;
    const valid = true;
    if (firstname === ''){
      Alert.alert("Missing Data","FullName cannot be blank");
      valid = false;
    }else if(lastname === ''){
      Alert.alert("Missing Data","LastName cannot be blank");
    }else if(gender === ''){
      Alert.alert("Missing Data","Select Gender")
    }
    return valid;
  };

  selectimage = () => { ImagePicker.showImagePicker(options , (response) => {
    console.log('respones', response);
      if(response.didCancel){
        window.alert("User cancelled picker");
      }else if(response.error){
        window.alert("Imagepicker Error :", response.error);
      }else if(response.customButton){
        window.alert("user clicked button", response.customButton);
      }else{
        const soruce = {uri:response.uri};
        this.setState({tmpavtar : soruce});
        this.upload(soruce);
      }
      // console.log(this.state.avtarsource);
  })
  }

  upload = (image) =>{
    // const imagefile = image;
    console.log("Upload Function File",image);
    const formData = new FormData();

    const uriPart = image.uri.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    formData.append('photo', {
      uri: image,
      name: `photo.${fileExtension}`,
      type: `image/${fileExtension}`
    });

    console.log("image file filter data :", formData);

    this.setState({avtarsource : formData});
    // console.log("State in Store",this.state.avtarsource);
  }

  
  onClickListener = async(viewId) => {
    console.log('viewId',viewId);
    if (viewId === 'add'){
      const {avtarsource, firstname, lastname, gender, birthdate, age, height, weight, skintone, address, city, status, education, job, experience, fathername, mothername, fatheroccupation, motheroccupation, contactnumber} = this.state;      
      const valid = this.validate();
      console.log('valid',valid);

      if (valid) {
        const resp = await this.apiCall({avtarsource, firstname, lastname, gender, birthdate, age, height, weight, skintone, address, city, status, education, job, experience, fathername, mothername, fatheroccupation, motheroccupation, contactnumber}, 'add.php');
        alert(resp.message);
      }
    }
  }

  apiCall = (data, method) => fetch(`http://192.168.43.39/Api/${method}`, {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
    })
        .then((response) => console.log(response)).catch((e) => {
          console.log(e);
        });

  render() {
    const {avtarsource, firstname, lastname, gender, birthdate, age, height, weight, skintone, address, city, status, education, job, experience, fathername, mothername, fatheroccupation, motheroccupation, contactnumber} = this.state;
    return (
      <View style={styles.container}>
      <ScrollView style={styles.Scrollview}>
        <TouchableHighlight style={styles.uploadimage} onPress={this.selectimage}>
          {
            this.state.tmpavtar != null ? 
            <Image source={this.state.tmpavtar} style={{width:150,height:150}}></Image> : 
            <MaterialIcons name="camera-alt" style={{color:'black'}} size={40} /> 
          }
        </TouchableHighlight>
        <View style={styles.form}>
          <View style={styles.card}>
            <Text style={styles.cardtitle}>Personal Details</Text>
            <View style={styles.cardinner}>
              <View style={styles.inputpanal}>
                <TextInput style={styles.inputs}
                    placeholder="First Name"
                    value={firstname}
                    onChangeText={(firstname) => this.setState({firstname})}/>
              </View>
              <View style={styles.inputpanal}>
                <TextInput style={styles.inputs}
                    placeholder="Last Name"
                    value={lastname}
                    onChangeText={(lastname) => this.setState({lastname})}/>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.gender}
                    style={{ height: 45, width: '100%'}}
                    selectedValue={gender}
                    itemStyle={{backgroundColor:"blue",color:"white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({gender : itemValue})}
                    >
                      <Picker.Item label="Gender" value="Gender"/>
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <DatePicker
                  style={{width: '100%'}}
                  date={this.state.birthdate}
                  mode="date"
                  placeholder="Select Birthdate"
                  format="DD-MM-YYYY"
                  // minDate="2016-05-01"
                  // maxDate="2016-06-01"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      // position: 'absolute',
                      // left: 0,
                      // top: 4,
                      // marginLeft: 0,
                      display:'none'
                    },
                    dateInput: {
                      // marginLeft: 36,
                      height:45,
                      width:'100%',
                      backgroundColor:'white',
                      borderRadius: 20,
                      textAlign:"center"
                    }
                  }}
                  onDateChange={(date) => {this.setState({birthdate: date})}}
                />
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                      selectedValue={this.state.age}
                      style={{ height: 45, width: '100%'}}
                      itemStyle={{backgroundColor:"blue",color:"white"}}
                      onValueChange={(itemValue, itemIndex) => this.setState({age : itemValue})}
                      >
                        <Picker.Item label="Age" value="Age"/>
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                        <Picker.Item label="24" value="24" />
                        <Picker.Item label="25" value="25" />
                        <Picker.Item label="26" value="26" />
                        <Picker.Item label="27" value="27" />
                    </Picker>
                  </View>
              </View>
              <View style={styles.height_width}>
                <View style={[styles.h_w_layer,{marginRight:10}]}>
                  <View style={styles.dropdownlist}>
                    <Picker
                      selectedValue={this.state.height}
                      style={{ height: 45, width: '100%'}}
                      itemStyle={{backgroundColor:"blue",color:"white"}}
                      onValueChange={(itemValue, itemIndex) => this.setState({height : itemValue})}
                      >
                        <Picker.Item label="Height" value="Height"/>
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                        <Picker.Item label="24" value="24" />
                        <Picker.Item label="25" value="25" />
                        <Picker.Item label="26" value="26" />
                        <Picker.Item label="27" value="27" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.h_w_layer}>
                  <View style={styles.dropdownlist}>
                    <Picker
                      selectedValue={this.state.weight}
                      style={{ height: 45, width: '100%'}}
                      itemStyle={{backgroundColor:"white",color:"white"}}
                      onValueChange={(itemValue, itemIndex) => this.setState({weight : itemValue})}
                      >
                        <Picker.Item label="Weight" value="Weight"/>
                        <Picker.Item label="20" value="20" />
                        <Picker.Item label="21" value="21" />
                        <Picker.Item label="22" value="22" />
                        <Picker.Item label="23" value="23" />
                        <Picker.Item label="24" value="24" />
                        <Picker.Item label="25" value="25" />
                        <Picker.Item label="26" value="26" />
                        <Picker.Item label="27" value="27" />
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.skintone}
                    style={{ height: 45, width: '100%'}}
                    itemStyle={{backgroundColor:"blue",color:"white",textAlign:"center",alignItems:"center"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({skintone : itemValue})}
                    >
                      <Picker.Item label="Skin Tone" value="Skin Tone"/>
                      <Picker.Item label="White" value="White" />
                      <Picker.Item label="Light Black" value="Light Black" />
                      <Picker.Item label="Light White" value="Light White" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <TextInput style={styles.richbox}
                  value={address}
                  placeholder="Address"
                  multiline={true}
                  numberOfLines={5}
                  onChangeText={(address) => this.setState({address})}/>
              </View>
              <View style={styles.inputpanal}>
                <TextInput style={styles.inputs}
                    value={city}
                    placeholder="City"
                    keyboardType="default"
                    onChangeText={(city) => this.setState({city})}/>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.status}
                    style={{ height: 45, width: '100%'}}
                    itemStyle={{backgroundColor:"blue",color:"white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({status : itemValue})}
                    >
                      <Picker.Item label="Status" value="Status"/>
                      <Picker.Item label="Unmerried" value="UnMerried" />
                      <Picker.Item label="Merried" value="Merried" />
                      <Picker.Item label="Divorce" value="Divorce" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.education}
                    style={{ height: 45, width: '100%'}}
                    itemStyle={{backgroundColor:"blue",color:"white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({education : itemValue})}
                    >
                      <Picker.Item label="Education" value="Education"/>
                      <Picker.Item label="BCA" value="BCA" />
                      <Picker.Item label="MCA" value="MCA" />
                      <Picker.Item label="B.Com" value="B.Com" />
                      <Picker.Item label="M.Com" value="M.Com" />
                      <Picker.Item label="BBA" value="BBA" />
                      <Picker.Item label="MBA" value="MBA" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.job}
                    style={{ height: 45, width: '100%'}}
                    itemStyle={{backgroundColor:"blue",color:"white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({job : itemValue})}
                    >
                      <Picker.Item label="Job" value="Job"/>
                      <Picker.Item label="Accountant" value="Accountant" />
                      <Picker.Item label="IT Engineer" value="IT Engineer" />
                      <Picker.Item label="Hardware Engineer" value="Hardware Engineer" />
                      <Picker.Item label="Bussines" value="Bussines" />
                      <Picker.Item label="Driver" value="Driver" />
                      <Picker.Item label="Electrical Engineer" value="MBA" />
                  </Picker>
                </View>
              </View>
              <View style={styles.inputpanal}>
                <View style={styles.dropdownlist}>
                  <Picker
                    selectedValue={this.state.experience}
                    style={{ height: 45, width: '100%'}}
                    itemStyle={{backgroundColor:"blue",color:"white"}}
                    onValueChange={(itemValue, itemIndex) => this.setState({experience : itemValue})}
                    >
                      <Picker.Item label="Experience" value="Experience"/>
                      <Picker.Item label="0-1 Year" value="0-1 Year" />
                      <Picker.Item label="2 Year" value="2 Year" />
                      <Picker.Item label="3 Year" value="3 Year" />
                      <Picker.Item label="4 Year" value="4 Year" />
                      <Picker.Item label="5 Year" value="5 Year" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardtitle}>Parents Details</Text>
            <View style={styles.cardinner}>
            <View style={styles.inputpanal}>
              <TextInput style={styles.inputs}
              value={fathername}
                  placeholder="Father's Name"
                  onChangeText={(fathername) => this.setState({fathername})}/>
            </View>
            <View style={styles.inputpanal}>
              <TextInput style={styles.inputs}
                  value={mothername}
                  placeholder="Mother's Name"
                  onChangeText={(mothername) => this.setState({mothername})}/>
            </View>
            <View style={styles.inputpanal}>
              <TextInput style={styles.inputs}
                  value={fatheroccupation}
                  placeholder="Father's Occupation"
                  onChangeText={(fatheroccupation) => this.setState({fatheroccupation})}/>
            </View>
            <View style={styles.inputpanal}>
              <TextInput style={styles.inputs}
                  value={motheroccupation}
                  placeholder="Mother's Occupation"
                  onChangeText={(motheroccupation) => this.setState({motheroccupation})}/>
            </View>
            <View style={styles.inputpanal}>
              <TextInput style={styles.inputs}
                  value={contactnumber}
                  placeholder="Contact Number"
                  keyboardType="number-pad"
                  onChangeText={(contactnumber) => this.setState({contactnumber})}/>
            </View>
            </View>
          </View>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('add')}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.buttonContainer , styles.registerButton]} onPress={() => this.onClickListener('back')}>
            <Text>Clear</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      </View>
    );
  }
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
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: 'rgb(4,64,90)'
  },
  Scrollview:{
    width:'100%',
  },
  card:{
    borderWidth:2,
    width:'90%',
    alignSelf:'center',
    borderRadius:10,
    borderColor:'white',
    overflow:'hidden',
    marginTop:10
  },
  cardtitle:{
    borderBottomWidth:1,
    marginBottom:15,
    backgroundColor:'green',
    paddingVertical:10,
    paddingHorizontal:10,
    fontSize:17,
    borderBottomColor:'white'
  },
  cardinner:{ paddingHorizontal:23 },
  header:{
    marginTop:30,
    marginBottom:30,
  },
  title:{
    color:'rgb(247,91,94)',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center',
  },
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
  inputpanal:{
    alignSelf:'center',
    width:'100%',
    marginBottom:15
  },
  dropdownlist:{
    backgroundColor:'white',
    borderRadius:20
  },
  richbox:{
    height:120,
    width:'100%',
    backgroundColor:'white',
    borderRadius: 20,
    textAlign:"center",
  },
  inputs:{
    height:45,
    width:'100%',
    backgroundColor:'white',
    borderRadius: 20,
    textAlign:"center",
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
  registerButton:{
    backgroundColor: 'white',
  },
  loginText: {
    color: 'white',
  },

  // height and width style

  height_width:{
    flexDirection:'row',
    alignSelf:'center',
    
  },
  h_w_layer:{
    alignSelf:'center',
    width:'49%',
    marginBottom:17,
  }
});
 