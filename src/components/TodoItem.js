import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Image,FlatList,Modal,Pressable,ActivityIndicator, Alert} from 'react-native'
import React,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
  todosSuccess
} from '../../redux/actions'


const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"

const { width, height } = Dimensions.get("window");


export default function TodoItem({todo}) {
    console.log("todo seeing item",todo)
//    console.log("todo list id", todo._id)
const dispatch = useDispatch();

    const [isSelected, setSelection] = useState(false);
    const [listItem, setListItem] = useState([todo])
    const [todoListId]= useState(todo.id)
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
   const [loading, setLoading]= useState(false)
    // console.log("isSelected initial", isSelected)
    const [toggle,setToggle]=useState(false)
    const [toggleValue,setToggleValue]=useState(false)
    const [todoIndex, setTodoIndex] = useState(0)

    // console.log("toggleValue ", toggleValue)

    
    const today = new Date().getDate();
    const todoDate = new Date(todo.createdAt).getDate()
    const yesterday = new Date().getDate() - 1 ;

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date(todo.createdAt);
let day = weekday[d.getDay()];
  // console.log("listItem",listItem)


  

// useEffect(()=>{
//     setListItem(todo.todos)
// },[todo,listItem])

const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);


// const renderLabel = () => {
//   if (value || isFocus) {
//     return (
//       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//         Dropdown label
//       </Text>
//     );
//   }
//   return null;
// };


function handleOption() {
    setModalVisible(true)
  }

 


 function toggleTodo (todoid, iscomplete){




console.log("todo id", todoid)

console.log("iscompleted",iscomplete)

  setToggle(true)

  if(iscomplete){

    setToggleValue(false)
  }else{
    setToggleValue(true)
  }

const fd ={
    id:todoListId,
    todoId: todoid,
    status : !iscomplete
}

// console.log("fd",fd)
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM2Njg0MTExNTYzZjZhOTM0NGI5ZjUiLCJlbWFpbCI6ImNoaW5lZHVlbW9yZGlAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hpbmVkdSAiLCJpYXQiOjE2ODEyOTY0NjEsImV4cCI6MTY4MTM4Mjg2MX0.f4TAe_Asn49xF91jwbldGprocj0c_LbvVMWvWPqjN24"
console.log("access_token",access_token)
axios({
  url: `${authEndpoint}todo/toggle-todo`,
  method: 'post',
  data:fd,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${access_token}`,

  },
})
  .then((response) => {

    console.log("response data .todo",response.data.todo)

  }).catch((error) => {
    // setToggle(false)
 console.log("error",error)
 console.log("error response data" , error.response.data)
  }
  );

}





  return (
    <View style={styles.todogroup}>


        <Text>For life</Text>
        

 

     {/* <View style={styles.one_todo_list}>
     
    

            <View style={styles.todolist} >
          <View style={styles.check}>
            <CheckBox
              value={todo.isCompleted}

            //   onValueChange={setSelection}
              onValueChange={()=>{
                  console.log("status onchange", todo.isCompleted)
                //   setSelection(item.isCompleted)
                //   setSelection(!item.isCompleted)
                // setTodoIndex(index) 

                   toggleTodo(todo.id,todo.isCompleted)
                //   setMessage(item.todo)
              }
            }
              style={styles.checkbox}
              boxType="square"
              tintColor="#CFCFD5"
              onCheckColor="#FFFFFF"
              onFillColor="#2DC86D"
              onTintColor="#2DC86D"
            />
            <Text>
              {todo.todo}                              </Text>
          </View>
        </View>  */}


            {/* {console.log("item.isCompleted",item.isCompleted)} */}
    <FlatList
          data={listItem}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item,index }) =>  <View style={styles.todolist} >
           { console.log("good man",item)}
          <View style={styles.check}>
            <CheckBox
              value={item.isCompleted}

            //   onValueChange={setSelection}
              onValueChange={()=>{
                  console.log("status onchange", item.isCompleted)
                //   setSelection(item.isCompleted)
                //   setSelection(!item.isCompleted)
                setTodoIndex(index) 

                   toggleTodo(item._id,item.isCompleted)
                //   setMessage(item.todo)
              }
            }
              style={styles.checkbox}
              boxType="square"
              tintColor="#CFCFD5"
              onCheckColor="#FFFFFF"
              onFillColor="#2DC86D"
              onTintColor="#2DC86D"
            />
            <Text style={[styles.todotext,toggle?(todoIndex===index? (toggleValue? styles.completed: styles.notcompleted):(item.isCompleted? styles.completed : styles.notcompleted)):(item.isCompleted? styles.completed : styles.notcompleted)]}>
              {item.todo}                              </Text>
          </View>
        </View>}
        />



 

</View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "#FDFDFD",

    },

    sizedbox: {
        height: 60,
    },
    sizedbox2: {
        height: 30,
    },
    sizedboxmain: {
        height: 150,
    },
    sizedboxsearch: {
        height: 60,

    },

    topmenuicon: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        width: "100%",
        height: 31,
        // backgroundColor:'blue'
    },

    menuimage: {
        width: 32,
        height: 32

    },

    searching: {
        display: "flex",
        flexDirection: "row",
        // backgroundColor: 'blue',
        width: 61,
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    todosearch: {
        width: 24,
        height: 24,
    },

    todonotification: {
        width: 27,
        height: 27,
    },
    caroselgroup:{
        display: 'flex',
        flexDirection:"row",
        height:160,
            },

    carosel: {
        width: 124,
        height: 154,
        backgroundColor: "#2DC86D",
        borderRadius: 10,
        padding: 10
    },

    caroselblue: {
        width: 124,
        height: 154,
        backgroundColor: "#117DB7",
        borderRadius: 10,
        padding: 10,
        marginLeft:10,
    },
    caroselorange: {
        width: 124,
        height: 154,
        backgroundColor: "#F3BF05",
        borderRadius: 10,
        padding: 10,
        marginLeft:10,
    },

    caroselbody: {
        width: 105,
        height: 100,
        backgroundColor: "#FAFAFA",
        color: "#57575B",
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },

    caroselText: {
        textAlign: 'center',
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 18,
        color: "#FFFFFF",
    },
    bodyText: {
        // textAlign: 'center',
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 12,
        color: "#57575B",
    },
  
    delete_image: {
        width: 24,
        height: 24,
      },

      // todogroup:{
      //   backgroundColor:'blue'
      // },


    one_todo_list :{
        // backgroundColor:'green',
        width:"100%",
        borderWidth:1,
        borderColor : "#EAEAEA",
        padding:10,
        borderRadius:10,
        marginBottom:10,
    },
      todolist :{
        flexDirection : 'row',
        // justifyContent:'space-around',
        // alignItems : 'center',
        marginBottom : 20,
        marginTop: 10,
        marginLeft:20,
       
        
        // backgroundColor : 'red',
        
            },
        
            tododatetext:{
                fontWeight: "800",
        fontSize: 16,
        lineHeight: 24,
        color: "#030309", 
            },

            edit_image:{
                width:24,
                height:24,
                alignItems:'flex-end'
            },

            todo:{
              display :"flex",
              flexDirection:"row",
              // justifyContent:"space-between",
              // backgroundColor : "blue",
          },

            todo_type:{
                // borderBottomWidth: 1,
                // borderColor:"#EAEAEA",
                marginBottom:5,
                width:'90%'

            },

            todo_title_line:{
              borderBottomWidth: 1,
              borderColor:"#EAEAEA",
              marginLeft:-10,
              width:'110%',
              marginBottom:10

          },

          modalCover:{
            flex:1,
            height: "100%",
            width: "100%",
        
          },
          
            todo_category:{
                fontWeight: "400",
        fontSize: 14,
        lineHeight: 21,
        color: "#57575B", 
        marginBottom:10,
        // width:"90%",
        // backgroundColor:'blue',
        marginTop:5,
        marginLeft:15,
        borderBottomWidth : 1,
        borderBottomColor : "#EAEAEA",
        // borderWidth : 1
            },
        
            check :{
                flexDirection : 'row',
                justifyContent:'space-between',
                alignItems : 'center',
                marginRight : 20,
                // backgroundColor :'blue',
                // width:5,
                    },

                    todotext:{
                      // flex:0,
                      flexShrink: 1,
                      paddingRight:10,
                      marginBottom:-20,
                      marginTop:-20
                                          },        
                    completed:{
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",  
                    marginLeft:10        
                  
                  },


                    notcompleted:{
                        // textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",  
                    marginLeft:10                  },
    header: {
        textAlign: 'left',
        fontWeight: "700",
        fontSize: 20,
        lineHeight: 20,
        color: "#57575B",
        marginBottom: 15,
    },

    header_text: {

        fontSize: 14,
        lineHeight: 16,
        marginBottom: 30,
        color: '#57575B',

    },

    search: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    searchinput: {
        width: '30%',
        marginRight: 20,
    },

    iconeditsearch: {
        position: 'absolute',
        zIndex: 2,
    },

    iconedit: {
        width: 18,
        height: 12,
    },

    verify: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#2DC86D',
    },
    empty_note: {
        height: 272,
    },
    image: {
        width: '100%',
        height: 220,

    },

    no_note_header: {
        textAlign: 'center',
        fontWeight: "500",
        fontSize: 25,
        lineHeight: 25,
        color: "#57575B",
        marginBottom: 15,
    },

    no_note_text: {
        textAlign: 'center',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
        color: "#57575B",
        marginBottom: 25,
    },

    verify_image: {
        width: "100%",
        height: 258,
    },
    existinguser_image: {
        width: 40,
        height: 40,
    },

    profile_image: {
        width: 40,
        height: 40,

        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#AFAFB9',
        backgroundColor: '#DFE3EA',
    },
    btn_verify: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#2DC86D',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 60,
        marginBottom: 20,
    },

    textInput: {
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        borderWidth: 1,
        height: 40,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 20,

        color: '#000000',
        borderColor: '#D5D5D6',
        padding: 10,
        alignItems: 'center',
        width: '85%',
    },



    btn_create_note_text: {
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
        color: '#FFFFFF',
    },

    btn_create_note: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: '#2DC86D',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        height: 60,
        marginBottom: 20,
    },

    signup_container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signup_agree: {
        fontSize: 16,
        lineHeight: 24,
        color: '#030309',
    },
    signup_terms: {
        fontSize: 16,
        lineHeight: 24,
        color: '#2DC86D',
    },
    swipe: {
        flexDirection: "row",
    },

    loading: {
        marginTop: '80%',
        marginLeft: 182,
        position: 'absolute',
        zIndex: 1,
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

    add_note: {
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        marginTop: height - 150,
        width: 64,
        height: 64,
    },
    modalView: {
        marginTop: "82%",
        backgroundColor: '#FDFDFD',
        position : 'absolute',
        zIndex : 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#AFAFB9",
        paddingTop:10,
        paddingBottom:10,

    
        // height: 150,
        width:203,
        marginLeft: "50%",
        marginRight: 12,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      btnGroup: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:"center",
        // marginBottom: 40,
    
      },
      button: {
        borderRadius: 8,
        padding: 10,
        // elevation: 2,
        justifyContent: 'center',
        // alignItems: 'left',
        width: 136,
        borderBottomColor : "#AFAFB9",
        borderBottomWidth:1,



        
      },
      buttonConfirm: {
        backgroundColor: '#FDFDFD',
        borderColor: '#AA0A0A',
        borderWidth: 1,
      },
      buttonDelete: {
        borderBottomColor : "#FFFFFF",
        borderBottomWidth:1,

      },
      textCancel: {
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 14,
    
    
      },
      textConfirm: {
        color: '#57575B',
        fontWeight: '400',
        textAlign: 'left',
        fontSize: 16,
        lineHeight: 24,
    
    
      },
      modalText: {
        textAlign: 'center',
    
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 20,
        // paddingBottom:24,
    
        color: '#57575B',
    
      },
      modalHeading: {
        textAlign: 'center',
    
        fontWeight: "800",
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        color: '#030309',
    
      },
      dropdown: {
        // height: 50,
        borderColor: 'gray',
        // borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      iconedit: {
        marginRight: 5,
        
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
   
  });