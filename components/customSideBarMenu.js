import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import WelcomeScreen from '../screens/welcomeScreen';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
    render() {
        return (
            <View>
                <View>
                    <DrawerItems {...this.props}/>
                </View>
                <View>
                    <TouchableOpacity 
                    style={styles.logoutButton}
                    onPress={()=> {
                        this.props.navigation.navigate('welcomeScreen')
                        firebase.auth().signOut()
                    }}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  logoutButton: {
    marginLeft: 15,
    marginTop: 550,
  }
})