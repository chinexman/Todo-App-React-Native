import React, { useLayoutEffect, useState, createRef } from "react";
import {
  StyleSheet, Text, TextInput, View, Pressable, Image
} from "react-native";
import {
  todolistsSuccess
} from '../../../../redux/actions'
import { connect, useDispatch, useSelector } from 'react-redux';



const CreateTodoList = ({ route, navigation }) => {

  const todoList = useSelector((state) => state.todolists.currentTodolists)
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const [title, setTitle] = useState('');
  const [enable, setEnable] = useState(false);
  const titleInputRef = createRef();




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
          <Pressable style={{ marginLeft: '20%' }} onPress={saveTodo}><Text style={[{ fontWeight: '700', fontSize: 16, lineHeight: 24 }, enable ? styles.active : styles.inactive]}>Done</Text></Pressable>
        </View>
      </>
      ),
    });
  }, [title]);

  function saveTodo() {
    if (!title.length) {
      return;
    }
    const trimmedTitle = title.trim();

    const fd = {

      title: trimmedTitle.trim(),

    }

    console.log("fd todo list ", fd)

    const values = [...todoList];
    const newvalue = { todolist: trimmedTitle, id: values.length };
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


  active: {
    color: '#1e93e7'
  },
  inactive: {
    color: '#D5F4E2'

  },
});