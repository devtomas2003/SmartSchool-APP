import React, { useState } from 'react';
import api from '../services/api';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function Resultado({ navigation }){
    const [sala, setSala] = useState('');
    const [disciplina, setDisciplina] = useState('');
    const [prof, setProf] = useState('');
    const [turma, setTurma] = useState('');
    async function getTimes(){
        await api.post('/qrcode', { hashSala: navigation.getParams('sala','nothing sent'), time: new Date() }, {
            headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }
        }).then((res)=>{
            console.log(res.data);
        }).catch(function (error){

        });
    }
    getTimes();
    return <SafeAreaView style={styles.container}>
        <Text value={sala}></Text>
        <Text value={disciplina}></Text>
        <Text value={prof}></Text>
        <Text value={turma}></Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});