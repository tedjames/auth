import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import firebase from 'firebase';
// Components
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
// Shoutem UI Kit
import { Button, Spinner } from '@shoutem/ui';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      loggedIn: false
    });
  }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBfgcsot4I2TQnK97ikKpLUcZkboLH8ugk",
      authDomain: "udemyauth-de3f5.firebaseapp.com",
      databaseURL: "https://udemyauth-de3f5.firebaseio.com",
      storageBucket: "udemyauth-de3f5.appspot.com",
      messagingSenderId: "591534745930"
    });
    // Is the user signed in?
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        // if the user is logged in...
        this.setState({ loggedIn: true });
      } else {
        // if the user is note logged in...
        this.setState({ loggedIn: false });
      }
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return(
          <Button style={styles.button} onPress={() => firebase.auth().signOut()}>
            <Text style={styles.buttonText}>Log Out</Text>
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }
  render() {
    return (
      <View style={styles.container} >
        <Header text="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#303030',
    height: 800
  },
  globe: {
    width: 250,
    height: 187.5,
    alignSelf: 'center',
    marginTop: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#00a3ff',
    height: 40
  },
  buttonText: {
    color: '#fff',
  },
};
