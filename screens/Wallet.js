import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useNavigation, Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { acc, add } from "react-native-reanimated";
import firebase from 'react-native-firebase';
var user;
const Wallet = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [acc_no, setAcc_no] = React.useState("");
    const [email, SetEmail] = React.useState("");
    const [dob, SetDOB] = React.useState("");
    const [phone, SetPhone] = React.useState("");
    const [address, SetAddress] = React.useState("");
    const [string, setString] = React.useState("");
    const [bal, setBal] = React.useState(0);
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
        SetEmail(val.email)
        setAcc_no(val.account_no);
        setBal(val.account_balance);
        SetPhone(val.phone_no);
        SetAddress(val.address);
        SetDOB(val.dob);
        // setBal(count);
        var count = val.account_balance;
        // setInterval(async () => {
        // console.log("REACHED");
        // setBal(++count);
        // firebase.firestore().collection('user').doc(email).
        //     onSnapshot(document => {
        //         console.log("USERRR", document, document.data());
        //     })
        // deleteUser(val.email, count);
        // addUser(count, val.email);









        // }, 10000)

        // setCollectUser(val.name);
        called(val);

    }
    const deleteUser = async (count, id) => {
        console.log("String", string);
        const sp = await firebase.firestore().collection('user').doc(id)

        sp.update({
            account_balance: count,
            interest: 0.1 * count
        }).then(() => {
            console.log("Sucess");
        })
        console.log("SP", sp);
        console.log('Deleted ', id)
    }

    async function addUser(count, em) {


        var snapshot = await firebase.firestore()
            .collection('user').get()
        console.log("SNAPSHOT", snapshot, "DATA");
        snapshot.forEach(async (doc) => {

            console.log("GOD2", doc, doc.data().email, doc.id, em);
            if (doc.data().email === em) {
                console.log("GOD DAFGASDHFASJFGIASDGJHASFGJSFAGHASFGHJ");
                setString(doc.id)
                deleteUser(count, doc.id)
            }
            // console.log("Users:", userList);
        });


        // check(flag);
    }



    // 
    const called = (val) => {


        if (val == null) {
            console.log("NULL BRO");
        }
        kite = val;
        console.log("Here", kite, val.name);
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
                        <Text style={styles.modalText}>Id : {id == undefined ? "" : id} </Text>
                        <Text style={styles.modalText}>Name : {name == undefined ? "" : name} </Text>

                        <Text style={styles.modalText}>Account No. : {acc_no == undefined ? "" : acc_no}</Text>
                        <Text style={styles.modalText}>Account Balance : {bal == undefined ? "" : bal} </Text>
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
                <Text style={styles.textStyle}>Show Wallet Info</Text>
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

export default Wallet;