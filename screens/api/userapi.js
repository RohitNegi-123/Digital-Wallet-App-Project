import firebase from 'react-native-firebase';
export function addUser(user, complete) {
    firebase.firestore().collection('user').add({
        name: user.name,
        email: user.email,
        paasword: user.password
    }).then((data) => complete(data))
        .catch((error) => console.log(error))


}

export async function getUser(userRetreived) {


    userRetreived(userList);
}