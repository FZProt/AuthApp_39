import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
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
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";
import { getData, getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
  const postinput = React.createRef();
  const [myPost, setMyPost] = useState("");
  const [posts, setPosts] = useState([]);
  //const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    const postArray = await getDataJSON('posts');
    if (postArray != null) {
      setPosts(postArray);
    }
  };

  // const loadUsers = async () => {
  //   const response = await getUsers();
  //   if (response.ok) {
  //     setUsers(response.data);
  //   }
  //   setLoading(false);
  // };
  // const getName = (id) => {
  //   let Name = "";
  //   users.forEach((element) => {
  //     if (element.id == id) Name = element.name;
  //   });
  //   return Name;
  // };

  useEffect(() => {
    loadPosts();
    //loadUsers();
  }, []);

  if (!loading) {
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
                  } catch (error) {
                    // Error saving data
                  }
                };
                updatePostArray(currentUserPost);
                
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
                  />
                );
              }}
            />
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
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
