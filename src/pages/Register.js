import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, TextInput, TouchableHighlight, Text, Picker } from 'react-native';
import api from '../services/api';
export default function Register({ navigation }){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [turmas, setTurmas] = useState([]);
    const [turma, setTurma] = useState('');
    const [infoText, setInfoText] = useState('');
    const [showInfo, setShowInfo] = useState(false);
    const [colorInfo, setColorInfo] = useState('');
    const [boxText, setboxText] = useState('');
    const [showBox, setshowBox] = useState(false);
    const [colorBox, setcolorBox] = useState('');

    useEffect(() => {
        async function getTurmas(){
            await api.post('/getTurmas').then((response)=>{
                setTurmas(response.data.turmas);
            });
        }
        getTurmas();
    }, []);

    async function handleRegister(){
        await api.post('/newAccount', {
            name,
            mail: email,
            password
        }).then((response)=>{
            if(response.data.showIn == "text"){
                setShowInfo(true);
                setEmail('');
                setPass('');
                setName('');
                setTurma('');
                if(response.data.level == 3){
                    setColorInfo('error');
                }else if(response.data.level == 2){
                    setColorInfo('warm');
                }else{
                    setColorInfo('ok');
                }
                setInfoText(response.data.error);
            }else{
                setshowBox(true);
                setEmail('');
                setPass('');
                setName('');
                if(response.data.level == 3){
                    setcolorBox('error');
                }else if(response.data.level == 2){
                    setcolorBox('warm');
                }else{
                    setcolorBox('ok');
                }
                setboxText(response.data.error);
        }
        }).catch(function (error){
            if(error.response.data.showIn == "text"){
                setShowInfo(true);
                setEmail('');
                setPass('');
                setName('');
                setTurma('');
                this.nome.focus();
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
                setEmail('');
                setPass('');
                setName('');
                this.nome.focus();
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
        if(input == "mail"){
            setEmail(text);
        }else if(input == "nome"){
            setName(text);
        }else if(input == "turma"){
            setTurma(text);
        }else{
            setPass(text);
        }
        setShowInfo(false);
        setshowBox(false);
    }

    function startSession(){
        navigation.navigate('Login');        
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.logo}>Smart School</Text>
            <View style={styles.form}>
            { showBox ? colorBox == "warm" ? <View style={styles.boxWarm}><Text style={styles.boxWarmText}>{boxText}</Text></View> : colorBox == "error" ? <View style={styles.boxError}><Text style={styles.boxWarmText}>{boxText}</Text></View> : <View style={styles.boxOk}><Text style={styles.boxWarmText}>{boxText}</Text></View> : null }
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Introduza o seu nome"
                    placeholderTexor="#999"
                    keyboardType="default"
                    autoCorrect={false}
                    value={name}
                    ref={(input) => this.nome = input}
                    onChangeText={nome => hideInfoDuringTyping(nome, "nome")}
                    onSubmitEditing={() => this.InEmail.focus()}
                />
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
                />
                <Text style={styles.label}>Selecione a sua Turma</Text>
                <Picker
                style={styles.input}
                selectedValue={turma}
                onValueChange={(itemValue, itemIndex) => hideInfoDuringTyping(itemValue, "turma") } >
                    { turmas.map(turma => (
                        <Picker.Item key={turma} label={turma} value={turma} />
                    ))}
                </Picker>
                { showInfo ? <Text style={colorInfo == "warm" ? styles.infoWarm : colorInfo == "error" ? styles.infoError : styles.infoOk }>{infoText}</Text> : null }
                <TouchableHighlight onPress={handleRegister} style={styles.buttonMain}><Text style={styles.buttonTextMain}>Criar a conta</Text></TouchableHighlight>
                <TouchableHighlight onPress={startSession} style={styles.buttonSecundary}><Text style={styles.buttonTextSecundary}>Iniciar Sessão</Text></TouchableHighlight>
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
    infoOk: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#4caf50'
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