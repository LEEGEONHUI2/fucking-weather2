import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, ToastAndroid, BackHandler, ActivityIndicator } from 'react-native';
import Weather from "./Weather";


export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    isLoaded: false
  };

  render() {
    //const { isLoaded } = this.state;

    return (
      <View style={styles.container}>
        {/*status bar*/}
        <StatusBar hidden={true} />
        {
          this.state.isLoaded ? <Weather /> :
            <View style={styles.Loading}>
              <Text style={styles.LoadingText}>Getting the fucking weather</Text>
            </View>
        }
      </View>
    );
  }

  // 이벤트 등록
  componentDidMount() {

    console.log("mounted");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    navigator.geolocation.getCurrentPosition(
      position => {

        console.log(position);
        this.setState({
          isLoaded: true
        });
      },
      error => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      }
    );
  }

  // 이벤트 해제
  componentWillUnmount() {
    this.exitApp = false;
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
  }
});
