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

export default class ViewData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      load: true
    }
  }
  async componentDidMount() {
    const resp = await this.apiCall({}, 'getData.php');
    console.log(resp);
    if (resp.status) {
      this.setState({
        data: resp.data,
      });
    }
    this.setState({
      load: false,
    });
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
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
        .then((response) => response.json());

  render() {
    const { data } = this.state;
    console.log(this.state.data);
    return (
      <View style={styles.container}>
          {/* <View style={styles.header}>
            <Text style={styles.title}>Show Data</Text>
          </View> */}
          <ScrollView style={{paddingTop:20}}>
            {
            data.length !== 0 ? 
              <View>
                {data.map((item) =>
                    <View style={styles.mainview}>
                      <View style={styles.insideview}>
                        <Image source={item.avtarsource} style={{width:150,height:150}}></Image>
                        <Text>First Name : {item.firstname}</Text>
                        <Text>last Name : {item.lastname}</Text>
                        <Text>Gender : {item.gender}</Text>
                        <Text>Birthdate : {item.birthdate}</Text>
                        <Text>age : {item.age}</Text>
                        <Text>Height : {item.height}</Text>
                        <Text>Weight : {item.weight}</Text>
                        <Text>Skin Tone : {item.skintone}</Text>
                        <Text>Address : {item.address}</Text>
                        <Text>City : {item.city}</Text>
                        <Text>Status : {item.status}</Text>
                        <Text>Education : {item.education}</Text>
                        <Text>Job : {item.job}</Text>
                        <Text>Experience : {item.experience}</Text>
                        <Text>Father's Name : {item.fathername}</Text>
                        <Text>Mother's Name : {item.mothername}</Text>
                        <Text>Father's Occupation : {item.fatheroccupation}</Text>
                        <Text>Mother's Occupation : {item.motheroccupation}</Text>
                        <Text>Contact Number : {item.contactnumber}</Text>
                      </View>
                    </View>
                  )
                }
              </View> : <View><Text style={styles.message}>No Data Found</Text></View>
            }
            <View style={styles.buttons}>
              <TouchableHighlight style={[styles.buttonContainer , styles.registerButton]} onPress={() => this.onClickListener('back')}>
                <Text>Back Home</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
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
    marginTop:60,
    marginBottom:30,
    alignSelf:'center',
  },
  title:{
    color:'rgb(247,91,94)',
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center',
  },
  message:{
    color:'white',
    fontWeight:'300',
    fontSize:14,
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
  registerButton:{
    backgroundColor: 'white',
  },

  // Data Show Table Design

  mainview:{
    backgroundColor:'white',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    paddingVertical:10,
    paddingHorizontal:10,
    marginBottom:20,
    width:'95%',
    alignSelf:'center',
  },
  insideview:{
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderWidth:1,
    borderColor:'black',
    paddingHorizontal:7,
  }
});
 