import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import AddScreen from "./screens/AddScreen";

const db = SQLite.openDatabase("notes.db");

const SAMPLE_NOTES = [
  { title: "Feed the monkey", done: false, id: "0" },
  { title: "Do the laundry", done: false, id: "1" },
  { title: "More sample data", done: false, id: "2" },
];

function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);

  // This is to set up the top right button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="ios-create-outline"
            size={30}
            color="black"
            style={{
              color: "#f2daea",
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
      ),
    });
  });

  function addNote() {
    navigation.navigate("Add Screen");
    // const newNote = {
    //   title: "Sample note",
    //   done: false,
    //   id: notes.length.toString(),
    // };
    // setNotes([...notes, newNote]);
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
      >
        <Text>{item.title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const InnerStack = createStackNavigator();
function NotesStack() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          title: "Notes, a Todo App",
          headerStyle: {
            backgroundColor: "#e339aa",
            height: 100,
            shadowColor: "black",
            shadowOpacity: 0.2,
            shadowRadius: 5,
          },
          headerTintColor: "#f2daea",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
          },
        }}
      />
    </InnerStack.Navigator>
  );
}

function AddScreen({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <Text style={{ fontSize: 24 }}>This is the add screen</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "orange",
          borderRadius: 5,
          marginTop: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" mode="modal">
        <Stack.Screen name="Notes Stack" component={NotesStack} />
        <Stack.Screen name="Add Screen" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2daea",
    alignItems: "center",
    justifyContent: "center",
  },
});