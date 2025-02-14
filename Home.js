import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight:'bold',
        padding: 20,
        color: '#000000',
        backgroundColor: "#fff9f5",
        borderWidth: 1
    },
    boxes: {
        borderWidth: 1.5,
        margin: 20,
        marginBottom: 4,
        marginTop: 4,
        padding: 3,
        borderColor: '#404741',
        backgroundColor: "#fff9f5",
        elevation: 5
    },
    textBox: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 0,
        backgroundColor: "#fff9f5",
        borderColor: '#000000'
    },
    textStyle: {
        padding: 10,
        paddingLeft: 12,
        fontSize: 12
    },
    sortContainer: {
        margin: 20,
        marginBottom: 23,
        marginTop: 0
    }
});

let originalData = [];

const Home = ({navigation}) => {
    const [mydata, setMydata] = useState([]);
    const [sortOption, setSortOption] = useState('name');

    useEffect(() => {
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_688b934f82c1059ed0a6993d2a829089")
            .then((response)=>{
                return response.json();
            })
            .then((myJson)=>{
                if(originalData.length<1) {
                    let result = myJson.result;
                    let records = result.records;
                    setMydata(records);
                }
            })
    }, []);

    const FilterData = (text) => {
        if(text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.school_name.toLowerCase().includes(text.toLowerCase()))
            setMydata(myFilteredData);
        }
        else {
            setMydata(originalData);
        }
    }

    const sortData = (option) => {
        let sortedData;
        if (option === 'a-z') {
            sortedData = [...mydata].sort((a, b) => a.school_name.localeCompare(b.school_name));
        } else if (option === 'z-a') {
            sortedData = [...mydata].sort((a, b) => b.school_name.localeCompare(a.school_name));
        }
        setMydata(sortedData);
    };

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.boxes}
                              onPress={() =>
                              {
                                  navigation.navigate("Details", {item});
                              }
                              }>
                <Text style={styles.textStyle}>{item.school_name}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <View style={{backgroundColor: "#909f92"}}>
            <Text style={styles.title}>Schools in SG</Text>
            <StatusBar/>
            <View style={{margin: 14, marginBottom: 20}}>
                <Text style={{color: "#000000"}}>Search:</Text>
                <TextInput style={styles.textBox} placeholder="Search for schools..." onChangeText={(text)=>{FilterData(text)}}/>
            </View>
            <View style={styles.sortContainer}>
                <Text style={{color: "#000000"}}>Sort by:</Text>
                <Picker
                    selectedValue={sortOption}
                    style={{height: 50, width: 370, backgroundColor: "#fff9f5"}}
                    onValueChange={(itemValue) => {
                        setSortOption(itemValue);
                        sortData(itemValue);
                    }}
                >
                    <Picker.Item label="A - Z" value="a-z" />
                    <Picker.Item label="Z - A" value="z-a" />
                </Picker>
            </View>
            <FlatList data={mydata} renderItem={renderItem} style={{marginBottom: 200}}/>
        </View>
    );
}

export default Home;
