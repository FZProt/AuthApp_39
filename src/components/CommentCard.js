import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { getDataJSON, removeData, storeDataJSON } from "../functions/AsyncStorageFunctions";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";

const CommentCard = (props) => {

  const deleteComment = async () => {
    alert('Button Long Pressed');
  };

  return (
    <TouchableOpacity
    onLongPress={deleteComment}
    activeOpacity={0.6}
    >
      <Card>      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{ fontStyle: "italic" }}> Commented on {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
        
      </Text>     
    </Card>
    </TouchableOpacity>
  );
};

export default CommentCard;
