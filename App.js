/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React,{useState,useEffect} from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import IconEnto from 'react-native-vector-icons/Entypo';
import IconMenu from 'react-native-vector-icons/Entypo';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';




import { configureStore } from './redux/store';
import { Provider ,connect, useDispatch,useSelector} from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Todo from './src/screens/Main/CreateTodo/todo';
import Todos from './src/screens/Main/CreateTodo/todo';
import Todosort from './src/screens/Main/CreateTodo/todo';


import CreateTodoList from './src/screens/Main/CreateTodo/CreateTodoList';











const TodoName = 'Todo';
const Todoedit = 'Todosort';

const Tab = createBottomTabNavigator();


const TabStackScreen = () => (
  <Tab.Navigator
    initialRouteName={TodoName}
    screenOptions={{ headerStyle: { backgroundColor: '#2DC86D', height: 0, } }}

   
  >
    <Tab.Screen name={TodoName} component={Todos}
      options={{
        title: '',
        tabBarActiveTintColor: "#2DC86D",
        tabBarInactiveTintColor: "#AFAFB9",
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarOptions: {
          activeTintColor: '#2DC86D',
          inactiveTintColor: '#AFAFB9',
          labelStyle: {marginTop:20, fontSize: 50 },

        },
        tabBarIcon: ({ size, focused, color }) => {

          let colour = focused ? "#2DC86D" : '#AFAFB9';
          return (
            <IconEnto style={styles.image} name='menu' size={30} color='#000000'
            />
            
            //       <Image
            //   style={{ width: 24, height: 24 }}
            //   source={focused ? require("./assets/images/todomenu.png") : require("./assets/images/todomenu.png")}

            // />
          );
        },
      }}
    />
     <Tab.Screen name={Todoedit} component={Todosort}
      options={{
        title: '',
        tabBarActiveTintColor: "#2DC86D",
        tabBarInactiveTintColor: "#AFAFB9",
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarOptions: {
          activeTintColor: '#2DC86D',
          inactiveTintColor: '#AFAFB9',
          labelStyle: { padding: 50, fontSize: 50 ,marginLeft:50},

        },
        tabBarIcon: ({ size, focused, color }) => {

          let colour = focused ? "#2DC86D" : '#AFAFB9';
          return (
            <IconEnto style={styles.image} name='dots-three-horizontal' size={30} color='#000000'
          />
            // <Image
            //   style={{ width: 50, height: 4 , }}
            //   source={focused ? require("./assets/images/threedot.png") : require("./assets/images/threedot.png")}

            // />
          );
        },
      }}
    />


  </Tab.Navigator>
)

const MainStack = createNativeStackNavigator();
const MainStackScreens = () => (



  <MainStack.Navigator headerMode={null} initialRouteName="Todos"
    screenOptions={{
      animationEnabled:  false ,
      header: ({ navigation, options }) =>
      (<>
        {console.log("navigation,options menu", { navigation, options })}
        <View style={{
          display: 'flex', flexDirection: 'row', height: 50, paddingLeft: 30, paddingTop: 10, backgroundColor: '#FFFFFF', color: "red"
        }}>
            <Pressable
              onPress={navigation.goBack}
            >

   {/* <Image
            style={{ width: 24, height: 24 , }}

            source={require("./assets/images/backicon.png")}

          /> */}
            </Pressable>

          <Text style={options.space ? { color: '#000000', marginLeft: '35%' } : { color: '#000000', marginLeft: '40%' } }>{options.title}</Text>
        </View>
      </>
      ),
    }}
  >
   
    <MainStack.Screen name="Todo" component={TabStackScreen} options={{ title: '' }}
    />
  
  <MainStack.Screen name="CreateTodoList" component={CreateTodoList} options={{ title: 'Todo' }}
    />



  </MainStack.Navigator>
);



const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };





  return (
    <Provider store={configureStore()}>
        <NavigationContainer>
            <MainStackScreens />
        </NavigationContainer>   
    </Provider>

  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  profile_image:{
    width:64,
    height:64,
    borderRadius:50,
  },
  name:{
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    color: "#57575B",
  },
  username:{
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
    color: "#57575B", 
  },
  email:{
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
    color: "#57575B", 
  },
  topnavmenu: {
    backgroundColor: '#FFFFFF',
},

topmenuicon: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    height: 31,
    // marginTop: 80,
    paddingHorizontal: 24,
    backgroundColor: "#FDFDFD",
},



menuimage: {
    width: 32,
    height: 32,

},



searching: {
    display: "flex",
    flexDirection: "row",
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
});


export default App
