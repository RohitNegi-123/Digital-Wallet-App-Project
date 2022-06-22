import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Alert,
    Linking,
    Text,
    Image,
    FlatList,
    TouchableOpacity,

} from "react-native"
import RNRestart from 'react-native-restart';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, Link } from '@react-navigation/native';
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { call } from "react-native-reanimated";
import firebase from 'react-native-firebase';


const showAlert = () =>
    Alert.alert(
        "Refreshing ....",

        "Refreshed!!",
        [
            {
                text: "Done",

                style: "cancel",
            },
        ],
        {
            cancelable: true,

        }
    );

const Home = () => {
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [acc_no, setAcc_no] = React.useState("");
    const [VAL, setVAL] = React.useState();
    const [email, SetEmail] = React.useState("");
    const [dob, SetDOB] = React.useState("");
    const [phone, SetPhone] = React.useState("");
    const [address, SetAddress] = React.useState("");
    const [string, setString] = React.useState("");
    const [bal, setBal] = React.useState(0);
    const [logoff, setLogoff] = React.useState(false);
    const [transferFlag, setTflag] = React.useState(false);
    var timer;

    useEffect(() => {
        // write your code here, it's like componentWillMount
        console.log("Hit it");
        getData();
    }, [])
    const [collectUser, setCollectUser] = React.useState("");
    const getData = async () => {


        jsonValue = await AsyncStorage.getItem('USER')
        const val = jsonValue != null ? JSON.parse(jsonValue) : null;
        console.log("OYR", val);
        setVAL(val);
        setCollectUser(val.name);

        setId(val.id);
        setName(val.name);
        SetEmail(val.email)
        setAcc_no(val.account_no);
        setBal(val.account_balance);
        SetPhone(val.phone_no);
        SetAddress(val.address);
        SetDOB(val.dob);
        // setBal(count);
        move(val);



    }
    clearAsyncStorage = async (cat) => {
        AsyncStorage.clear();
        console.log("LOGGED OUT", logoff, cat);
        end();
        // move(12, false);
        alert('Logged out successfully')
        navigation.navigate("SignUp")
    }
    const logout = () => {
        setLogoff(true);
        var cat = true;
        console.log("Touch", logoff);
        clearAsyncStorage(cat)
    }
    const end = () => {
        console.log("DONEE!!");
        console.log("REACHED LOGOUT", logoff);
        RNRestart.Restart();
        setTimeout(() => { clearInterval(timer); alert('Log Out successfully!!'); });
    }
    const move = (val) => {



        var count = val.account_balance;

        timer = setInterval(async () => {
            setTflag(val.trasnferred);
            console.log("REACHEDhghavghkasvhucskhuvshdavbhksdbhkabf", VAL);
            if (transferFlag == true) {
                Tvalue = await AsyncStorage.getItem('Tvalue')
                const Tval = Tvalue != null ? JSON.parse(Tvalue) : null;
                console.log("OYRTTTT", Tval);
                count = Tval;
                setTflag(false)
            }
            setBal(++count);
            // firebase.firestore().collection('user').doc(email).
            //     onSnapshot(document => {
            //         console.log("USERRR", document, document.data());
            //     })
            // deleteUser(val.email, count);
            addUser(count, val.email);









        }, 10000)





    }
    async function addUser(count, em) {


        var snapshot = await firebase.firestore()
            .collection('user').get()
        console.log("SNAPSHOT", snapshot, "DATA");
        snapshot.forEach(async (doc) => {

            console.log("GOD2", doc, doc.data().email, doc.id, em);
            if (doc.data().email === em) {
                console.log("GOD DAFGASDHFASJFGIASDGJHASFGJSFAGHASFGHJ", logoff);
                setString(doc.id)
                deleteUser(count, doc.id)
            }
            // console.log("Users:", userList);
        });


        // check(flag);
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



    const navigation = useNavigation();
    const featuresData = [
        {
            id: 1,
            icon: icons.reload,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "Refresh"
        },
        {
            id: 2,
            icon: icons.send,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Transfer"
        },

        {
            id: 3,
            icon: icons.wallet,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Wallet"
        },
        {
            id: 4,
            icon: icons.bill,
            color: COLORS.yellow,
            backgroundColor: COLORS.lightyellow,
            description: "Check Interest"
        },
        {
            id: 5,
            icon: icons.game,
            color: COLORS.primary,
            backgroundColor: COLORS.lightGreen,
            description: "Games"
        },
        {
            id: 6,
            icon: icons.phone,
            color: COLORS.red,
            backgroundColor: COLORS.lightRed,
            description: "Edit details"
        },
        {
            id: 7,
            icon: icons.more,
            color: COLORS.purple,
            backgroundColor: COLORS.lightpurple,
            description: "More"
        },
    ]

    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 3,
            img: images.promoBanner,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 4,
            img: images.promoBanner,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!"
        },
    ]

    const [features, setFeatures] = React.useState(featuresData)
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)
    var kite;
    const called = (val) => {


        if (val == null) {
            console.log("NULL BRO");
        }
        kite = val;
        console.log("Here", kite, val.name, collectUser);
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginVertical: SIZES.padding * 2 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h1 }}>Hello! {collectUser == undefined ? "" : collectUser} </Text>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray
                        }}
                        onPress={() => logout()}

                    >
                        <Image
                            source={icons.user}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                height: 10,
                                width: 10,
                                backgroundColor: COLORS.red,
                                borderRadius: 5
                            }}
                        >
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    function renderBanner() {
        return (
            <View
                style={{
                    height: 120,
                    borderRadius: 20,
                }}
            >
                <Image
                    source={images.banner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20
                    }}
                />
            </View>
        )
    }

    function renderFeatures() {
        const featureCall = (item) => {
            console.log("shj", item.description);
            if (item.description == "Refresh") {
                if ('Jen'.localeCompare('jEn')) {
                    console.log("BABY");
                }
                console.log("Ji");
                showAlert()

            }
            if (item.description == "Games") {
                console.log("h");
                Linking.openURL("https://beebom.com/best-multiplayer-games-android/");
            }
            if (item.description == "Wallet") {
                navigation.navigate("Wallet")
            }
            if (item.description == "Check Interest") {
                navigation.navigate("CheckInterest")
            }
            if (item.description == "Edit details") {
                navigation.navigate("EditDetails")
            }
            if (item.description == "Transfer") {

                navigation.navigate("Transfer")
            }
        }
        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
                onPress={() => featureCall(item)}
            >
                <View
                    style={{
                        height: 50,
                        width: 50,
                        marginBottom: 5,
                        borderRadius: 20,
                        backgroundColor: item.backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={item.icon}
                        resizeMode="contain"
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: item.color
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.description}</Text>
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={Header}
                data={features}
                numColumns={4}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                style={{ marginTop: SIZES.padding * 3.5 }}
            />
        )
    }

    function renderPromos() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {renderPromoHeader()}
            </View>
        )

        const renderPromoHeader = () => (
            <View
                style={{
                    flexDirection: 'row',
                    marginBottom: SIZES.padding
                }}
            >
                {/* <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h3 }}>Special Promos</Text>
                </View> */}
                {/* <TouchableOpacity
                    onPress={() => console.log("View All")}
                > */}
                {/* <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
            </TouchableOpacity> */}
            </View >

        )

        const renderItem = ({ item }) => (
            <TouchableOpacity

                onPress={() => console.log(item.title)}
            >
                {/* <View
                    style={{
                        height: 80,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: COLORS.primary
                    }}
                > */}
                {/* <Image
                        source={images.promoBanner}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }}
                    /> */}
                {/* </View> */}

                {/* <View
                    style={{
                        padding: SIZES.padding,
                        backgroundColor: COLORS.lightGray,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20
                    }}
                > */}
                {/* <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                    <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
                </View> */}
            </TouchableOpacity>
        )

        return (
            <FlatList
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={specialPromos}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}

                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View >
                    </View>
                }
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}

export default Home;