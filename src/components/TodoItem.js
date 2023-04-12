import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Image,FlatList,Modal,Pressable,ActivityIndicator, Alert} from 'react-native'
import React,{useState} from 'react'
import CheckBox from '@react-native-community/checkbox';
import { useEffect } from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { connect, useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  todosSuccess
} from '../../redux/actions'


const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"

const { width, height } = Dimensions.get("window");


export default function TodoItem({todo}) {
    console.log("todo item",todo)
//    console.log("todo list id", todo._id)
const dispatch = useDispatch();
const todos = useSelector((state) => state.todos.currentTodos)

    const [isSelected, setSelection] = useState(false);
    const [listItem, setListItem] = useState(todo.todos)
    const [todoListId]= useState(todo._id)
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
   const [loading, setLoading]= useState(false)
   const [shareMessage, setMessage] = useState("")
    // console.log("isSelected initial", isSelected)
    const [toggle,setToggle]=useState(false)
    const [completed,setCompleted]=useState(false)

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

useEffect(()=>{
    setListItem(todo.todos)
},[todo,listItem])

const [value, setValue] = useState(null);
const [isFocus, setIsFocus] = useState(false);
const data = [
    { label: 'Edit', value: '1' },
    { label: 'Share', value: '2' },
    { label: 'Delete', value: '3' },
  
  ];

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

 
  console.log("todos",todos)
  const values =todos.map((item)=>{
    console.log("item",item)
    if(item.id === todoid){
      item.isCompleted=iscomplete
    }
     return item 
  });

console.log("todos",todos)
dispatch(todosSuccess([...values, newvalue]))





}





  return (
    <View style={styles.todolist} >

            {/* <View style={styles.group_check_text}> */}
            {/* {todo.isCompleted ?   <Icon  name='check' size={30} color='#1e93e7'
                        // onPress={()=>toggleTodo(todo.id,todo.isCompleted)}
                        onPress={()=>console.log("i click on toggle")}


            /> :<Pressable 
            // onPress={()=>toggleTodo(todo.id,todo.isCompleted)}
            onPress={()=>console.log("i click on toggle")}

            >
             <View style={styles.checkbox}>

             </View>
            </Pressable> } */}
        
            {/* <View style={styles.todo_text}>
            <Text style={[styles.todo_title,todo.isCompleted? styles.completed: styles.notcompleted]} 
                                    onPress={()=>console.log("i click on toggle")}

            >  {todo.todo}                              </Text>
            <Text>{todo.details}</Text>
            </View> */}
{todo.isCompleted ? <Icon  name='star' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}
                        /> : <Icon  name='star-outline' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}

                        />}
            {/* </View> */}
            {todo.isCompleted ? <Icon  name='star' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}
                        /> : <Icon  name='star-outline' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}

                        />}

{todo.isCompleted ? <Icon  name='star' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}
                        /> : <Icon  name='star-outline' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}

                        />}
                        {todo.isCompleted ? <Icon  name='star' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}
                        /> : <Icon  name='star-outline' size={30} color='#000000'
                        onPress={()=>console.log("i click on toggle")}

                        />}
                        

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

            todo_text:{
              marginLeft:20
            },

            checkbox:{
              width: 25,
              height: 25,
              // backgroundColor:"blue",
              borderRadius:50,
              borderWidth:2,
              borderColor:"#57575B"
            },

   
    todo_title: {
        // textAlign: 'center',
        fontWeight: "700",
        fontSize: 20,
        lineHeight: 20,
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

    group_check_text:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"flex-start",
      backgroundColor:"blue"
    },
      todolist :{
        flexDirection : 'row',
        justifyContent:'space-between',
        alignItems : 'center',
        marginBottom : 20,
        marginTop: 10,
        marginLeft:20,
       
        
        backgroundColor : 'red',
        
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
        // borderBottomWidth : 1,
        // borderBottomColor : "#EAEAEA",
        // borderWidth : 1
            },
        
            
                    completed:{
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",  
                    marginLeft:10 ,
                    // width:"90%"

                  },


                    notcompleted:{
                        // textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        textDecorationColor: "#000",  
                    marginLeft:10                  },
   
   
  });