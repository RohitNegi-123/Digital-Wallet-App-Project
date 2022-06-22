import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet,


} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'react-native-firebase';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// import { addUser, getUser } from "./api/userapi"
// import database from 'react-native-firebase/database';
import { COLORS, SIZES, FONTS, icons, images } from "../constants"

// let addItem = item => {
//     database().ref('/items').push({
//         name: item
//     });
// };
var user;
const SignUp = ({ navigation }) => {
    const [name, onChangeText] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const handleSubmit = () => {
        // addItem(name);
        console.log("saved", name, email, password)
        const validity = validateEmail(email)
        console.log("BANAFJ", validity);
        if (!validity) {
            invalidemail = true;
            alert('Invalid Email!!')
            navigation.navigate("SignUp")
        }
        else {
            addUser();
        }

        // navigation.navigate("Home");


        // alert('Item saved successfully');
    };
    const validateEmail = (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    };
    const styles = StyleSheet.create({
        container: {
            flex: 1,

            justifyContent: 'center'
        },
    })
    async function addUser() {
        var userList = []
        var flag = false;
        var exist = false;
        var invalidemail = false;
        console.log("POP", name)
        if (name == undefined || name == "") {
            alert("Please fill your name")
            // navigation.navigate("SignUp");
        }
        if (email == undefined || email == "") {
            alert("Please fill your email")

            // navigation.navigate("SignUp");
        }


        if (password == undefined || password == "") {
            alert("Please fill your password")
            // navigation.navigate("SignUp");
        }

        var snapshot = await firebase.firestore()
            .collection('user').get()
        console.log("SNAPSHOT", snapshot, "DATA");
        snapshot.forEach((doc) => {
            userList.push(doc.data())
            // console.log("Users:", userList);
        });

        userList.forEach(val => {
            // console.log("VAl", val.email)
            // if (val.email != undefined && (val.email).toLowerCase() === email.toLowerCase()) {
            //     exist = true;
            // }
            if (val.email != undefined && (val.email).toLowerCase() === email.toLowerCase() && val.password === password) {
                flag = true;
                user = val;
                console.log('====================================');
                console.log("FINDD");
                console.log('====================================');

            }
        })
        check(flag);






    }
    const newdata = (data) => {
        if (user == undefined) {
            val = user;
        }

        console.log("Come", data, " HAHA", user);
        addUser();
    }
    const storeData = (value) => {
        AsyncStorage.setItem('USER', JSON.stringify(value))

        console.log('====================================');
        console.log("GET that");
        console.log('USERRRR', JSON.stringify(value));
        console.log('====================================');

    }
    const check = (flag) => {
        console.log("Flag", flag)
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        // if (exist == true) {
        //     alert("User exists with this email!! Please Login")
        // }
        if (flag == true) {
            console.log("exist");
            // alert("User Exists!! ... Leading to Home")

            if (name !== undefined && name !== '') {
                console.log("REa");
                if (email !== undefined && email !== '') {
                    if (password !== undefined && password !== '') {
                        alert("Successfully aunthenticated!!")
                        console.log("User", user);
                        const x = storeData(user);
                        console.log("LOP", x);
                        navigation.navigate("Home");

                    }
                }
            }
        }
        else {
            firebase.firestore().collection('user')

                .add({
                    id: "UK07" + Math.floor(Math.random() * 10000),
                    name: name,
                    email: email,
                    password: password,
                    account_balance: 0,
                    account_no: Math.floor((Math.random() * 1000000) + 1),
                    dob: date + '-' + month + '-' + year,
                    address: "",
                    phone_no: 1000000000,
                    interest: 0,
                    transferred: false
                }).then((data) => newdata(data))
                .catch((error) => console.log(error))
        }




    }
    const [showPassword, setShowPassword] = React.useState(false)

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    React.useEffect(() => {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(response => response.json())
            .then(data => {
                let areaData = data.map(item => {
                    return {
                        code: item.alpha2Code,
                        name: item.name,
                        callingCode: `+${item.callingCodes[0]}`,
                        flag: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`
                    }
                })

                setAreas(areaData)

                if (areaData.length > 0) {
                    let defaultData = areaData.filter(a => a.code == "US")

                    if (defaultData.length > 0) {
                        setSelectedArea(defaultData[0])
                    }
                }
            })
    }, [])

    function renderHeader() {
        return (

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 3,
                    paddingHorizontal: SIZES.padding * 3
                }}
                onPress={() => console.log("Sign Up")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Sign Up!</Text>

                <TouchableOpacity
                    style={{
                        height: 30,
                        width: 100,
                        backgroundColor: 'green',
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: SIZES.padding * 12.6
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign In</Text>
                </TouchableOpacity>




                <Text onPress={() => navigation.navigate("SignIn")} style={{ marginLeft: SIZES.padding * 12.6, color: COLORS.white, ...FONTS.h4, shadowColor: COLORS.green, backgroundColor: COLORS.primary, padding: 2 }}> Login </Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Full Name</Text>
                    <TextInput onChangeText={text => onChangeText(text)}
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Full Name"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                {/* Phone Number */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Email id</Text>

                    <View style={{ flexDirection: 'row' }}>
                        {/* Country Code */}
                        {/* <TouchableOpacity
                            style={{
                                width: 100,
                                height: 50,
                                marginHorizontal: 5,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                ...FONTS.body2
                            }}
                            onPress={() => setModalVisible(true)}
                        > */}
                        {/* <View style={{ justifyContent: 'center' }}>
                                <Image
                                    source={icons.down}
                                    style={{
                                        width: 10,
                                        height: 10,
                                        tintColor: COLORS.white
                                    }}
                                />
                            </View> */}
                        {/* <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                                <Image
                                    source={{ uri: selectedArea?.flag }}
                                    resizeMode="contain"
                                    style={{
                                        width: 30,
                                        height: 30
                                    }}
                                />
                            </View> */}

                        {/* <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{selectedArea?.callingCode}</Text>
                            </View>
                        </TouchableOpacity> */}

                        {/* Phone Number */}
                        <TextInput
                            onChangeText={email => onChangeEmail(email)}
                            style={{
                                flex: 1,
                                marginVertical: SIZES.padding,
                                borderBottomColor: COLORS.white,
                                borderBottomWidth: 1,
                                height: 40,
                                color: COLORS.white,
                                ...FONTS.body3
                            }}
                            placeholder="Enter email id"
                            placeholderTextColor={COLORS.white}
                            selectionColor={COLORS.white}
                        />
                    </View>
                </View>

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
                    <TextInput
                        onChangeText={text => onChangePassword(text)}
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>




                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: 'green',
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={handleSubmit}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Sign Up</Text>
                </TouchableOpacity>

            </View>
        )
    }

    function renderAreaCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={['purple', '#FF1D18', '#CC7722']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default SignUp;