import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ToastAndroid, BackHandler, ActivityIndicator } from 'react-native';
import Weather from "./Weather";

const API_KEY = "22bdb3ccd77e472a8f9aa781047f460b";
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
  };

  render() {
    //const { isLoaded } = this.state;

    return (
      <View style={styles.container}>
        {/*status bar*/}
        <StatusBar hidden={true} />
        {
          //true
          this.state.isLoaded ? <Weather weatherName={this.state.name} temp={Math.floor(this.state.temperature - 273.15 )}/> :
            //false
            <View style={styles.Loading}>
              <Text style={styles.LoadingText}>Getting the fucking weather</Text>
              {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
            </View>
        }
      </View>
    );
  }

  // 이벤트 등록
  componentDidMount() {

    console.log("mounted");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this._getWeather(position.coords.latitude, position.coords.longitude);
        /*
        this.setState({
          isLoaded: true
          //error: "somting went wrong.."
        });
        */
      },
      error => {
        console.log(error);
        //ToastAndroid.show(error, ToastAndroid.SHORT);
        this.setState({
          error: error
        })
      }
    );
  }

  /*
  (abc) => {console.log(abc)}
  (abc) => {abc}    == {return abc}
  function(abc) {
    console.log(abc)
  }
  */

  //날씨얻기
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then(abc => abc.json())
      .then(json => {
        console.log(json)
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded : true
        });
      })
  }

  // 이벤트 해제
  componentWillUnmount = () => {
    this.exitApp = false;

    //Back handler
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  // 이벤트 동작
  handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.exitApp == undefined || !this.exitApp) {
      ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
      this.exitApp = true;

      this.timeout = setTimeout(
        () => {
          this.exitApp = false;
        },
        2000    // 2초
      );
    } else {
      clearTimeout(this.timeout);

      BackHandler.exitApp();  // 앱 종료
    }
    return true;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    /*
    justifyContent:'center', //center
    alignItems:'center'
    */
  },
  Loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25
  },
  LoadingText: {
    fontSize: 38,
    marginBottom: 50
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent"
  }
});
