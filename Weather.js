import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

/*
export default class Weather extends Component{

    render () {
        return (
            <LinearGradient colors={["#00C6FB", "#005BEA"]} style={styles.container}>
                <View style={styles.upper}>
                    <Ionicons color="white" size={144} name="ios-rainy" />
                    <Text style={styles.temp}>35도</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>Raing like a MF</Text>
                    <Text style={styles.subtitle}>For more info look outside</Text>
                </View>
            </LinearGradient>
        );
    }
}
*/

const weatherCases = {
    Rain: {
        colors: ["#00C6FB", "#005BEA"],
        title: "비가 옵니다!",
        subtitle: "창밖을 보세요",
        icon: "ios-rainy",
    },
    Clear: {
        colors: ["#FEF253", "#FF7300"],
        title: "날씨가 맑네요~",
        subtitle: "창밖을 보세요",
        icon: "ios-sunny",
    },
    Thunderstorm: {
        colors: ["#00ECBC", "#007ADF"],
        title: "천둥번개가 칩니다!",
        subtitle: "창밖을 보세요",
        icon: "ios-thunderstorm",
    },
    Clouds: {
        colors: ["#D7D2CC", "#304352"],
        title: "구름이 많아요!",
        subtitle: "창밖을 보세요",
        icon: "ios-cloudy",
    },
    Snow: {
        colors: ["#7DE2FC", "#B9B6E5"],
        title: "눈이 내립니다~",
        subtitle: "창밖을 보세요",
        icon: "ios-snow",
    },
    Drizzle: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "날씨가 쌀쌀합니다!",
        subtitle: "창밖을 보세요",
        icon: "ios-rainy-outline",
    },
    Haze: {
        colors: ["#89F7FE", "#66A6FF"],
        title: "안개가 가득합니다!",
        subtitle: "창밖을 보세요",
        icon: "ios-rainy-outline",
    },


}
//jsx 즉, view 에서 넘어온값은, 상위컴포넌트에서 하위컴포넌트로 넘길때는 Prop라는 객체에 넣어서 전달, 그래서 {}를 통해서 값을 빼야한다.
function Weather({ weatherName, temp }) {
    console.log(weatherName + " / " + temp)
    return (
        <LinearGradient colors={weatherCases[weatherName].colors} style={styles.container}>
            <View style={styles.upper}>
                <Ionicons color="white" size={144} name={weatherCases[weatherName].icon} />
                <Text style={styles.temp}>{temp}도</Text>
            </View>
            <View style={styles.lower}>
                <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
                <Text style={styles.subtitle}>{weatherCases[weatherName].subtitle}</Text>
            </View>
        </LinearGradient>
    )
}
export default Weather;

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    weatherName : PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        backgroundColor: "transparent",
    },
    lower: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25
    },
    temp: {
        fontSize: 48,
        color: 'white',
        backgroundColor: "transparent",
        marginBottom: 24,
    },
    title: {
        fontSize: 38,
        color: 'white',
        backgroundColor: "transparent",
        marginBottom: 10,
        fontWeight: "300",
    },
    subtitle: {
        fontSize: 24,
        color: 'white',
        backgroundColor: "transparent",
        marginBottom: 70,
    },
})