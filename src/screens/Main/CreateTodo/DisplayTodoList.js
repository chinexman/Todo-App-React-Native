// import React, { useLayoutEffect, useRef, useState, createRef, useEffect } from "react";
// import {
//     StyleSheet, Text, TextInput, ScrollView, Modal, View, Pressable, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert
// } from "react-native";
// import {
//     actions,
//     defaultActions,
//     RichEditor,
//     RichToolbar,
// } from "react-native-pell-rich-editor";
// import HTMLView from "react-native-htmlview";
// import { Keyboard, KeyboardAvoidingView } from 'react-native';
// import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
// import axios from 'axios';
// import CheckBox from '@react-native-community/checkbox';
// import Icon from 'react-native-vector-icons/Feather';
// import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes";
// import { setCurrentUser, getCurrentUser, setCurrentVault } from '../../../helpers/Utils';

// const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"



// const DisplayTodoList = ({ route, navigation }) => {

//     console.log('route', route)
//     console.log('route.params', route.params.note)
//     console.log('navigation', navigation);
//     const { note, createdAt, _id, viewCount } = route && route.params && route.params.note;

//     console.log("_id", _id)
//     const [error, setError] = useState('')
//     const [title, setTitle] = useState(route.params && route.params.note ? route.params.note.title : '');

//     const [fields, setFields] = useState(route.params && route.params.note ? route.params.note.note : [{ value: "", id: 0 }]);
//     const [values, setValues] = useState([]);

//     const [isSelected, setSelection] = useState(false);
//     const [enable, setEnable] = useState(false);

//     const [loading, setLoading] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);

//     console.log('fields', fields)
//     console.log("title  =>", title)
//     const eventInputRef = createRef();
//     const titleInputRef = createRef();
//     const speakerInputRef = createRef();
//     const [access_token, setAccessToken] = useState("");

//     const time = new Date();;

//     console.log(time);


//     useEffect(() => {

//         const getToken = async () => {
//             const storageUser = await getCurrentUser();
//             const access_token = storageUser.access_token
//             console.log('storageUser ==> ', storageUser);
//             setAccessToken(storageUser && storageUser.access_token)
//         }
//         getToken();

//     }, [])

//     const day = new Date(time).getDate();
//     const mon = new Date(time).getMonth() + 1;
//     const newtime = new Date(time).toLocaleTimeString();
//     console.log("newtime", newtime)

//     console.log('month', month);
//     console.log('day', day);
//     const monthNames = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December',
//     ];
//     const month = monthNames[mon - 1].slice(0, 3)


//     console.log(monthNames[mon - 1].slice(0, 3))
//     const dateTime = (date) => {
//         let hours = date.getHours();
//         console.log(hours)
//         let minutes = date.getMinutes();
//         let ap = hours >= 12 ? 'pm' : 'am';
//         hours = hours % 12;
//         hours = hours ? hours : 12;
//         minutes = minutes.toString().padStart(2, '0');
//         let mergeTime = hours + ':' + minutes + ' ' + ap;
//         console.log(ap)
//         return mergeTime;
//     }
//     const timeCreated = dateTime(new Date(time));
//     console.log(timeCreated)


//     useEffect(() => {

//         getNote();

//     }, [])

//     async function getNote() {

//         console.log("get note")
//         console.log("token", access_token)
//         console.log("_id", _id)

//         const storageUser = await getCurrentUser();
//         const access_token = storageUser.access_token

//         axios({
//             url: `${authEndpoint}note/get-note` + '/' + _id + `?search=`,

//             method: 'get',
//             headers: {
//                 Accept: 'application/json',

//                 'content-type': 'application/json',
//                 Authorization: `Bearer ${access_token}`,

//             },

//         }).then((response) => {
//             console.log("get note")
//             console.log("response.data", response.data.viewCount)


//         })
//             .catch((e) => {
//                 console.error(e)
//                 console.log(" error on catch key view", e.response.data)
//                 if (e && e.response && e.response.data) {

//                 } else {

//                 }
//             })
//     }

//     function handleDelete() {
//         setModalVisible(!modalVisible)
//     }


//     async function deleteNote() {
//         setModalVisible(!modalVisible)

//         console.log("access_token", access_token)
//         const storageUser = await getCurrentUser();
//         const access_token = storageUser.access_token
//         console.log('storageUser ==> ', storageUser);
//         setAccessToken(storageUser && storageUser.access_token)
//         // console.log(`${authEndpoint}note/delete-note` + '/' + route.params.note._id);
//         setLoading(true)
//         axios({
//             method: 'delete',
//             url: (`${authEndpoint}note/delete-note` + '/' + route.params.note._id),
//             headers: {
//                 Accept: 'application/json',

//                 'content-type': 'application/json',
//                 Authorization: `Bearer ${access_token}`,

//             },

//         }).then((response) => {
//             setLoading(false)
//             console.log("response.data", response.data)
//             Alert.alert("", response.data.message)
//             //redirect back to home screen
//             navigation.navigate('Notes');
//         })
//             .catch((e) => {
//                 console.error(e)
//                 console.log(" error on catch delete", e.response.data)
//                 //     if(e && e.response && e.response.data && e.response.data.error){
//                 //       setError(e.response.data.message);
//                 //       //  setunVerify(true)
//                 //   }else{

//                 //       setError('An error occurred, please try again later.');
//                 //   }
//                 setLoading(false);
//             })
//     }

//     function savePad() {

//         setFields(values);
//     }

//     function saveNote() {

//         console.log("save note")


//         const trimmedTitle = title.trim();
//         //   const trimmedContent = content.trim();
//         // if (!trimmedContent.length) {
//         //   setError('Please fill content');
//         //   return;
//         // }
//         const fd = {
//             event,
//             title: trimmedTitle.trim(),
//             speaker,
//             //   note : trimmedContent.trim(),
//         }
//         setLoading(true)
//         console.log("save note details ==> ", fd);
//         // console.log(`${authEndpoint}note/update-note` + '/' + route.params.note._id)
//         axios({
//             //   method: route.params && route.params.note ? 'patch' : 'post',
//             //    url:  (route.params && route.params.note) ? (`${authEndpoint}note/update-note` + '/' + route.params.note._id) : `${authEndpoint}note/add-note`,

//             // method : 'post',
//             data: fd,
//             headers: {
//                 Accept: 'application/json',

//                 'content-type': 'application/json',
//                 Authorization: `Bearer ${access_token}`,

//             },

//         }).then(() => {
//             //redirect back to home screen
//             console.log("save note")
//             setLoading(false)
//             navigation.navigate('Notes');
//         })
//             .catch((e) => {
//                 console.error(e)
//                 console.log(" error on catch", e.response.data)
//                 //   if(e && e.response && e.response.data && e.response.data.error){
//                 //     setError(e && e.response && e.response.data ? e.response.data.message : "An error occurred, please try again later.");
//                 //     //  setunVerify(true)
//                 // }else{

//                 //     setError('An error occurred, please try again later.');
//                 // }
//                 setLoading(false);
//             })
//     }

//     function handleChange(text, event) {
//         console.log('text', text)
//         console.log("event", event)
//         console.log('fields', fields)
//         if (text === '') {
//             setEnable(false)
//         }
//         if (!text) {
//             setEnable(false)
//         }

//         if (text !== null) {
//             setEnable(true)
//         }

//         const values = [].concat(fields);
//         console.log("values", values)
//         // console.log(values[event].value = text)
//         values[event].value = text;
//         values.push({ "isSelected": "false", "value": "H" })
//         console.log("values", values)
//         console.log("fields", fields)


//         setValues(values);
//     }

//     function handleAdd() {

//         const values = [...fields];

//         const newvalue = { value: "", id: values.length };
//         setFields([...values, newvalue]);
//     }


//     //   useLayoutEffect(() => {
//     //     navigation.setOptions({
//     //       headerTitle: content.length === 0 ? 'New Note' : 'Edit Note',
//     //     //   headerRight: route.params && route.params.note ? () => (
//     //     //     <Button  onPress={deleteNote}>Delete</Button>
//     //     //   ) : () => (<></>)
//     //     });
//     //   }, []);



//     const renderItem = ({ item, index }) => (
//         <View style={styles.keypoint}>
//             {console.log("render", item, index)}
//             <View style={styles.checkbox}
//             >

//             </View>

//             <TextInput
//                 style={styles.textInputnote}
//                 editable={false}
//                 multiline
//                 placeholder="Type"
//                 value={item.value}
//                 ref={speakerInputRef}
//                 onChangeText={(text) => handleChange(text, index)}
//             // onChangeText={(text) =>  setContent(text)}

//             >
//             </TextInput></View>
//         //  console.log('item, index', item,index)
//     );
//     return (
//         <>


//             <View style={styles.container}>

//                 <Modal

//                     style={styles.modalcom}
//                     animationType="slide"
//                     transparent={true}
//                     visible={modalVisible}
//                 >
//                     {/* <View style={styles.centeredView}> */}
//                     <View style={styles.modalView}>

//                         <Text style={styles.modalText}>Are you sure you want to delete this note?</Text>

//                         <View style={styles.btnGroup}>
//                             <Pressable
//                                 style={[styles.button, styles.buttonConfirm]}
//                                 onPress={deleteNote}>
//                                 <Text style={styles.textConfirm}>Delete</Text>
//                             </Pressable>
//                             <Pressable
//                                 style={[styles.button, styles.buttonCancel]}
//                                 onPress={() => {

//                                     setModalVisible(!modalVisible)

//                                 }}>
//                                 <Text style={styles.textCancel}>Cancel</Text>
//                             </Pressable>
//                         </View>

//                     </View>
//                     {/* </View> */}
//                 </Modal>
//                 <View style={styles.loading}>
//                     {loading ? <ActivityIndicator size="large" color="#00ff00" /> : null}
//                 </View>
//                 <View style={styles.date}>
//                     <Text style={styles.date_text}>{month}{' '} {day} </Text>
//                     <View style={styles.dot}></View>
//                     <Text style={styles.date_text}>{timeCreated}</Text>
//                 </View>
//                 <View><Text style={styles.title}>{title}</Text>
//                 </View>
//                 <View style={styles.containerStyles}>
//                     <FlatList
//                         data={fields}
//                         keyExtractor={item => item.id}
//                         // contentContainerStyles={styles.containerStyles}
//                         // onViewableItemsChanged={onViewChanged }
//                         renderItem={renderItem}
//                     />
//                 </View>



//                 <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>
//             </View>
//             <View style={styles.modify_image}>
//                 <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('KeyPoint', {
//                     note: route.params.note
//                 })}>
//                     <Image style={styles.edit_image}
//                         source={require("../../../../assets/images/edit.png")}
//                     />
//                 </TouchableOpacity>
//                 <TouchableOpacity activeOpacity={.5}
//                     onPress={handleDelete}
//                 >
//                     <Image style={styles.delete_image}
//                         source={require("../../../../assets/images/trash.png")}
//                     />
//                 </TouchableOpacity>
//             </View>
//         </>
//     );
// };

// export default DisplayTodoList;

// const styles = StyleSheet.create({
//     /********************************/
//     /* styles for html tags */


//     div: {
//         fontFamily: "monospace",
//     },
//     p: {
//         fontSize: 30,
//     },
//     /*******************************/
//     container: {
//         flex: 1,
//         paddingTop: 40,
//         backgroundColor: "#FDFDFD",
//         paddingHorizontal: 24,

//     },

//     containerStyles: {
//         // backgroundColor : 'purple',
//         marginBottom: -150,
//     },
//     editor: {
//         backgroundColor: "black",
//         borderColor: "black",
//         // borderWidth: 1,
//     },
//     rich: {
//         flex: 1,
//         minHeight: 100,
//         backgroundColor: 'red'
//     },
//     richBar: {
//         height: 150,
//         backgroundColor: "blue",
//         // paddingTop : 80,
//         fontSize: 10,
//         // marginBottom: -60,
//     },

//     eye: {
//         // backgroundColor: 'green',
//         // position :'absolute',
//         // zIndex : 1,
//         marginTop: '50%',
//         width: '100%',
//         // height : 40,



//     },

//     text: {
//         fontWeight: "bold",
//         fontSize: 20,
//     },
//     textInput: {
//         borderLeftColor: '#FFFFFF',
//         borderRightColor: '#FFFFFF',
//         borderTopColor: '#FFFFFF',
//         borderBottomColor: '#D5D5D6',
//         borderWidth: 1,

//     },

//     textInputnote: {
//         borderLeftColor: '#FFFFFF',
//         borderRightColor: '#FFFFFF',
//         borderTopColor: '#FFFFFF',
//         borderBottomColor: '#D5D5D6',
//         borderWidth: 1,
//         // backgroundColor :'yellow',
//         color: '#57575B',
//         width: '100%',

//     },
//     tib: {
//         textAlign: "center",
//         color: "#515156",
//     },

//     btn_done: {
//         // flex : 2,
//         marginTop: 20,
//         // backgroundColor : '#D5F4E2',
//         alignSelf: 'flex-end',
//         width: 136,
//         height: 48,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,

//     },


//     dot: {
//         borderRadius: 20,
//         height: 5,
//         width: 5,
//         backgroundColor: '#000000',
//         marginTop: 6,
//         marginRight: 10,
//         marginBottom: 20,

//     },

//     date: {
//         flexDirection: 'row',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start'
//     },

//     date_text: {
//         fontStyle: 'normal',
//         fontWeight: '400',
//         fontSize: 12,
//         lineHeight: 18,
//         marginRight: 10,
//     },


//     keypoint: {
//         flexDirection: 'row',
//         // backgroundColor : 'purple'
//     },

//     checkbox: {
//         marginTop: 10,
//         width: 24,
//         height: 24,
//         backgroundColor: '#878696',
//         borderRadius: 7,
//         marginRight: 10
//     },




//     btn_done_text: {
//         fontWeight: '500',
//         fontSize: 16,
//         lineHeight: 24,
//         color: '#FFFFFF',

//     },
//     title: {
//         fontWeight: '800',
//         fontSize: 16,
//         lineHeight: 24,
//         color: '#57575B',
//         marginBottom: 10,


//     },

//     modify_image: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         padding: 20,
//         paddingLeft: 50,
//         paddingRight: 50,

//         backgroundColor: '#FDFDFD',
//         // width:"100%",
//         height: 64,
//         borderTopColor: '#D5D5D6',
//         borderWidth: 1,
//         borderBottomColor: '#FFFFFF',


//     },

//     edit_image: {
//         width: 24,
//         height: 24,
//     },

//     delete_image: {
//         width: 24,
//         height: 24,
//     },
//     loading: {
//         // flex: 1,
//         // justifyContent: "center",
//         // alignItems:'center',
//         marginTop: '80%',
//         marginLeft: 182,
//         position: 'absolute',
//         zIndex: 1,
//     },

//     active: {
//         backgroundColor: '#2DC86D'
//     },
//     inactive: {
//         backgroundColor: '#D5F4E2'

//     },

//     modalView: {
//         marginTop: "82%",
//         backgroundColor: '#FDFDFD',
//         // borderTopLeftRadius: 20,
//         // borderTopRightRadius: 20,
//         borderRadius: 20,
//         borderWidth: 1,
//         borderColor: "#0F0E2D",
//         padding: 35,

//         height: 150,
//         marginLeft: 12,
//         marginRight: 12,
//         // alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     btnGroup: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 40,

//     },
//     button: {
//         borderRadius: 8,
//         padding: 10,
//         // elevation: 2,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 136,
//     },
//     buttonConfirm: {
//         backgroundColor: '#FDFDFD',
//         borderColor: '#AA0A0A',
//         borderWidth: 1,
//     },
//     buttonCancel: {
//         backgroundColor: '#2DC86D',
//     },
//     textCancel: {
//         color: '#FFFFFF',
//         fontWeight: '700',
//         textAlign: 'center',
//         lineHeight: 20,
//         fontSize: 14,


//     },
//     textConfirm: {
//         color: '#AA0A0A',
//         fontWeight: '700',
//         textAlign: 'center',
//         fontSize: 14,
//         lineHeight: 20,


//     },
//     modalText: {
//         textAlign: 'center',

//         fontWeight: "400",
//         fontSize: 16,
//         lineHeight: 24,
//         marginBottom: 20,
//         // paddingBottom:24,

//         color: '#57575B',

//     },
//     modalHeading: {
//         textAlign: 'center',

//         fontWeight: "800",
//         fontSize: 16,
//         lineHeight: 24,
//         marginBottom: 15,
//         color: '#030309',

//     },
// });

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
import Pad from '../../../components/NotesDisplay.js';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  profileAccountSuccess,
  profileAccountError,
} from '../../../../redux/actions'
import { setCurrentUser, getCurrentUser, setCurrentVault } from '../../../helpers/Utils';
import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
import { connect, useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from "@react-navigation/native";
import CheckBox from '@react-native-community/checkbox';


const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;
console.log('authEndpoint',authEndpoint)




const AllNotes = ({ currentUser, navigation }) => {
  const swiper = useRef(null);
  const [showButton] = useState([1]);
  const [search, setSearch] = useState('');
  const searchInputRef = createRef();
  const [firstName, setFirstName] = useState('')
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [searchNotes, setSearchNotes] = useState([]);
  const [profileImage, setProfileImage] = useState('http://res.cloudinary.com/dkwcn5tre/image/upload/v1672350173/profileImage/sf9cfeacmfzkrisdjxxr.png');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unVerify, setunVerify] = useState(false);
  const [isSelected, setSelection] = useState(true);

  useEffect(() => {




    if (isFocused) {

      loadProfile();

    }
  }, [isFocused]);


  const loadProfile = async () => {
    const storageUser = await getCurrentUser();
    const access_token = storageUser.access_token
    axios({
      url: `${authEndpoint}profile/get-profile/?timestamp=${new Date().getTime()}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`,

      },
    })
      .then((response) => {
        dispatch(profileAccountSuccess(response.data));
        setFirstName(response && response.data && response.data.firstName)
        setProfileImage(response && response.data && response.data.profileImage)

      }).catch((error) => {

      }
      );
  }

  function searching() {
    const newNotes = notes.filter((item) => item.title.includes(search))
    setSearchNotes(newNotes)
  }

  useEffect((item) => {
    searching();
  }, [search])



  //   useEffect(() => {
  //     loadNotes()
  //     const subscribe = navigation.addListener('focus', () => {
  //       loadNotes();
  //     });

  //     return subscribe;
  //   }, [])

  //   async function loadNotes() {
  //     const storageUser = await getCurrentUser();
  //     const access_token = storageUser.access_token
  //     axios({
  //       url: `${authEndpoint}note/get-all-notes?search=/?timestamp=${new Date().getTime()}`,
  //       method: 'get',
  //       headers: {
  //         Accept: 'application/json',

  //         'content-type': 'application/json',
  //         Authorization: `Bearer ${access_token}`,

  //       },
  //     }).then(({ data }) => {
  //       setNotes(data);
  //       setLoading(false);
  //     })
  //       .catch((e) => {
  //         if (e && e.response && e.response.data && e.response.data.error) {

  //         } else {

  //           setError('An error occurred while Loading Notes, please try again later.');
  //         }
  //         setLoading(false);
  //       });
  //   }

  return (
    <View style={styles.container} >
      {/* <View style={styles.loading}>

        {loading && <ActivityIndicator size="large" color="#00ff00" />}
      </View> */}
      {!loading && !notes.length && (<>

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
        <View style={styles.empty_note}>
          <Image style={styles.image}
            source={require("../../../../assets/images/emptynote.png")}
          />
        </View>
        <Text style={styles.no_note_header}>
          You have no To-do list        </Text>

        <Text style={styles.no_note_text}>
          To-do entries would show up here. Tap on the button to create a To-do list.        </Text>

        <View style={styles.sizedbox2}>
        </View>
        <Pressable style={styles.btn_create_note}
          onPress={() => navigation.navigate('BlankTodo')}
        >
          <Text style={styles.btn_create_note_text}>
            Create To-do list          </Text>
        </Pressable>
      </>)}


      <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>

      {/* {!loading && */}
      {notes && notes.length === 0 && <>
        <Pressable style={styles.add_note}
          onPress={() => navigation.navigate('BlankTodo')}
        >
          <Icon style={styles.image} name='pluscircle' size={50} color='#2DC86D'
          />
        </Pressable>


        {/* <View style={styles.sizedboxsearch}>
        </View> */}

        {/* 
        <View style={styles.search}>
          <Image style={styles.profile_image}
            source={{ uri: profileImage }}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Search notes"
            ref={searchInputRef}
            onChangeText={(word) => setSearch(word)}
          >
          </TextInput>
        </View> */}

        <View
          style={styles.topmenuicon}
        >
          <Pressable style={styles.topnav}
            //   onPress={() => navigation.navigate('Templates')}
            onPress={() => console.log("clicked menu")}
          >

            <Image style={styles.menuimage}
              source={require("../../../../assets/images/todomenu.png")}
            />
          </Pressable>

          <View style={styles.searching}>
            <Pressable style={styles.topnav}
              //   onPress={() => navigation.navigate('Templates')}
              onPress={() => console.log("clicked  search ")}

            >

              <Image style={styles.todosearch}
                source={require("../../../../assets/images/todosearch.png")}
              />
            </Pressable>



            <Pressable style={styles.topnav}
              //   onPress={() => navigation.navigate('Templates')}
              onPress={() => console.log("clicked notification")}

            >

              <Image style={styles.todonotification}
                source={require("../../../../assets/images/notifications.png")}
              />
            </Pressable>
          </View>


        </View>


        <View style={styles.sizedbox2}>
        </View>

        <View style={styles.caroselgroup}>
          <ScrollView horizontal={true}>


            <View style={styles.carosel}>
              <View style={styles.caroselbody}>

                <Text style={styles.bodytext}>
                  What activities help me to connect with members of communities to which I belong?
                </Text>

              </View>
              <Text style={styles.caroselText}>My network</Text>


            </View>

            <View style={styles.caroselblue}>
              <View style={styles.caroselbody}>

                <Text style={styles.bodytext}>
                  What are the things I have decided to never do because of  how they would negatively impact my life?            </Text>

              </View>
              <Text style={styles.caroselText}>My not to do list</Text>


            </View>

            <View style={styles.caroselorange}>
              <View style={styles.caroselbody}>

                <Text style={styles.bodytext}>
                  Things I want to achieve in 1 week. What is my goal for the week?            </Text>

              </View>
              <Text style={styles.caroselText}>Goal for the week</Text>


            </View>
          </ScrollView>
        </View>


        <View style={styles.sizedbox}></View>


          <ScrollView>
        <View style={styles.todogroup}>


            <View style={styles.todo}>
              <View style={styles.tododate}>
                <Text style={styles.tododatetext}>Today</Text>

              </View>
              <TouchableOpacity activeOpacity={.5}
              // onPress={handleDelete}
              >

                <Image style={styles.edit_image}
                  source={require("../../../../assets/images/edit.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.todotype}>Work</Text>

            <View style={styles.todolist} >
              <View style={styles.check}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                  boxType="square"
                  tintColor="#CFCFD5"
                  onCheckColor="#FFFFFF"
                  onFillColor="#2DC86D"
                  onTintColor="#2DC86D"
                />
                <Text style={styles.completed}>
                  Submit complete documents                                </Text>
              </View>
            </View>

            <View style={styles.todolist} >
              <View style={styles.check}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                  boxType="square"
                  tintColor="#CFCFD5"
                  onCheckColor="#FFFFFF"
                  onFillColor="#2DC86D"
                  onTintColor="#2DC86D"
                />
                <Text style={styles.completed}>
                  Lunch                                </Text>
              </View>
            </View>


            <View style={styles.todolist} >
              <View style={styles.check}>
                <CheckBox
                  value={!isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                  boxType="square"
                  tintColor="#CFCFD5"
                  onCheckColor="#FFFFFF"
                  onFillColor="#2DC86D"
                  onTintColor="#2DC86D"
                />
                <Text style={styles.notcompleted}>
                  Submit complete documents                                </Text>
              </View>
            </View>

        </View>

        <View style={styles.todogroup}>



          <View style={styles.todo}>
            <View style={styles.tododate}>
              <Text style={styles.tododatetext}>Yesterday</Text>

            </View>
            <TouchableOpacity activeOpacity={.5}
            // onPress={handleDelete}
            >

              <Image style={styles.edit_image}
                source={require("../../../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.todotype}>Work</Text>

          <View style={styles.todolist} >
            <View style={styles.check}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                boxType="square"
                tintColor="#CFCFD5"
                onCheckColor="#FFFFFF"
                onFillColor="#2DC86D"
                onTintColor="#2DC86D"
              />
              <Text style={styles.completed}>
                Submit complete documents                                </Text>
            </View>
          </View>

          <View style={styles.todolist} >
            <View style={styles.check}>
              <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                boxType="square"
                tintColor="#CFCFD5"
                onCheckColor="#FFFFFF"
                onFillColor="#2DC86D"
                onTintColor="#2DC86D"
              />
              <Text style={styles.completed}>
                Lunch                                </Text>
            </View>
          </View>


          <View style={styles.todolist} >
            <View style={styles.check}>
              <CheckBox
                value={!isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
                boxType="square"
                tintColor="#CFCFD5"
                onCheckColor="#FFFFFF"
                onFillColor="#2DC86D"
                onTintColor="#2DC86D"
              />
              <Text style={styles.notcompleted}>
                Submit complete documents                                </Text>
            </View>

          </View>
          
        </View>
        </ScrollView>

        {/* <FlatList
          data={searchNotes.length !== 0 ? searchNotes : notes}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Pad notePad={item} />}
        /> */}
      </>}

    </View>


  )
}


const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;

  return { currentUser };
};

export default connect(mapStateToProps, {
})(AllNotes);