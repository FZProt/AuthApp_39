import { AsyncStorage } from "react-native";

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    //alert("Data STored Successfully!");
  } catch (error) {
    alert(error);
  }
};

const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      //alert("No data with this key!");
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    //alert("Data Removed Successfully");
  } catch (error) {
    alert(error);
  }
};

const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    alert('done');
  } catch (error) {
    console.error('Error clearing app data.');
  }
}

const logCurrentStorage = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    let data = await AsyncStorage.multiGet(keys);
    console.log(data)
    //alert('done');
  } catch (error) {
    console.error('Error showing data.');
  }
}

export { storeDataJSON, getDataJSON, removeData, clearAppData, logCurrentStorage };
