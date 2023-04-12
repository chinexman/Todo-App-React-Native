import React, { useState, createRef, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  SliderBase,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import styles from './styles-todo';
import { useNavigation } from '@react-navigation/native';
import {

  todosSuccess
} from '../../../../redux/actions'
import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useIsFocused } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';
import TodoItem from '../../../components/TodoItem';
import { NavigationContainer } from '@react-navigation/native';

const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;
console.log('authEndpoint', authEndpoint)






const AllTodos = ({ route }) => {
  // console.log("route", route.params)

  const todos = useSelector((state) => state.todos.currentTodos)
  const todoList = useSelector((state) => state.todolists.currentTodolists)

  const navigation = useNavigation();
  console.log("todos from redux ", todos)
  console.log("todoList from redux ", todoList)

  const swiper = useRef(null);
  const [showButton] = useState([1]);
  const [search, setSearch] = useState('');
  const searchInputRef = createRef();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [openDetails, setOpenDetails] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [starCompleted, setStarCompleted] = useState(false);

  const [viewCompleted,setViewCompleted]= useState(true)

  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");

  const titleInputRef = createRef();
  const detailsInputRef = createRef();
  const [barIndex, setBarIndex] = useState(0)
  console.log("barIndex", barIndex)

  // const [todos, setTodos] = useState([{"_id": "6431725dee21708205997a95", "createdAt": "2023-04-08T13:55:41.680Z", "id": "6431725dee21708205997a95", "title": "Birthday party", "todos": [{id:"dididi",todo:"Beach Play"},{id:"diidkd",todo:"Beach dance",details:"always  calm"},{id:"idiidi",todo:"fun",details:"nice people"}], "userId": "642f06026569177857288777"}, {"_id": "64317230ee21708205997a79", "createdAt": "2023-04-08T13:54:56.465Z", "id": "64317230ee21708205997a79", "title": "Saturday todo", "todos": [{id:"eieiei", todo:"go for Evangelism", details:"praying"}, {id:"idiie", todo:"Pray",details:"breaking yoke"},{id:"dliid", todo:"Minister to people" ,details:"evangelism"}], "userId": "642f06026569177857288777"}]);
  // const [todos, setTodos] = useState([])
  const [fields, setFields] = useState([{ todo: "", details: "", id: 0 }]);
  console.log("fields", fields)
  console.log("todos ", todos)

const todosNotCompleted = todos.filter((item)=>{
  return item.isCompleted === false
})

const todosCompleted = todos.filter((item)=>{
  return item.isCompleted;
})

console.log("todosNotCompleted",todosNotCompleted)
console.log("todosCompleted",todosCompleted)


  const [searchNotes, setSearchNotes] = useState([]);
  const [profileImage, setProfileImage] = useState('http://res.cloudinary.com/dkwcn5tre/image/upload/v1672350173/profileImage/sf9cfeacmfzkrisdjxxr.png');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unVerify, setunVerify] = useState(false);




  async function saveTodo() {
    console.log("save todo  clicked")
    const trimmedTitle = title.trim();
    const trimmedDetails = details.trim();

    const values = [...todos];

    const newvalue = { todo: trimmedTitle, details: trimmedDetails, id: "643687d52f5bb25f46486f5d" , isCompleted ,starCompleted,todos: [{"_id": "643687d52f5bb25f46486f5e", "createdAt": "2023-04-12T10:28:37.887Z", "id": "643687d52f5bb25f46486f5e", "isCompleted": true, "todo": "Good man"}] };
   
    console.log("newvalue",newvalue)
    console.log("todos", todos)
    setModalVisible(false)

    dispatch(todosSuccess([...values, newvalue]))
    
    setTitle("")
    setDetails("")
   

  }


  const handleChange = (event, text) => {

    console.log("event text", event, text)



    if (event === "title") {
      setTitle(text)

    } else if (event === "details") {
      setDetails(text)
    }



  }







  return (
    <View style={styles.container}>


      <View style={styles.sizedboxmain}></View>
      <Text style={styles.header_text}>Tasks</Text>

     

      {!todos.length && (<>

        <View style={styles.empty_note}>
          <Image style={styles.image}
            source={require("../../../../assets/images/notasks.jpeg")}
          />
        </View>
        <Text style={styles.no_note_header}>
          No tasks yet      </Text>

        <Text style={styles.no_note_text}>
          Add your to-dos and keep track of them across ZST Workspace        </Text>
      </>)}

      {todosNotCompleted && todosNotCompleted.length > 0 && <>
        <ScrollView
          //  horizontal={true} style={{ width: "100%" }}
           >
          <FlatList
            data={todosNotCompleted}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <TodoItem todo={[item]}  />}
          />
        </ScrollView>
      </>}

      {/* {todosCompleted && todosCompleted.length > 0 && <>
        <ScrollView>
          <View style={styles.group_completed}>
            <View>
             <Text style={styles.completed_header_text}>Completed({todosCompleted.length})</Text>
            </View>
           {viewCompleted ? <Icon name='chevron-up' size={30} color='#000000'
                   onPress={()=>setViewCompleted(!viewCompleted)}

                    /> : <Icon name='chevron-down' size={30} color='#000000'
                    onPress={()=>setViewCompleted(!viewCompleted)}
 
                     />}
          </View>
          {viewCompleted?
          <FlatList
            data={todosCompleted}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <TodoItem todo={item} />}
          /> : null}
        </ScrollView>
      </>} */}

      <Pressable style={styles.add_task}
        onPress={() => setModalVisible(true)}
      >
        <Image style={styles.add_image}
          source={require("../../../../assets/images/addtask.jpeg")}
        />
      </Pressable>
      <View style={styles.centeredView}>
        <Modal
          style={styles.modalcom}
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <Pressable
            style={styles.modalCover}
            onPress={() => {
              setModalVisible(false)
            }}
          >
            <KeyboardAvoidingView >
              <View style={styles.modalView}>
                <TextInput
                  style={styles.textInput}
                  placeholder="New task"
                  ref={titleInputRef}
                  value={title}
                  onChangeText={(title) => handleChange("title", title)}
                >
                </TextInput>
                {openDetails && <TextInput
                  style={styles.textInput_details}
                  // multipleline
                  placeholder="Add details"
                  value={details}
                  ref={detailsInputRef}
                  onChangeText={(details) => handleChange("details", details)}
                ></TextInput>}
                <View style={styles.group_icons}>
                  <View style={styles.icon_task}>
                    <Icon name='text' size={30} color='#000000'
                   onPress={()=>setOpenDetails(!openDetails)}

                    />
                    <Icon name='calendar-check' size={30} color='#000000'
                    />
                    {starCompleted ?<Icon name='star' size={30} color='#000000'
                    onPress={()=>setStarCompleted(!starCompleted)}
                    /> : <Icon name='star-outline' size={30} color='#000000'
                    onPress={()=>setStarCompleted(!starCompleted)}
                    />}
                  </View>
                  <Pressable
                    onPress={saveTodo}
                  ><Text>Save</Text></Pressable>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      </View>
    </View>
  )
}



export default AllTodos;