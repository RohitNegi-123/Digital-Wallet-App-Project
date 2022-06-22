import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { useNavigation, Link } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { add, sub } from "react-native-reanimated";
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Edit_Details = () => {

    const [em, SetEmail] = useState('');
    useEffect(() => {
        // write your code here, it's like componentWillMount
        getData();

    }, [])

    const getData = async () => {

        jsonValue = await AsyncStorage.getItem('USER')
        const val = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("OYR", val);

        SetEmail(val.email)
    }


    const navigation = useNavigation();
    const [name, onChangeText] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [dob, onChangeDOB] = React.useState('');
    const [address, onChangeaddress] = React.useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const validateEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };
    const submit = () => {
        var invalidemail = false;
        console.log(name, email, phone)

        if (email !== undefined && email !== '') {
            const validity = validateEmail(email)
            console.log("BANAFJ", validity);
            if (validity == false) {
                invalidemail = true;
                alert('Invalid Email!!')
                navigation.navigate("EditDetails")
            }
        }
        if (phone != undefined && phone !== '') {
            console.log(phone.length);
            if (phone.length != 10) {
                invalidemail = true;
                alert('Phone-number  is invalid!!')
            }
        }


        if (invalidemail == false) {
            addUser(em);
            alert("Updated succesfully")

            navigation.navigate("SignIn")
        }
    }


    async function addUser(em) {


        var snapshot = await firebase.firestore()
            .collection('user').get()
        console.log("SNAPSHOT", snapshot, "DATA");
        snapshot.forEach(async (doc) => {

            console.log("GOD2", doc, doc.data().email, doc.id, em);
            if (doc.data().email === em) {
                console.log("GOD DAFGASDHFASJFGIASDGJHASFGJSFAGHASFGHJ");

                deleteUser(doc.id)
            }
            // console.log("Users:", userList);
        });


        // check(flag);
    }
    const deleteUser = async (id) => {

        const sp = await firebase.firestore().collection('user').doc(id)
        if (name !== '') {
            sp.update({
                name: name
            })
        }
        if (email !== '') {
            sp.update({
                email: email
            })
        }
        if (phone !== '') {
            sp.update({
                phone_no: phone
            })
        }
        if (dob !== '') {
            sp.update({
                dob: dob
            })
        }
        if (address !== '') {
            sp.update({
                address: address
            })
        }


        console.log("SP", sp);
        console.log('Deleted ', id)
    }

    const home = () => {
        navigation.navigate("Home");
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
                        <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 10 }}>Full Name :</Text>
                        <TextInput onChangeText={text => onChangeText(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />

                        <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 20 }}>Email :</Text>
                        <TextInput onChangeText={text => onChangeEmail(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 20 }}>Phone No. :</Text>
                        <TextInput onChangeText={text => onChangePhone(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 20 }}>Date of Birth :</Text>
                        <TextInput onChangeText={text => onChangeDOB(text)}
                            style={{
                                marginVertical: 0,
                                borderBottomColor: COLORS.emerald,
                                borderBottomWidth: 1.4,
                                height: 40,
                                color: COLORS.purple,
                                ...FONTS.body3,
                                marginTop: -7
                            }}
                            placeholder="Enter Full Name"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                        <Text style={{ color: COLORS.black, ...FONTS.body4, marginTop: 20 }}>Address :</Text>
                        <TextInput onChangeText={text => onChangeaddress(text)}
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
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => submit()}
                        >
                            <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose, styles.down]}
                            onPress={() => home()}
                        >
                            <Text style={styles.textStyle}>Back to Home</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal >
            {/* <Pressable
                style={[styles.button, styles.buttonOpen, styles.starting]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Edit_Details Info</Text>
            </Pressable> */}
            < Pressable
                style={[styles.button, styles.buttonOpen, styles.starting2]}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.textStyle}>Back to Home</Text>
            </Pressable >
        </View >
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,

        alignItems: "center",
        marginTop: 30
    },
    down: {
        marginTop: 20
    },
    modalView: {

        height: 520,
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

export default Edit_Details;