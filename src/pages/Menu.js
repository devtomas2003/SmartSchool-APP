import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import qrcode from '../assets/qrcode.png';
import bug from '../assets/bug.png';

export default function Menu({ navigation }){

    const [wellcome, setWellcome] = useState('');

    useEffect(() => {
        setWellcome('Oi, ' + navigation.getParam('name'));
    });

    function openReader() {
        navigation.navigate('read');
    }

    return <SafeAreaView style={styles.container}>
        <View style={styles.profile}>
            <Image source={{uri: 'https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png'}} style={styles.imageProfile} />
            <Text style={styles.name}>{wellcome}</Text>
        </View>
        <View style={styles.btns}>
            <TouchableHighlight onPress={openReader} style={styles.btnqrcode}><View style={styles.qrcodevw}><Image source={qrcode} style={styles.qrcodeimg} /><Text style={styles.qrcodetxt}>Ler QrCode</Text></View></TouchableHighlight>
            <TouchableHighlight style={styles.btnbugs}><View style={styles.qrcodevw}><Image source={bug} style={styles.bugimg} /><Text style={styles.bugtxt}>Enviar FeedBack</Text></View></TouchableHighlight>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    imageProfile: {
        width: 34,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 44/2,
        marginLeft: 10,
        height: 34
    },
    qrcodevw: {
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
    qrcodeimg: {
        width: 80,
        height: 80
    },
    bugimg: {
        width: 70,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        height: 70
    }
});