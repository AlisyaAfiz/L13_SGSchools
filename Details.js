import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight:'bold',
        paddingBottom: 50,
        textDecorationLine: 'underline'
    },
    box: {
        borderWidth: 2,
        margin: 40,
        marginTop: 230,
        paddingTop: 30,
        paddingBottom: 30,
        borderRadius: 10,
        backgroundColor: "#fff9f5",
        elevation: 20
    },
    label: {
        marginLeft: 40,
        textAlign: "left",
        fontWeight: "bold",
        flexShrink: 1
    },
    value: {
        marginRight: 40,
        textAlign: "right",
        flexShrink: 2
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    linkText: {
        color: "blue",
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 5,
    },
    textStyle: {
        padding: 5,
        marginLeft: 40
    }
});

const Details = ({route}) => {
    const {item} = route.params;

    return (
        <View style={{backgroundColor: "#909f92", paddingBottom: 250}}>
            <View style={styles.box}>
                <Text style={styles.title}>{item.school_name}</Text>

                <View style={styles.info}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{item.address}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>Type:</Text>
                    <Text style={styles.value}>{item.type_code}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>Nature:</Text>
                    <Text style={styles.value}>{item.nature_code}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.label}>Education Level:</Text>
                    <Text style={styles.value}>{item.mainlevel_code}</Text>
                </View>

                <Text style={{ paddingTop: 50, textAlign: "center" }}>For more information, go to</Text>
                <Text style={styles.linkText}>{item.url_address}</Text>
            </View>
        </View>
    );
}

export default Details;