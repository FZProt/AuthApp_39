import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { getDataJSON, removeData, storeDataJSON } from "../functions/AsyncStorageFunctions";
import { TouchableOpacity } from "react-native-gesture-handler";
import _ from "lodash";

const PostCard = (props) => {

  const [likeCount, setLikeCount] = useState("");
  const deletePost = async () => {
    alert('Button Long Pressed');
  };

  const loadLikes = async () => {
    const likeCount = await getDataJSON(props.body);
    setLikeCount("Like("+likeCount+")");     
  };

  useEffect(() => {
    loadLikes();
  }, []);

  return (
    <TouchableOpacity
    onLongPress={deletePost}
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
      <Text style={{ fontStyle: "italic" }}> Posted on {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
        
      </Text>
      <Card.Divider />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          type="outline"
          title={likeCount}
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
          onPress={function (){
            let updateLikeCount = async() => {
              let c = await getDataJSON(props.body);
              c = c+1;
              await storeDataJSON(props.body,c)
              c = "Like("+c+")";
              setLikeCount(c);
            }
            updateLikeCount();            
          }}
        />
        <Button type="solid" title="{comment}"
        onPress={function(){props.props.navigation.navigate('Post')}} />
      </View>
    </Card>
    </TouchableOpacity>
  );
};

export default PostCard;
