import React, { useState, useEffect } from "react";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
  } from "react-native";
  import {
    Card,
    Button,
    Input,
    Header,
  } from "react-native-elements";
  import PostCard from "../components/PostCard";
  import { Entypo, AntDesign, FontAwesome } from "@expo/vector-icons";
  import { AuthContext } from "../providers/AuthProvider";


  const PostScreen = (props) =>  {
    return(
    
        <View style={styles.containerStyle}>  
             
             
            
             
             <AntDesign name="like2" size={27} color="black" style={styles.likeStyle} />
             <FontAwesome name="comments-o" size={27} color="black"  style={styles.commentStyle}/>
             <Text style={styles.likeTextStyle} >     Likes</Text>
             <Text style={styles.commentTextStyle}> Comments</Text>
             
  
             <Input
                
                  inputStyle={{color:"black"}}
                                  
                  placeholder="Write Something"
                
                  multiline={true}
                  
                  placeholderTextColor="black"
                  
                  inputContainerStyle={styles.inputStyle}
                  leftIcon={<Entypo name="pencil" size={24} color="black" />}
                  /*onChangeText={function (currentInput) {
                     setCurrentInputText(currentInput)
                  }}*/
                />
               <FontAwesome name="arrow-circle-right" size={30} color="dodgerblue" style={{marginHorizontal:200,marginBottom:20}}
              
               />
        </View>
      )
  }
  
  const styles=StyleSheet.create({
     
      inputStyle:{
  
          color:"#c08401",
          borderColor:"#c08401",
          marginHorizontal:20,
          marginTop:10,
      },
      containerStyle:{
          marginTop:20,
        flex: 1,
        backgroundColor: '#D9D2D2'
          , 
      },
      likeTextStyle:{
          marginBottom:10,
          fontSize:14,
          fontFamily:'serif',
          color:"black",
          
          width:60,
          left:30,
          position:"absolute",
          bottom:0
      },
      commentTextStyle:{
          marginBottom:10,
          fontSize:14,
          fontFamily:'serif',
          color:"black",
          
          width:90,
          right:36,
          position:"absolute",
          bottom:0
      },
     
      commentStyle:{
          position:'absolute',
          bottom:10,
          right:10,
          marginBottom:0,
          
      },
      likeStyle:{
          position: 'absolute',
          marginBottom:10,
          bottom:0,
          width:36,
          left:10
      },
  })
  
  export default PostScreen;