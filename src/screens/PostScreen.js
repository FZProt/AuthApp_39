import React, { useState, useEffect } from "react";
import { storeDataJSON, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Button,
    Avatar,
    AsyncStorage,
} from "react-native";
import {
    Input,
} from "react-native-elements";
import moment from 'moment';
import { AuthContext } from "../providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";
import CommentCard from "../components/CommentCard";
import { Card } from "react-native-paper";

const PostScreen = (props) => {
    const commentInput = React.createRef();
    const [comments, setComments] = useState([]);
    const [myComment, setMyComment] = useState("");

    const post = props.route.params.p;
    const postAuthor = props.route.params.a;


    const loadComments = async () => {
        const commentArray = await getDataJSON('comments' + post);
        if (commentArray != null) {
            setComments(commentArray);
        }
    };


    useEffect(() => {
        loadComments();
    }, []);

    return (
        <AuthContext.Consumer>
            {(auth) => (
                <View style={styles.containerStyle}>
                    <Card>
                        <Text style={styles.textStyle}>
                            {postAuthor}
                        </Text>
                        <Text style={styles.textStyle2}>
                            {post}
                        </Text>
                    </Card>

                    <Text style={styles.textStyle3}>Comments:</Text>

                    <FlatList
                        data={comments}
                        renderItem={function ({ item }) {
                            return (
                                <CommentCard
                                    author={item.name}
                                    title={item.time}
                                    body={item.comment}
                                    props={props}
                                    post={post}

                                />
                            );
                        }}
                    />
                    <Input
                        ref={commentInput}
                        inputContainerStyle={styles.inputStyle}
                        leftIcon={<Entypo name="pencil" size={24} color="black" />}
                        placeholder="Write Something"
                        multiline={true}
                        onChangeText={function (currentInput) {
                            setMyComment(currentInput);
                        }}
                    />
                    <TouchableOpacity style={styles.buttonStyle} onPress={function () {
                        let currentUserComment = {
                            email: auth.CurrentUser.email,
                            name: auth.CurrentUser.name,
                            time: moment().utcOffset('+06:00').format('YYYY-MM-DD hh:mm:ss a'),
                            comment: myComment,
                        };
                        let updateCommentArray = async (currentUserComment) => {
                            //console.log(currentUserComment)
                            let commentsArray = [];
                            console.log("hi")
                            let storedComments = await AsyncStorage.getItem('comments' + post);
                            if (storedComments !== null) {
                                commentsArray = JSON.parse(storedComments);
                            }
                            commentsArray.push(currentUserComment)
                            console.log("hi", commentsArray)
                            await AsyncStorage.setItem('comments' + post, JSON.stringify(commentsArray));
                            setComments(commentsArray);
                        };
                        updateCommentArray(currentUserComment);
                        commentInput.current.clear();
                    }}>
                        <Text style={styles.touchableStyle}>Post</Text>
                    </TouchableOpacity>
                </View>
            )}
        </AuthContext.Consumer>

    )
}

const styles = StyleSheet.create({

    inputStyle: {

        color: "#c08401",
        //borderColor:"#c08401",
        marginHorizontal: 20,
        marginTop: 10,
    },
    containerStyle: {
        marginTop: 20,
        flex: 1,
        backgroundColor: "white",
    },
    touchableStyle: {
        fontSize: 20,
        color: 'white',
        alignSelf: "center",
    },
    buttonStyle: {
        margin: 30,
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        //paddingHorizontal: 12
    },
    textStyle: {
        fontSize: 20,
        color: 'green',
        alignSelf: "center",
        marginTop: 10,
    },
    textStyle2: {
        fontSize: 18,
        color: 'black',
        alignSelf: "center",
        marginTop: 10,
    },
    textStyle3: {
        fontSize: 20,
        color: 'green',
        //alignSelf: "center",
        marginTop: 10,
    },
})

export default PostScreen;