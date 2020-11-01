import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

const SignUpScreen = (props) => {
  const [Name, setName] = useState("");
  //const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Dob, setDob] = useState("");
  const [Address, setAddress] = useState("");
  const [Office, setOffice] = useState("");

  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to AuthApp!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        {/* <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        /> */}
        <Input
          leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
          placeholder="E-mail Address"
          onChangeText={function (currentInput) {
            setEmail(currentInput);
          }}
        />

        <Input
          leftIcon={<Entypo name="calendar" size={24} color="black" />}
          placeholder="Date of Birth"
          onChangeText={function (currentInput) {
            setDob(currentInput);
          }}
        />

        {/* <Calendar
          onChange={(date) => this.setState({date})}
          selected={this.state.date}
          // We use Moment.js to give the minimum and maximum dates.
          //minDate={Moment().startOf('day')}
          maxDate={Moment().startOf('day')}
        /> */}

        <Input
          leftIcon={<Entypo name="address" size={24} color="black" />}
          placeholder="Present Address"
          onChangeText={function (currentInput) {
            setAddress(currentInput);
          }}
        />

        <Input
          leftIcon={<MaterialCommunityIcons name="office-building" size={24} color="black" />}
          placeholder="Work at"
          onChangeText={function (currentInput) {
            setOffice(currentInput);
          }}
        />

        <Input
          placeholder="Password"
          leftIcon={<Feather name="key" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={function (currentInput) {
            setPassword(currentInput);
          }}
        />

        <Button
          icon={<AntDesign name="user" size={24} color="white" />}
          title="  Sign Up!"
          type="solid"
          onPress={function () {
            let currentUser = {
              name: Name,
              //sid: SID,
              email: Email,
              dob: Dob,
              address: Address,
              work: Office,
              password: Password,
            };
            storeDataJSON(Email, currentUser);
            props.navigation.navigate("SignIn");
          }}
        />
        <Button
          type="clear"
          icon={<AntDesign name="login" size={24} color="dodgerblue" />}
          title="  Already have an account?"
          onPress={function () {
            props.navigation.navigate("SignIn");
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
});
export default SignUpScreen;
