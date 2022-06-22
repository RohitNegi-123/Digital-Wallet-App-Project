import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation, Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { acc } from "react-native-reanimated";
const CheckInterest = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [acc_no, setAcc_no] = React.useState("");
    const [interest, setInterest] = React.useState("");
    useEffect(() => {
        // write your code here, it's like componentWillMount
        getData();
    }, [])
    const getData = async () => {

        jsonValue = await AsyncStorage.getItem('USER')
        const val = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("OYR", val);
        setId(val.id);
        setName(val.name);
        setAcc_no(val.account_no);
        setInterest(val.interest);

        // setCollectUser(val.name);

    }
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Id : {id == undefined ? "" : id}</Text>
                        <Text style={styles.modalText}>Name : {name == undefined ? "" : name}</Text>

                        <Text style={styles.modalText}>Account No. : {acc_no == undefined ? "" : acc_no}</Text>

                        <Text style={styles.modalText}>Total Interest given : {interest == undefined ? "" : interest} </Text>
                        <Text style={styles.modalText}>  </Text>

                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close Info</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen, styles.starting]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Check Interest Info</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen, styles.starting2]}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.textStyle}>Back to Home</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,

        alignItems: "center",
        marginTop: 30
    },
    modalView: {

        height: 250,
        minWidth: 300,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 100,
        padding: 13,
        elevation: 15
    },
    starting: {
        marginTop: 10
    },
    starting2: {
        marginTop: 30
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default CheckInterest;