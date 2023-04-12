import React, { useLayoutEffect, useRef, useState, createRef, useEffect } from "react";
import {
  StyleSheet, Text, TextInput, ScrollView, View, Pressable, Image, ActivityIndicator, Alert, TouchableWithoutFeedback
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'

import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";

import HTMLView from "react-native-htmlview";
import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button, Colors, Snackbar, Subheading } from 'react-native-paper';
import axios from 'axios';
import { setCurrentUser, getCurrentUser, setCurrentVault } from '../../../helpers/Utils';
import Icon from 'react-native-vector-icons/Feather';

const authEndpoint = "https://note-taking-app-backend-i3rt.onrender.com/"
// const authEndpoint = process.env.REACT_APP_AUTHENDPOINT;
console.log('authEndpoint',authEndpoint)

const TodoListEdit = ({ route, navigation }) => {
  const strikethrough = require("../../../../assets/images/icons/google.png"); //icon for strikethrough
  const video = require("../../../../assets/images/icons/linkln.png"); //icon for Addvideo
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");
  const [content, setContent] = useState(route.params && route.params.note ? route.params.note.note[0] : '');
  const [error, setError] = useState('')
  const [templateType] = useState('BLANK');

  const [loading, setLoading] = useState(false);
  const [enable, setEnable] = useState(false);
  const [access_token, setAccessToken] = useState("");
  const eventInputRef = createRef();
  const titleInputRef = createRef();
  const speakerInputRef = createRef();



  useLayoutEffect(() => {
    navigation.setOptions({
      header: () =>
      (<>
        <View style={{
          display: 'flex', flexDirection: 'row', height: 50, paddingLeft: 30, paddingTop: 10, marginTop: 40, backgroundColor: '#FFFFFF', color: "red"
        }}>
          <Pressable
            onPress={navigation.goBack}
          >

            <Image
              style={{ width: 24, height: 24, }}

              source={require("../../../../assets/images/backicon.png")}

            />
          </Pressable>
          <Text style={{ color: '#000000', marginLeft: '35%', marginTop: 3 }}>Notes</Text>
          <Pressable disabled={loading} style={{ marginLeft: '30%' }} onPress={saveNote}><Text style={{ color: '#2DC86D', fontWeight: '700', fontSize: 16, lineHeight: 24 }}>Done</Text></Pressable>
        </View>
      </>
      ),
    });
  }, [content, access_token]);

  useEffect(() => {

    const getToken = async () => {
      const storageUser = await getCurrentUser();
      setAccessToken(storageUser && storageUser.access_token)
    }
    getToken();

  }, [])

  const handleContentChange = (text) => {
    if (text !== null) {
      setEnable(true)
    }
    setContent(text)
  }
  const handleChange = (event, text) => {

    if (text === '') {
      setEnable(false)
    }
    if (!text) {
      setEnable(false)
    }

    if (text !== null) {
      setEnable(true)
    }


    if (event === "event") {
      setEvent(text)
    } else if (event === "title") {
      setTitle(text)
    } else if (event === 'speaker') {
      setSpeaker(text)
    }

  }

  function saveNote() {
    console.log("content", content)
    const trimmedContent = content.trim();

    console.log('trimmedContent', trimmedContent.length);
    console.log('[trimmedContent]', trimmedContent[0]);


    if (!trimmedContent.length) {
      setError('Please fill content');
      return;
    }

    const replaceHTML = trimmedContent.replace(/<(.|\n)*?>/g, "")
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "");
    const blanktitle = replaceWhiteSpace.substring(0, 40)
    const newtitle = blanktitle;
    const noteArray = [];
    noteArray.push(trimmedContent)
    const fd = {
      title: newtitle,
      note: noteArray,
      templateType,

    }
    setLoading(true)
    axios({
      method: 'patch',
      url: `${authEndpoint}note/update-note` + '/' + route.params.note._id,
      data: fd,
      headers: {
        Accept: 'application/json',

        'content-type': 'application/json',
        Authorization: `Bearer ${access_token}`,

      },

    }).then((response) => {

      setLoading(false)
      Alert.alert("", response.data.message)
      navigation.navigate('Notes');
    })
      .catch((e) => {
        if (e && e.response && e.response.data && e.response.data.error) {
          setError(e.response.data.message);
        } else {

          setError('An error occurred, please try again later.');
        }
        setLoading(false);
      })
  }






  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);


  }

  function focusing() {
    RichText.current?.onFocus()
  }

  function typing() {
    RichText.current?.scrollTo({ y: scrollY - 30, duration: 100, animated: true })
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  function insertVideo() {
    // you can easily add videos from your gallery
    RichText.current?.insertVideo(
      "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    );
  }

  return (
    <>

      <TouchableWithoutFeedback onPress={() => RichText.current?.dismissKeyboard()}>

        <View style={styles.container}>

          <View style={styles.loading}>

            {loading && <ActivityIndicator size="large" color="#00ff00" />}
          </View>

          <KeyboardAwareView animated={false}
          >
            <TouchableWithoutFeedback onPress={() => focusing}>

              <RichEditor
                disabled={false}
                containerStyle={styles.editor}
                useContainer={false}

                ref={RichText}
                initialFocus={true}
                placeholder={"Type here"}
                onChange={(text) => handleContentChange(text)}
                initialContentHTML={content}
                onHeightChange={handleHeightChange}

              />
            </TouchableWithoutFeedback>
            <RichToolbar
              editor={RichText}
              selectedIconTint={"#2DC86D"}

              actions={[
                ...defaultActions,
                actions.heading1,
              ]}

            />

          </KeyboardAwareView>
          <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>

        </View>
      </TouchableWithoutFeedback>

    </>
  );
};

export default TodoListEdit;

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
    backgroundColor: "#FDFDFD",
    paddingHorizontal: 24,
    paddingTop: 20,

  },
  container1: {
    flex: 1,


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
    alignSelf: 'flex-end'
  },
  editor: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
  },
  rich: {
    flex: 1,
    height: 400,

  },

  richexpand: {
    flex: 1,
    minHeight: 600,
  },
  richBar: {
    height: 150,
    fontSize: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },

  textInput: {
    backgroundColor: '#FDFDFD',
    borderWidth: 1,
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderBottomColor: '#D5D5D6',



    height: 40,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
  },

  btn_done: {
    marginTop: 20,
    backgroundColor: '#D5F4E2',
    alignSelf: 'flex-end',
    width: 136,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,

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
    backgroundColor: '#2DC86D'
  },
  inactive: {
    backgroundColor: '#D5F4E2'

  },

});