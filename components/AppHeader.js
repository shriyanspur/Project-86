import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class AppHeader extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      value: '',
    }
  }

  render() {
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color = '#696969'/>}
        centerComponent={{ text: props.title, style: { color: 'white', fontSize: 28.064, marginTop: -5 }}}
        containerStyle={{ backgroundColor: '#EB4B4B' }}
      />
    )
  }
}