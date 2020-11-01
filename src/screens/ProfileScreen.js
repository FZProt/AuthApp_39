import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header, Image } from "react-native-elements";
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../providers/AuthProvider";
import { getDataJSON, removeData } from "../functions/AsyncStorageFunctions";

const ProfileScreen = (props) => {
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
          
            <View style={{flexDirection: "column", alignItems: "center" }}>
            <Image style={styles.imageStyle} source = {require('./../../assets/dp.jpg')} />
              <Text style={styles.textStyle} >{auth.CurrentUser.name}</Text>
              <Button
              icon={<MaterialIcons name="delete" size={24} color="white" />}
              title="  Delete Profile!"
              type="solid"
              onPress={function () {
                removeData(auth.CurrentUser.email);
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
            
            <Text style={styles.textStyle} >Born on: {auth.CurrentUser.dob}</Text>
            <Text style={styles.textStyle} >Address: {auth.CurrentUser.address}</Text>
            <Text style={styles.textStyle} >Works at: {auth.CurrentUser.work}</Text>
            </View>
          
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
  textStyle:{
    fontSize: 20,
    color: 'black',
    margin: 15,
    marginBottom: 0,
    //backgroundColor: "",
  },
  imageStyle: {
    height: 203,
    width: 124,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 30
},
});

export default ProfileScreen;
