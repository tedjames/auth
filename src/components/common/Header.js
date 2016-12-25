import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '@shoutem/ui';

class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 65,
    paddingTop: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    zIndex: 5
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    color: '#eee',
    letterSpacing: 1.25,
    fontFamily: 'Rubik',
  },
  icon: {
    color: '#eee',
    position: 'relative',
    bottom: 4,
    marginLeft: 10,
    marginRight: 10
  }
};

export { Header };
