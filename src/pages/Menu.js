import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import api from '../services/api';
import qrcode from '../assets/qrcode.png';
import bug from '../assets/bug.png';
import logout from '../assets/exit.png';

export default function Menu({ navigation }){

const [wellcome, setWellcome] = useState('');

useEffect(() => {
    setWellcome('Bem-vindo, ' + navigation.getParam('name'));
});

function openReader() {
    navigation.navigate('read');
}
async function saida() {
    const key = await AsyncStorage.getItem('Authorization');
    await AsyncStorage.removeItem('Authorization');
    await api.post('/logout', null, {
        headers: { 'Authorization': 'EST ' + key }
    }).then((res)=>{
        navigation.navigate('Login');
    });
}

return <View style={styles.container}>
    <View style={styles.profile}>
        <Image source={{uri: 'https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png'}} style={styles.imageProfile} />
        <Text style={styles.name}>{wellcome}</Text>
    </View>
    <View style={styles.btns}>
        <TouchableOpacity onPress={openReader} style={styles.btnqrcode}><View style={styles.qrcodevw}><Image source={qrcode} style={styles.qrcodeimg} /><Text style={styles.qrcodetxt}>Ler QrCode</Text></View></TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnbugs}><View style={styles.qrcodevw}><Image source={bug} style={styles.bugimg} /><Text style={styles.bugtxt}>Enviar FeedBack</Text></View></TouchableOpacity> */}
        <TouchableOpacity onPress={saida} style={styles.btnlogout}><View style={styles.qrcodevw}><Image source={logout} style={styles.logoutimg} /><Text style={styles.logouttxt}>Terminar Sessão</Text></View></TouchableOpacity>
    </View>
</View>
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
},
profile: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
},
qrcodetxt: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 20
},
bugtxt: {
    alignSelf: 'center',
    color: '#FFF',
    marginLeft: 10,
    fontSize: 20
},
logouttxt: {
    alignSelf: 'center',
    color: '#FFF',
    marginLeft: 10,
    fontSize: 20
},
imageProfile: {
    width: 34,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 44/2,
    marginLeft: 10,
    height: 34
},
qrcodevw: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
},
btns: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 3
},
name: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16
},
btnqrcode: {
    backgroundColor: '#6f5fbd',
    borderRadius: 10,
    marginTop: 15
},
btnbugs: {
    backgroundColor: '#47cbfc',
    borderRadius: 10,
    marginTop: 15
},
btnlogout: {
    backgroundColor: '#47cbfc',
    borderRadius: 10,
    marginTop: 15
},
qrcodeimg: {
    width: 60,
    height: 60
},
bugimg: {
    width: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    height: 50
},
logoutimg: {
    width: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    height: 50
}
});