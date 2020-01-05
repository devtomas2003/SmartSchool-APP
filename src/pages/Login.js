import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import api from '../services/api';
export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [infoText, setInfoText] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [colorInfo, setColorInfo] = useState(false);
    const [boxText, setboxText] = useState('');
    const [showBox, setshowBox] = useState(false);
    const [colorBox, setcolorBox] = useState(false);
    const [showDev, setshowDev] = useState(false);
    const [colorDev, setcolorDev] = useState('');
    const [devText, setdevText] = useState('');


    useEffect(() => {
        NetInfo.fetch().then(state => {
            if(state.isConnected == false){
                navigation.navigate('NoConnection');
            }else{
                verifyVersion();
            }
        });

        async function verifyVersion() {
            if(!navigation.getParam('userState')){
                const lastVersion = 'v1.0';
                await api.post('/version', {
                    version: lastVersion
                }).then((response)=>{
                    if(response.data.status == "needUpdate"){
                        navigation.navigate('Update', { forceDownload: response.data.forceDownload, newVersion: response.data.newVersion });
                    }else{
                        autoLogon();
                    }
                });
            }else{
                autoLogon();
            }
        }

        async function autoLogon() {
            if(await AsyncStorage.getItem("Authorization") != null){
                await api.post('/checkToken', null, {
                    headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }
                }).then((res)=>{
                    if(res.data.recuperated == 0){
                        navigation.navigate('Menu', { name: res.data.name });
                    }else{
                        navigation.navigate('ResetPassword');
                    }
                }).catch(function (error){
                    if(error.response.data.showIn == "text"){
                        setShowInfo(true);
                        if(error.response.data.level == 3){
                            setColorInfo(false);
                        }else{
                            setColorInfo(true);
                        }
                        setInfoText(error.response.data.error);
                    }else{
                        setshowBox(true);
                        if(error.response.data.level == 3){
                            setcolorBox(false);
                        }else{
                            setcolorBox(true);
                        }
                        setboxText(error.response.data.error);
                }
                devNotifications();
                });
            }
        }
        async function devNotifications() {
                await api.post('/devNotification', null).then((response)=>{
                    if(response.data.status == "needShow"){
                        setshowDev(true);
                        setcolorDev(response.data.colorDev);
                        setdevText(response.data.txtDev);
                    }
                });
        }
    }, []);

    function makeAccount(){
        navigation.navigate('Register');
    }

    function recoverPass(){
        navigation.navigate('Recuperation');
    }

    async function saveStorage(name, value){
        await AsyncStorage.setItem(name, value);
    }

    async function handleLogin(){
        await api.post('/login', {
            email,
            password
        }, {
            headers: { 'device': 'mobile' }
        }).then((response)=>{
            const { hash, name, recuperated } = response.data;
            saveStorage("Authorization", hash);
            if(recuperated == 0){
                navigation.navigate('Menu', { name });
            }else{
                navigation.navigate('ResetPassword');
            }
        }).catch(function (error){
            if(error.response.data.showIn == "text"){
                setShowInfo(true);
                setEmail('');
                setPass('');
                this.InEmail.focus();
                if(error.response.data.level == 3){
                    setColorInfo(false);
                }else{
                    setColorInfo(true);
                }
                setInfoText(error.response.data.error);
            }else{
                setshowBox(true);
                setEmail('');
                setPass('');
                this.InEmail.focus();
                if(error.response.data.level == 3){
                    setcolorBox(false);
                }else{
                    setcolorBox(true);
                }
                setboxText(error.response.data.error);
        }
        });
    }

    function hideInfoDuringTyping(text, input){
        if(input == "mail"){
            setEmail(text);
        }else{
            setPass(text);
        }
        setShowInfo(false);
        setshowBox(false);
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.logo}>Smart School</Text>
            <View style={styles.form}>
            { showDev ? colorDev == "warm" ? <View style={styles.boxWarm}><Text style={styles.boxWarmText}>{devText}</Text></View> : colorDev == "error" ? <View style={styles.boxError}><Text style={styles.boxWarmText}>{devText}</Text></View> : <View style={styles.boxOk}><Text style={styles.boxWarmText}>{devText}</Text></View> : null }
            { showBox ? colorBox ? <View style={styles.boxWarm}><Text style={styles.boxWarmText}>{boxText}</Text></View> : <View style={styles.boxError}><Text style={styles.boxWarmText}>{boxText}</Text></View> : null }
                <Text style={styles.label}>E-MAIL:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    ref={(input) => this.InEmail = input}
                    onChangeText={mail => hideInfoDuringTyping(mail, "mail")}
                    onSubmitEditing={() => this.passwords.focus()}
                />
                <Text style={styles.label}>PASSWORD:</Text>
                <TextInput
                    style={styles.input}
                    textContentType="password"
                    placeholder="Introduza a sua password"
                    secureTextEntry={true}
                    placeholderTextColor="#999"
                    value={password}
                    ref={(input) => this.passwords = input}
                    onChangeText={pass => hideInfoDuringTyping(pass, "pass") }
                    onSubmitEditing={handleLogin}
                />
                { showInfo ? <Text style={colorInfo ? styles.infoWarm : styles.infoError}>{infoText}</Text> : null }
                <TouchableHighlight onPress={handleLogin} style={styles.buttonMain}><Text style={styles.buttonTextMain}>Iniciar Sessão</Text></TouchableHighlight>
                <TouchableHighlight onPress={makeAccount} style={styles.buttonSecundary}><Text style={styles.buttonTextSecundary}>Criar uma conta!</Text></TouchableHighlight>
                <TouchableHighlight onPress={recoverPass} style={styles.buttonSecundary}><Text style={styles.buttonTextSecundary}>Esqueci a minha password!</Text></TouchableHighlight>
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
    boxOk: {
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#4caf50',
        paddingVertical: 10,
        borderRadius: 2,
        marginBottom: 20
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
        marginBottom: 20,
        color: '#ffb818'
    },
    infoError: {
        textAlign: 'center',
        marginBottom: 20,
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