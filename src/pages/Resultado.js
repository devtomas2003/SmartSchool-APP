import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Text, SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
export default function Resultado({ navigation }){
    const [disciplina, setDisciplina] = useState('');
    const [prof, setProf] = useState('');
    const [cnt, showContent] = useState(false);
    const [sala, setSala] = useState('');
    const [turma, setTurma] = useState('');
    const [boxText, setboxText] = useState('');
    const [showBox, setshowBox] = useState(false);
    const [colorBox, setcolorBox] = useState('');
    function back() {
        navigation.navigate('Login');
    }
    function readanother() {
        navigation.navigate('read');
    }
    useEffect(() => {
        async function getTimes() {
            await api.post('/qrcode', { hashSala: navigation.getParam('sala'), time: new Date() }, {
                headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }
            }).then((res)=>{
                setDisciplina(res.data.disciplina);
                setProf(res.data.professor);
                setSala(res.data.sala);
                setTurma(res.data.turma);
                showContent(true);
            }).catch(function (error){
                setshowBox(true);
                if(error.response.data.level == 3){
                    setcolorBox('error');
                }else if(error.response.data.level == 2){
                    setcolorBox('warm');
                }else{
                    setcolorBox('ok');
                }
                setboxText(error.response.data.error);
            });
        }
        getTimes();
    }, []);
    return(
<SafeAreaView style={styles.container}>
    <View style={styles.form}>
    { showBox ? colorBox == "warm" ? <View style={styles.boxWarm}><Text style={styles.boxWarmText}>{boxText}</Text></View> : colorBox == "error" ? <View style={styles.boxError}><Text style={styles.boxWarmText}>{boxText}</Text></View> : <View style={styles.boxOk}><Text style={styles.boxWarmText}>{boxText}</Text></View> : null }
        { cnt ?
        <View>
        <Text>Disciplina: {disciplina}</Text>
        <Text>Professor: {prof}</Text>
        <Text>Sala: {sala}</Text>
        <Text>Turma: {turma}</Text>
        </View>
        : null }
        <TouchableHighlight onPress={readanother} style={styles.buttonMain}><Text style={styles.buttonTextMain}>Ler Outro QrCode</Text></TouchableHighlight>
        <TouchableHighlight onPress={back} style={styles.buttonSecundary}><Text style={styles.buttonTextSecundary}>Voltar para o Menu</Text></TouchableHighlight>
    </View>
    </SafeAreaView>
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