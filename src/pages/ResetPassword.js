import React, { useState } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import api from '../services/api';
export default function Recuperation({ navigation }){
    const [newPass, setnewPass] = useState('');
    const [renewpass, setrenewpass] = useState('');
    const [infoText, setInfoText] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [colorInfo, setColorInfo] = useState('');
    const [boxText, setboxText] = useState('');
    const [showBox, setshowBox] = useState(false);
    const [colorBox, setcolorBox] = useState('');
    const [showContent, setshowContent] = useState(true);
    const [btnTxt, setbtnTxt] = useState('Voltar');

    async function handleRecover(){
        if(newPass != renewpass){
            setShowInfo(true);
            setColorInfo('warm');
            setInfoText('As passwords não correspondem!');
            setnewPass('');
            setrenewpass('');
        }
        await api.post('/changePass', {
            password: newPass
        }, { headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }}).then((response)=> {
            if(response.data.showIn == "text"){
                if(response.data.level == 3){
                    setColorInfo('error');
                }else if(response.data.level == 2){
                    setColorInfo('warm');
                }else{
                    navigation.navigate('Login');
                }
                setShowInfo(true);
                setnewPass('');
                setrenewpass('');
                setInfoText(response.data.error);
            }else{
                if(response.data.level == 3){
                    setcolorBox('error');
                }else if(response.data.level == 2){
                    setcolorBox('warm');
                }else{
                    setshowContent(false);
                    setbtnTxt('Continuar');
                }
                setshowBox(true);
                setnewPass('');
                setrenewpass('');
                setboxText(response.data.error);
        }
        }).catch(function (error){
            if(error.response.data.showIn == "text"){
                setShowInfo(true);
                setnewPass('');
                setrenewpass('');
                this.newpass.focus();
                if(error.response.data.level == 3){
                    setColorInfo('error');
                }else if(error.response.data.level == 2){
                    setColorInfo('warm');
                }else{
                    setColorInfo('ok');
                }
                setInfoText(error.response.data.error);
            }else{
                setshowBox(true);
                setnewPass('');
                setrenewpass('');
                this.newpass.focus();
                if(error.response.data.level == 3){
                    setcolorBox('error');
                }else if(error.response.data.level == 2){
                    setcolorBox('warm');
                }else{
                    setcolorBox('ok');
                }
                setboxText(error.response.data.error);
        }
        });
    }

    function hideInfoDuringTyping(text, input){
        if(input == "newpass"){
            setnewPass(text);
        }else{
            setrenewpass(text);
        }
        setShowInfo(false);
        setshowBox(false);
    }

    async function startSession(){
        if(btnTxt == "Voltar"){
            await AsyncStorage.removeItem("Authorization");
        }
        navigation.navigate('Login');
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.logo}>Smart School</Text>
            { showContent ? <Text style={styles.setsubtit}>Defina uma nova password para a sua conta!</Text> : null }
            <View style={styles.form}>
            { showBox ? colorBox == "warm" ? <View style={styles.boxWarm}><Text style={styles.boxWarmText}>{boxText}</Text></View> : colorBox == "error" ? <View style={styles.boxError}><Text style={styles.boxWarmText}>{boxText}</Text></View> : <View style={styles.boxOk}><Text style={styles.boxWarmText}>{boxText}</Text></View> : null }
                { showContent ?
                <View>
                <Text style={styles.label}>INSIRA A NOVA PASSWORD:</Text>
                <TextInput
                    style={styles.input}
                    textContentType="password"
                    placeholder="Introduza a nova password"
                    secureTextEntry={true}
                    placeholderTextColor="#999"
                    value={newPass}
                    ref={(input) => this.newpass = input}
                    onChangeText={pass => hideInfoDuringTyping(pass, "newpass") }
                    onSubmitEditing={() => this.renewpass.focus()}
                />
                <Text style={styles.label}>INSIRA A NOVA PASSWORD NOVAMENTE:</Text>
                <TextInput
                    style={styles.input}
                    textContentType="password"
                    placeholder="Introduza novamente a nova password"
                    secureTextEntry={true}
                    placeholderTextColor="#999"
                    value={renewpass}
                    ref={(input) => this.renewpass = input}
                    onChangeText={pass => hideInfoDuringTyping(pass, "renewpass") }
                    onSubmitEditing={handleRecover}
                />
                { showInfo ? <Text style={colorInfo == "warm" ? styles.infoWarm : colorInfo == "error" ? styles.infoError : styles.infoOk }>{infoText}</Text> : null }
                <TouchableOpacity onPress={handleRecover} style={styles.buttonMain}><Text style={styles.buttonTextMain}>Alterar a password</Text></TouchableOpacity>
                </View>
                : null }
                <TouchableOpacity onPress={startSession} style={styles.buttonSecundary}><Text style={styles.buttonTextSecundary}>{btnTxt}</Text></TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setsubtit: {
        marginTop: 10
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    buttonMain: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },
    buttonSecundary: {
        height: 42,
        borderWidth: 1,
        borderColor: '#f05a5b',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 2
    },
    buttonTextMain: {
        color: '#FFF',
        fontSize: 16
    },
    buttonTextSecundary: {
        color: '#444',
        fontSize: 16
    },
    logo: {
        color: '#f05a5b',
        fontSize: 30,
        fontWeight: 'bold'
    },
    infoWarm: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        color: '#ffb818'
    },
    infoOk: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        color: '#4caf50'
    },
    infoError: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        color: '#f05a5b'
    },
    boxError: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#f05a5b',
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20
    },
    boxOk: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20
    },
    boxWarm: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#ffb818',
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20
    },
    boxWarmText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16
    }
});