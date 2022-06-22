import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { useNavigation, Link } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

const Transfer = () => {

    useEffect(() => {
        // write your code here, it's like componentWillMount
        getData();
    }, [])
    const [collectUser, setCollectUser] = React.useState("");
    const [name, Setname] = React.useState("");
    const [email, SetEmail] = React.useState("");
    const [acc_no, Setacc_no] = React.useState("");
    const [bal, Setbal] = React.useState("");
    const getData = async () => {

        jsonValue = await AsyncStorage.getItem('USER')
        const val = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("OYR", val);
        Setname(val.name);
        SetEmail(val.email);
        Setacc_no(val.account_no);
        Setbal(val.account_balance);
        // setCollectUser(val.name);

    }

    const navigation = useNavigation();
    const [Rname, onChangeRname] = React.useState('');
    const [Remail, onChangeRemail] = React.useState('');
    const [Racc_no, onChangeRacc_no] = React.useState('');
    const [Rbal, onChangeRbal] = React.useState('');
    const [amount, onChangeAmount] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    var count = 0;
    const home = () => {
        navigation.navigate('Home')
    }
    const validateEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };

    const deleteUser = async (id, bool, RBAL) => {

        const sp = await firebase.firestore().collection('user').doc(id);
        if (bool == 1) {
            console.log("Reciever", RBAL, amount, parseInt(RBAL) + parseInt(amount));
            sp.update({
                account_balance: parseInt(RBAL) + parseInt(amount),

            })
        }
        if (bool == 0) {
            console.log("Sender", bal, amount, parseInt(bal) - parseInt(amount));
            sp.update({
                account_balance: parseInt(bal) - parseInt(amount),
                transferred: true
            })
            const Tvalue = parseInt(bal) - parseInt(amount);
            AsyncStorage.setItem("Tvalue", JSON.stringify(Tvalue));
        }
    }




    async function addUser(em, bool, RBAL) {


        var snapshot = await firebase.firestore()
            .collection('user').get()
        console.log("SNAPSHOT", snapshot, "DATA");
        snapshot.forEach(async (doc) => {

            console.log("GOD2", doc, doc.data().email, doc.id, em);
            if (doc.data().email === em) {
                console.log("GOD DAFGASDHFASJFGIASDGJHASFGJSFAGHASFGHJ");

                deleteUser(doc.id, bool, RBAL)
            }
            // console.log("Users:", userList);
        });


        // check(flag);
    }


    const Submit = async () => {
        var invalidcred = false;
        if (Rname == undefined || Rname == '') {
            count++;
            invalidcred = true;
            alert("Please fill the receiver's name")


        }
        if (Remail == undefined || Remail == '') {
            count++;
            invalidcred = true;
            alert("Please fill the receiver's email")

        }
        if (Remail !== undefined && Remail !== '') {
            const validity = validateEmail(Remail)
            console.log("BANAFJ", validity);
            if (validity == false) {
                // invalidemail = true;
                invalidcred = true;
                alert('Invalid Email!!')
                // navigation.navigate("Transfer")
            }
        }
        if (Racc_no == undefined || Racc_no == '') {
            count++;
            invalidcred = true;
            alert("Please fill the recevier's account number");
        }
        if (invalidcred == false) {
            if (amount == undefined || amount == '') {
                count++;
                invalidcred = true;
                alert("Please fill the amount to be transferred")
            }
            var flag = false;
            var userList = []
            var snapshot = await firebase.firestore()
                .collection('user').get()

            snapshot.forEach((doc) => {
                userList.push(doc.data())
                // console.log("Users:", userList);
            });
            var total = bal;
            if (invalidcred == false) {
                userList.forEach(val => {
                    console.log("VAl", (val.email), Remail, val.name, Rname)
                    if (val.email != undefined && Remail != undefined && val.name != undefined && Rname != undefined && Racc_no != undefined && val.account_no != undefined) {
                        if (Remail == val.email && Rname == val.name && Racc_no == val.account_no) {
                            alert("Credentials Matched!!")
                            flag = true;
                            onChangeRbal(val.account_balance)

                            // total = val.account_balance;
                            console.log('====================================');
                            console.log("FINDD", val.email, total, amount, val.account_balance);
                            console.log('====================================');
                            addUser(Remail, 1, val.account_balance);

                        }
                    }
                })
                if (flag == false) {
                    alert("Credentials don't matched!! ::..Try again")

                }
                if (flag == true) {
                    if (amount > total) {
                        flag = false;
                        alert('Entered amount is greater than the current balance ')

                    }
                    else {
                        flag = true;
                    }
                }
                if (count == 0 && flag == true) {

                    alert("Congrats!! ::: Transaction completed!!... ")

                    addUser(email, 0, 123046);

                    setModalVisible(!modalVisible)
                    // navigation.navigate("SignIn");
                }
            }
        }
    }
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
                        <Text style={styles.modalText}>FOR SENDER DETAILS:</Text>
                        <Text style={styles.modalText}>Your Name: {name == undefined ? "" : name} </Text>
                        <Text style={styles.modalText}>Your Email: {email == undefined ? "" : email}</Text>
                        <Text style={styles.modalText}>Your Account No: {acc_no == undefined ? "" : acc_no} </Text>
                        <Text style={styles.modalText}>Your Account Bal: {bal == undefined ? "" : bal}</Text>
                        <Text style={styles.modalText}>FOR RECEIVER DETAILS:</Text>


                        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Receiver's Name :</Text>
                        <TextInput onChangeText={text => onChangeRname(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7,
                                marginBottom: 12
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Receiver's Email :</Text>
                        <TextInput onChangeText={text => onChangeRemail(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7,
                                marginBottom: 12
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Receiver's Account no. :</Text>
                        <TextInput onChangeText={text => onChangeRacc_no(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7,
                                marginBottom: 12
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4 }}>Enter tranferring amount :</Text>
                        <TextInput onChangeText={text => onChangeAmount(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7,
                                marginBottom: 20
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />

                        <Pressable
                            style={[styles.button, styles.buttonClose, styles.left]}
                            onPress={() => Submit()}
                        >
                            <Text style={styles.textStyle}>Submit Transaction</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, styles.right]}
                            onPress={() => home()}
                        >
                            <Text style={styles.textStyle}>Home</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen, styles.head]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Enter transaction details</Text>
            </Pressable>
            <Pressable
                style={[styles.button, styles.buttonOpen, styles.back]}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.textStyle}>Home </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,

        alignItems: "center",
        marginTop: 2
    },
    left: {
        marginLeft: -65
    },
    right: {
        marginLeft: 171,
        marginTop: -38.5
    },
    back: {
        marginTop: 23
    },
    head: {
        marginTop: 200
    },
    modalView: {
        margin: 20,
        height: 530,
        width: 300,
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
        borderRadius: 200
        ,
        padding: 10,
        elevation: 2
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
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        color: "black",
        textAlign: "center"
    }
});

export default Transfer;