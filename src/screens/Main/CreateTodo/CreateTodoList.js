import React, { useLayoutEffect, useRef, useState, createRef, useEffect } from "react";
import {
  StyleSheet, Text, TextInput, ScrollView, View, Pressable, FlatList, Image, ActivityIndicator, Alert
} from "react-native";
import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import {
  todolistsSuccess
  
} from '../../../../redux/actions'
import { connect, useDispatch, useSelector } from 'react-redux';


const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;
console.log('authEndpoint',authEndpoint)


const CreateTodoList = ({ route, navigation }) => {

  const todoList = useSelector((state) => state.todolists.currentTodolists)
  const dispatch = useDispatch();



  const [error, setError] = useState('')
  const [title, setTitle] = useState('');


  const [enable, setEnable] = useState(false);




  const titleInputRef = createRef();




console.log("todolist", todoList)
console.log('title', title)

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
      (<>
        <View style={{
          display: 'flex', flexDirection: 'row', paddingLeft: 30, paddingTop: 40, backgroundColor: '#FFFFFF', color: "red"
        }}>
         
          <Pressable
            onPress={navigation.goBack}
          >
            <Image
              style={{ width: 24, height: 24, }}
              source={require("../../../../assets/images/backicon.png")}
            />
          </Pressable>

          <Text style={{ color: '#000000', marginLeft: '30%', marginTop: 3 }}>Create new list</Text>
          <Pressable style={{ marginLeft: '20%' }} onPress={saveTodo}><Text style={[ {fontWeight: '700', fontSize: 16, lineHeight: 24 }, enable ? styles.active: styles.inactive]}>Done</Text></Pressable>
        </View>
      </>
      ),
    });
  }, [title]);

  async function saveTodo() {
    console.log("save todo  clicked")
    if (!title.length) {
      return;
    }
    const trimmedTitle =  title.trim();
   
    const fd = {

      title: trimmedTitle.trim(),

    }

console.log("fd todo list ", fd)
       
const values = [...todoList];
let result = "";
const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const charactersLength = characters.length;
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    result += characters.charAt(Math.floor(Math.random() * charactersLength));

    console.log("result",result)
const newvalue = { todolist: trimmedTitle, id: values.length};
console.log("newvalue",newvalue)
console.log("todolist", todoList)
    result = "",
               
dispatch(todolistsSuccess([...values, newvalue]))
 
navigation.navigate("Todo")

  }

  function handleChange(text, event) {

    if (text === '') {
      setEnable(false)
    }
    if (!text) {
      setEnable(false)
    }

    if (text !== null) {
      setEnable(true)
    }

    if (event === 'title') {
      setTitle(text)
      return;
    } 


  }










  return (
    <>
      <View style={styles.container}>

       
        <TextInput
          style={styles.textInput}
          placeholder="Enter list title"
          value={title}
          ref={titleInputRef}
          onChangeText={(text) => handleChange(text, 'title')}
        ></TextInput>
         

      </View>
    </>
  );
};

export default CreateTodoList;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */


  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 24,

  },

  containerStyles: {
    // backgroundColor : 'purple',
    marginBottom: -150,
  },
  editor: {
    backgroundColor: "black",
    borderColor: "black",
    // borderWidth: 1,
  },
  rich: {
    flex: 1,
    minHeight: 100,
    backgroundColor: 'red'
  },
  richBar: {
    height: 150,
    backgroundColor: "blue",
    // paddingTop : 80,
    fontSize: 10,
    // marginBottom: -60,
  },


  delete: {
    position: 'absolute',
    zIndex: 1,
    width: 30,
    height: 30,
  },

  deleteImage: {
    position: 'absolute',
    zIndex: 1,
    width: 30,
    height: 30,
    // marginTop: -10,
    alignSelf: 'flex-end'
  },

  add: {
    width: 24,
    height: 24,
  },
  eye: {
    marginTop: '50%',
    width: '100%',
  },

  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textInput: {
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#D5D5D6',
    borderWidth: 1,

  },

  textInputnote: {
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#D5D5D6',
    borderWidth: 1,
    paddingTop:20,
    width: '80%',

  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },

  btn_done: {
    marginTop: 20,
    alignSelf: 'flex-end',
    width: 136,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

  },

  keypoint: {
    flexDirection: 'row',
  },

  checkbox: {
    marginTop: 10,
    width: 24,
    height: 24,
    backgroundColor: '#5F5E73',
    borderRadius: 5,
    marginRight: 10
  },

  uncheckbox: {
    marginTop: 15,
    width: 24,
    height: 24,
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderColor: '#CFCFD5',
    borderRadius: 5,
    marginRight: 10
  },

  btn_done_text: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',

  },
  loading: {
    marginTop: '80%',
    marginLeft: 182,
    position: 'absolute',
    zIndex: 1,
  },

  active: {
    color: '#1e93e7'
  },
  inactive: {
    color: '#D5F4E2'

  },
});