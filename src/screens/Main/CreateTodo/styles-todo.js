import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
console.log("style height", height)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "#FDFDFD",

    },

    sizedbox: {
        height: 40,
    },

    // sizedboxmain: {
    //     height: 50,
    //     backgroundColor:"blue"
    // },

    todolist_group:{
        backgroundColor:"green",
        height:40
    },

    group_completed:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginTop:20
    },

     completed_header_text:{
        fontWeight: "600",
        fontSize: 18,
        lineHeight: 16,
     },

  
        
       header_text:{
        textAlign:"center",
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 12,
        color: "#57575B",
        marginLeft:50,
        backgroundColor:'blue'
       },

       add_list_text:{
        fontWeight: "700",
        fontSize: 16,
        lineHeight: 14,
        color: "#57575B",
        marginLeft:20
       },

    add_list_btn:{
        // backgroundColor:'blue',
        // width:34,
        height:34,
    },
    pressadd:{
        backgroundColor:'green',
        width:34,
        height:35,
    },

    tabgroup:{
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-evenly",
        marginBottom:5
      },
    


    grouptab:{
        justifyContent:"center",
        alignItems:"center",
    },
      tab:{
        width:80,
       marginLeft:5,
       marginRight:5,
       height:30,
    
       cursor: 'pointer',
       
      },
    
      tabbar:{
        height:7,
        marginTop:10,
    
      },
    
     
    bodyText: {
        // textAlign: 'center',
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 12,
        color: "#57575B",
    },
    todo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    delete_image: {
        width: 24,
        height: 24,
    },



    todolist: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 10,
    },

    tododatetext: {
        fontWeight: "800",
        fontSize: 16,
        lineHeight: 24,
        color: "#030309",
        marginBottom: 10
    },

    edit_image: {
        width: 24,
        height: 24
    },

    todotype: {
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 21,
        color: "#57575B",
        marginBottom: 20,
        marginTop: 5,
    },

    check: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
    },

    completed: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        marginLeft: 10
    },


    notcompleted: {
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        marginLeft: 10
    },
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

    iconsearch: {
        position: 'absolute',
        zIndex: 2,
    },

    icon: {
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
        height: 270,
        justifyContent:"center",
        alignItems:"center"
    },
    image: {
        width: '50%',
        height: 220,
    

    },

    add_image:{
      width:60,
      height:60,
    
      
    },

    add_task:{
      position:'absolute',
      zIndex:1,
      marginLeft:"40%",
    justifyContent:"center",
    alignItems:"center",
    marginTop:height-180,
  
    
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
        marginTop: height - 300,
        width: 64,
        height: 64,
    },


    centeredView: {
        flex: 1,
        width:'100%',
        height:400,
        position: 'absolute',
        // alignSelf : 'flex-end' ,
        zIndex: 1,
      },
    
      modalView: {
        marginTop: height-550,
        backgroundColor: '#FDFDFD',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth:1,
        borderColor:"#0F0E2D",
        
        padding: 35,
      height:268,
      marginLeft : 3,
      marginRight:3,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      btnGroup:{
        flexDirection :'row',
        justifyContent:'space-around',
        marginBottom:40,
      },
      button: {
        borderRadius: 8,
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        width:136,
      },
      buttonConfirm: {
        backgroundColor: '#FDFDFD',
        borderColor:'#AA0A0A',
        borderWidth:1,
      },
      buttonCancel: {
        backgroundColor: '#2DC86D',
      },
      textCancel: {
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 24,
        fontSize: 16,
    
    
      },
      textConfirm: {
        color: '#AA0A0A',
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
    
    
      },
      modalText: {
        textAlign: 'center',
    
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 40,
        paddingBottom:24,
        color: '#57575B',
    
      },
      modalHeading:{
            textAlign: 'center',    
            fontWeight: "800",
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 24,
            color: '#030309',
        
      },

      icon_task:{
        width:150,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center",
      
      },

      group_icons:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      },

      modalCover:{
        flex:1,
        height: "100%",
        width: "100%",
    
      },
      modalcom: {

        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    add_note_text: {
        width: 70,
    
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 15,
        textAlign: 'center',
        color: "#57575B",
      },
      add_note_text_group: {
        marginTop: 5,
        height: 40,
      },
      add_note_with_text: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
      },

      active: {
        // backgroundColor: '#1e93e7'
        backgroundColor: '#2DC86D',

      },
      inactive: {
        backgroundColor: '#D5F4E2'
    
      },

});

export default styles;
