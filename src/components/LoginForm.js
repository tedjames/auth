import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button, Spinner } from '@shoutem/ui';
import firebase from 'firebase';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      email: '',
      pass: '',
      error: '',
      loading: false
    });
  }
  onButtonPress() {
    const { email, pass } = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }
  renderSpinner() {
    if(this.state.loading === true) {
      return <Spinner />;
    }
    return (
      <Button style={styles.button} onPress={this.onButtonPress.bind(this)}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>
    );
  }
  onLoginFail () {
    this.setState({ error: 'Authentication Failed', loading: false })
  }
  onLoginSuccess() {
    this.setState({ error: '', loading: false, email: '', pass: '' })
  }
  render() {
    return(
      <View>
        <View style={styles.loginContainer} >
          <TextInput
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={ email => this.setState({ email }) }
          />
          <TextInput
            placeholder={'Password'}
            value={this.state.pass}
            onChangeText={ pass => this.setState({ pass }) }
            secureTextEntry
          />
          <Text style={styles.errorText} >{this.state.error}</Text>
          {this.renderSpinner()}
        </View>
      </View>
    );
  }
}

const styles = {
  loginContainer: {
    margin: 15,
    marginTop: 80
  },
  button: {
    backgroundColor: '#00a3ff',
    height: 40
  },
  buttonText: {
    color: '#fff',
  },
  errorText: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }

}
