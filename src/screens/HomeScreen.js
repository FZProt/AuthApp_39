import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import moment from 'moment';
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import {  getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
  const postinput = React.createRef();
  const [myPost, setMyPost] = useState("");
  const [posts, setPosts] = useState([]);
  
  const loadPosts = async () => {
    const postArray = await getDataJSON('posts');
    if (postArray != null) {
      setPosts(postArray);      
    }
  };


  useEffect(() => {
    loadPosts();
  }, []);


  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Header
            leftComponent={{
              icon: "menu",
              color: "#fff",
              onPress: function () {
                props.navigation.toggleDrawer();
              },
            }}
            centerComponent={{ text: "The Office", style: { color: "#fff" } }}
            rightComponent={{
              icon: "lock-outline",
              color: "#fff",
              onPress: function () {
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              },
            }}
          />
          <Card>
            <Input
              ref={postinput}              
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={ function(currentInput) {
                setMyPost(currentInput);
              }}
            />
            <Button title="Post" type="outline" onPress={function () {              
              let saveLikeData = async (post) =>{
                await storeDataJSON(post,0);
              }
              saveLikeData(myPost);
              let currentUserPost = {
                email: auth.CurrentUser.email,
                name: auth.CurrentUser.name,
                time: moment().utcOffset('+06:00').format('YYYY-MM-DD hh:mm:ss a'),
                post: myPost,
              };
              let updatePostArray = async (currentUserPost) => {
                let postsArray = [];
                try {
                  let storedPosts = await AsyncStorage.getItem('posts');
                  if (storedPosts !== null) {
                    postsArray = JSON.parse(storedPosts);
                  }
                  postsArray.push(currentUserPost)
                  await AsyncStorage.setItem('posts', JSON.stringify(postsArray));
                  setPosts(postsArray);
                } catch (error) {
                  // Error saving data
                }
              };
              updatePostArray(currentUserPost);              
              //console.log(currentUserPost);
              postinput.current.clear();
            }}
            />
          </Card>

          <FlatList
            data={posts}
            renderItem={function ({ item }) {
              return (
                <PostCard
                  author={item.name}
                  title={item.time}
                  body={item.post}
                  props={props}
                />
              );
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
