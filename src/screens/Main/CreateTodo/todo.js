import React, { useState, createRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import styles from './styles-todo';
import {
  todosSuccess
} from '../../../../redux/actions'
import { connect, useDispatch, useSelector } from 'react-redux';
import TodoItem from '../../../components/TodoItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';







const AllTodos = ({ navigation, route }) => {

  const todos = useSelector((state) => state.todos.currentTodos)
  const todoList = useSelector((state) => state.todolists.currentTodolists)
  const dispatch = useDispatch();


  const [modalVisible, setModalVisible] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [starCompleted, setStarCompleted] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(true)
  const [details, setDetails] = useState("");
  const [title, setTitle] = useState("");
  const [barIndex, setBarIndex] = useState(0)

  const titleInputRef = createRef();
  const detailsInputRef = createRef();

  const todosNotCompleted = todos.filter((item) => {
    return item.isCompleted === false
  })

  const todosCompleted = todos.filter((item) => {
    return item.isCompleted;
  })


  function saveTodo() {
    const trimmedTitle = title.trim();
    const trimmedDetails = details.trim();

    const values = [...todos];
    const newvalue = { todo: trimmedTitle, details: trimmedDetails, id: values.length, isCompleted, starCompleted };
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
    <View style={styles.container} >
      <View style={styles.empty_task}>
        <Text style={styles.header_text}>
        </Text>
        <Text style={styles.header}>
          Tasks
        </Text>
        <Text style={styles.header_text}>

        </Text>
      </View>
      <View style={styles.caroselgroup}>
        <ScrollView horizontal={true}>


          <FlatList
            horizontal
            data={todoList}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) =>

              <Pressable style={styles.add_note_with_text}
                onPress={() => setBarIndex(index)}

              >
                {index === 0 && <View style={styles.notebook}>
                  <Icon name='star' size={30} color='#000000'

                  /></View>}
                <View style={styles.add_note_text_group}>

                  <Text style={styles.add_list_text}>
                    {item.todolist}
                  </Text>
                  <View style={[styles.tabbar, barIndex === index ? styles.active : styles.inactive]}></View>
                </View>

              </Pressable>}

          />
          <Pressable style={styles.add_note_with_text}
            onPress={() => navigation.navigate("CreateTodoList")}
          >

            <View style={styles.add_note_text_group}>

              <Text style={styles.add_list_text}>
                + New list
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>

      {!loading && !todos.length && (<>
        <View style={styles.empty_note}>
          <Image style={styles.image}
            source={require("../../../../assets/images/notasks.jpeg")}
          />
        </View>
        <Text style={styles.no_task_header}>
          No tasks yet               </Text>

        <Text style={styles.no_task_text}>
          Add your to-dos and keep track of them across ZST Workspace
        </Text>





      </>)}


      <Snackbar visible={error.length > 0} onDismiss={() => setError('')}>{error}</Snackbar>

      {todos && todos.length > 0 && <>









        {todosNotCompleted && todosNotCompleted.length > 0 && <>
          <View style={{ height: 60 * todosNotCompleted.length }}
          >
            <ScrollView
              horizontal={true}

              contentContainerStyle={{ width: '100%' }}
            >
              <FlatList
                data={todosNotCompleted}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <TodoItem todo={item} />}
              // horizontal={true}

              />
            </ScrollView>
          </View>
        </>}

        {todosCompleted && todosCompleted.length > 0 && <>
          <View
            style={viewCompleted ? { height: 120 * todosCompleted.length } : { height: 60 }}
          >


            <View style={styles.group_completed}>
              <View style={styles.completed_header}>
                <Text style={styles.completed_header_text}>Completed({todosCompleted.length})</Text>
              </View>
              {viewCompleted ? <Icon name='chevron-up' size={30} color='#000000'
                onPress={() => setViewCompleted(!viewCompleted)}

              /> : <Icon name='chevron-down' size={30} color='#000000'
                onPress={() => setViewCompleted(!viewCompleted)}

              />}
            </View>
            {viewCompleted ?
              <ScrollView
                horizontal={true}

                contentContainerStyle={{ width: '100%' }}
              >
                <FlatList
                  data={todosCompleted}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item }) => <TodoItem todo={item} />}
                /></ScrollView> : null}

          </View>
        </>}
      </>}
      {!todosNotCompleted.length && todosCompleted.length > 0 && !viewCompleted && <>
        <View style={styles.empty_note}>
          <Image style={styles.image}
            source={require("../../../../assets/images/alltask.jpeg")}
          />
        </View>
        <Text style={styles.no_task_header}>
          All tasks completed              </Text>

        <Text style={styles.no_task_text}>
          Nice work!                 </Text>

      </>}
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
                placeholder="Add details"
                value={details}
                ref={detailsInputRef}
                onChangeText={(details) => handleChange("details", details)}
              ></TextInput>}
              <View style={styles.group_icons}>
                <View style={styles.icon_task}>
                  <Icon name='text' size={30} color='#1e93e7'
                    onPress={() => setOpenDetails(!openDetails)}

                  />
                  <Icon name='calendar-check' size={30} color='#1e93e7'
                  />
                  {starCompleted ? <Icon name='star' size={30} color='#1e93e7'
                    onPress={() => setStarCompleted(!starCompleted)}
                  /> : <Icon name='star-outline' size={30} color='#1e93e7'
                    onPress={() => setStarCompleted(!starCompleted)}
                  />}
                </View>
                <Pressable
                  onPress={saveTodo}
                ><Text style={styles.icon_color}>Save</Text></Pressable>
              </View>
            </View>
          </Pressable>
        </Modal>
      </View>

    </View>


  )
}


const mapStateToProps = ({ authUser }) => {
  const { currentUser } = authUser;

  return { currentUser };
};

export default connect(mapStateToProps, {
})(AllTodos);