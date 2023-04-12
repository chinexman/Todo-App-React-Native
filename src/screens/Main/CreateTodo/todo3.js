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
} from 'react-native';
import styles from './styles-todo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  todosSuccess
} from '../../../../redux/actions'
import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';
import TodoItem from '../../../components/TodoItem';
import { NavigationContainer } from '@react-navigation/native';

const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;
console.log('authEndpoint', authEndpoint)






const AllTodos = ({ currentUser,navigation, route }) => {
  // console.log("route", route.params)
  // const checktodos = useSelector((state) => state)
  // console.log("checktodos",checktodos)
  // const todos = useSelector((state) => state.todos.currentTodos)
  // const navigation = useNavigation();
  const [firstName, setFirstname] = useState();
  const swiper = useRef(null);
  const [showButton] = useState([1]);
  const [search, setSearch] = useState('');
  const searchInputRef = createRef();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  
  
  const [todos, setTodos] = useState([]);
  console.log("todos from redux ",todos)
  const [onetodo] = useState([todos && todos[0]]);

  // const [todayTodos, setTodayTodos] = useState([]);
  // const [yesterdayTodos, setYesterdayTodos] = useState([]);
  const [otherDaysTodos, setOtherDaysTodos] = useState([]);


  const [searchNotes, setSearchNotes] = useState([]);
  const [profileImage, setProfileImage] = useState('http://res.cloudinary.com/dkwcn5tre/image/upload/v1672350173/profileImage/sf9cfeacmfzkrisdjxxr.png');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unVerify, setunVerify] = useState(false);
  const [aboutMe, setAboutMe] = useState([]);
  console.log("about Me todo", aboutMe)



  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // const [network, setNetwork] = useState(aboutMe && aboutMe[0].network || '');
  // const [notToDo, setNotDo] = useState(aboutMe && aboutMe[1].notToDo|| '');
  // const [goal10year, setGoal10year] = useState(aboutMe && aboutMe[2].goalWeek || '');
  // const [goalWeek, setGoalWeek] = useState( aboutMe && aboutMe[3].goalMonth || '');
  // const [goalMonth, setGoalMonth] = useState( aboutMe && aboutMe[4].goalYear || '');
  // const [goalYear, setGoalYear] = useState( aboutMe && aboutMe[5].goal10year || '');
  // const [goalLife, setGoalLife] = useState(aboutMe && aboutMe[6].goalLifeTime || '');
  // const [reading, setReading] = useState(aboutMe && aboutMe[7].reading || '');

  // console.log("Todos list", todos)

  // console.log("todayTodos", todayTodos)
  // console.log("aboutMe", aboutMe)

  //   const today = new Date().getDate();
  //   const todoDate = new Date(todo.createdAt).getDate()
  //   const yesterday = new Date().getDate() - 1 ;

  //   const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  // const d = new Date(todo.createdAt);
  // let day = weekday[d.getDay()];

  // const todos = [{id:1,item:"food", completed: false},{id:2,item:"sleep well", completed:true},{id:3,item : "complete document", completed : false}]
  // console.log("todo list", todos[0] )
  // console.log("todo length", todos.length)
  //  console.log("is focused", isFocused)


  const todayTodos = todos.filter((item) => {
    const today = new Date().getDate();
    const todoDate = new Date(item.createdAt).getDate()
    //  console.log("today", today)
    //  console.log("todoDate",todoDate)
    return today === todoDate
  })
  console.log("todayTodos", todayTodos)
  const yesterdayTodos = todos.filter((item) => {
    const yesterday = new Date().getDate() - 1;
    const todoDate = new Date(item.createdAt).getDate()
    // console.log("yesterday", yesterday)
    // console.log("todoDate",todoDate)
    return yesterday === todoDate
  })
  // console.log("yesterdayTodos", yesterdayTodos)


  const sortOutTodayTodos = todos.filter((item) => {
    const today = new Date().getDate();
    const todoDate = new Date(item.createdAt).getDate()
    return today !== todoDate
  })
  // console.log("sortOutTodayTodos", sortOutTodayTodos)


  const otherTodos = sortOutTodayTodos.filter((item) => {
    const yesterday = new Date().getDate() - 1;
    const todoDate = new Date(item.createdAt).getDate()
    console.log("otherdaydate",todoDate)
    return yesterday !== todoDate
  })
  console.log("otherTodos", otherTodos)

  const thirdday = new Date().getDate() - 2;

  const thirdDayTodo = otherTodos.filter((item) => {
    const third = new Date().getDate() - 2;
    console.log("third day",third)
    const todoDate = new Date(item.createdAt).getDate()
    if(third === todoDate){
      console.log("third todo day",todoDate)

    }
  
    return  third === todoDate;
  })

  const forthday = new Date().getDate() - 3;

  const forthDayTodo = otherTodos.filter((item) => {
    const forth = new Date().getDate() - 3;
    console.log("forth day",forth)
    const todoDate = new Date(item.createdAt).getDate()
    if(forth === todoDate){
      console.log("forth todo day",todoDate)

    }

  
    return  forth === todoDate;
  })
  



  const fifthday = new Date().getDate() - 4;

  const fifthDayTodo = otherTodos.filter((item) => {
    const fifth = new Date().getDate() - 4;
    console.log("fifth day",fifth)
    const todoDate = new Date(item.createdAt).getDate()
    if(fifth === todoDate){
      console.log("fifth todo day",todoDate)

    }
  
    return  fifth === todoDate;
  })

  const sixthday = new Date().getDate() - 5;

  const sixthDayTodo = otherTodos.filter((item) => {
    const sixth = new Date().getDate() - 5;
    console.log("six day",sixth)
    const todoDate = new Date(item.createdAt).getDate()
    if(sixth === todoDate){
      console.log("sixth todo day",todoDate)

    }
  
    return  sixth === todoDate;
  })

  console.log("thirddayTodos", thirdDayTodo)
  console.log("forthdayTodos", forthDayTodo)
  console.log("fifthdayTodos", fifthDayTodo)
  console.log("sixthdayTodos", sixthDayTodo)
  console.log("thirddayTodos", thirdDayTodo)


  const thismon = new Date().getMonth() + 1;
  const thisyear = new Date().getFullYear() ;

  const month = monthNames[thismon - 1].slice(0, 3)
console.log("this monthe",month)
console.log("this year",thisyear)

  // console.log("third month", monthNames[(new Date(ThirdDayTodo[0].createdAt).getMonth() + 1)-1].slice(0,3))

  console.log("ThirdDayTodo",thirdDayTodo)





  useEffect(() => {
    setLoading(true)

    loadTodos();

    const subscribe = navigation.addListener('focus', () => {
      loadTodos();

    });

    return subscribe;
  }, [])


  async function loadTodos() {
    setLoading(true)
    console.log("i click on load todos")
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM2Njg0MTExNTYzZjZhOTM0NGI5ZjUiLCJlbWFpbCI6ImNoaW5lZHVlbW9yZGlAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiQ2hpbmVkdSAiLCJpYXQiOjE2ODEyOTY0NjEsImV4cCI6MTY4MTM4Mjg2MX0.f4TAe_Asn49xF91jwbldGprocj0c_LbvVMWvWPqjN24"
    axios({
      url: `${authEndpoint}todo/get-all-todos/?timestamp=${new Date().getTime()}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`,

      },
    }).then(({ data }) => {
      setLoading(false);

      console.log("todo data", data.todos[0])
      console.log("todo data list", data.todos)
      // dispatch(todosSuccess(data.todos))
      setTodos(data && data.todos);

    })
      .catch((e) => {
        console.log("error on todo", e)

        console.log("error on todo", e.response)
        if (e && e.response && e.response) {

        } else {

          setError('An error occurred while Loading Notes, please try again later.');
        }
        setLoading(false);
      });
  }



  return (
    <View style={styles.container} >
      {/* <MyDrawer /> */}
      {!loading && !todos.length  && (<>
        <View style={styles.sizedboxmain}>
        </View>

        <Text style={styles.header}>
          Hi, {firstName}
        </Text>
        <Text style={styles.header_text}>
          What do you want to do today?
        </Text>
        <View style={styles.sizedbox}>
        </View>
      
        <Text style={styles.no_note_header}>
          You have no To-do list        </Text>

        <Text style={styles.no_note_text}>
          To-do entries would show up here. Tap on the button to create a To-do list.        </Text>

        {/* <View style={styles.sizedbox2}>
        </View> */}
        <Pressable style={styles.btn_create_note}
          onPress={() => navigation.navigate('BlankTodo')}
        >
          <Text style={styles.btn_create_note_text}>
            Create To-do list          </Text>
        </Pressable>


      </>)}


      <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>

      {todos && todos.length > 0 && <>
        <Pressable style={styles.add_note}
          onPress={() => navigation.navigate('BlankTodo')}
        >
          <Icon style={styles.image} name='pluscircle' size={50} color='#2DC86D'
          />
        </Pressable>


        {/* <View style={styles.sizedboxsearch}>
        </View> */}
        <View style={styles.sizedbox2}>
        </View>

        


        <View style={styles.sizedbox}></View>

        {/* <Pressable
          onPress={() => loadAboutMe}
        >
        </Pressable> */}

        <ScrollView>
          {todayTodos.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>Today</Text>

            </View>
            <FlatList
              data={todayTodos}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }

          {yesterdayTodos.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>Yesterday</Text>

            </View>
            <FlatList
              data={yesterdayTodos}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }


{thirdDayTodo.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>{month}{' '}{thirdday}{","}{thisyear}</Text>

            </View>
            <FlatList
              data={thirdDayTodo}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }


{forthDayTodo.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>{month}{' '}{forthday}{","}{thisyear}</Text>

            </View>
            <FlatList
              data={forthDayTodo}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }



{fifthDayTodo.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>{month}{' '}{fifthday}{","}{thisyear}</Text>

            </View>
            <FlatList
              data={fifthDayTodo}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }


{sixthDayTodo.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>{month}{' '}{sixthday}{","}{thisyear}</Text>

            </View>
            <FlatList
              data={sixthDayTodo}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          }
          {/* {otherTodos.length > 0 && <>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>Other days</Text>

            </View>
            <FlatList
              data={otherTodos}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <TodoItem todo={item} />}
            />
          </>
          } */}


{/* <FlatList
              data={weekday}
              keyExtractor={item => item.toString()}
              renderItem={({ item }) => <Text>{item}</Text>}
            /> */}
        </ScrollView>
      </>}

    </View>


  )
}



export default AllTodos;