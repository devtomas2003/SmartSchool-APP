import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Text, SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
export default function Resultado({ navigation }){
    const [disciplina, setDisciplina] = useState('');
    const [prof, setProf] = useState('');
    const [sala, setSala] = useState('');
    const [turma, setTurma] = useState('');
    useEffect(() => {
        async function getTimes() {
            await api.post('/qrcode', { hashSala: navigation.getParam('sala'), time: '2019-12-19T14:51:23.354Z' }, {
                headers: { 'Authorization': 'EST ' + await AsyncStorage.getItem("Authorization") }
            }).then((res)=>{
                console.log(res);
                setDisciplina(res.data.disciplina);
                setProf(res.data.professor);
                setSala(res.data.sala);
                setTurma(res.data.turma);
            }).catch(function (error){
                console.log(error.response.data);
            });
        }
        getTimes();
    }, []);
    return(
<SafeAreaView style={styles.container}>
        <Text>{disciplina}</Text>
        <Text>{prof}</Text>
        <Text>{sala}</Text>
        <Text>{turma}</Text>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});