import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader';

export default class NotificationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      allNotification: []
    }
    this.ref = null
  }
  
  getNotification = () => {
    this.ref = db.collection('All_Donations').where('TargetUserID', '==', this.state.userID).where('NotificationStatus', '==', 'Unread')
    .onSnapshot((snap)=> {
      var allNoti = []
      snap.docs.map((doc)=> {
        var notification = doc.data();
        notification['doc_id'] = doc.id
        allNoti.push(notification)
      })
      this.setState({
          allNotification: allNoti
      })
    })
  }
  
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, i}) => {
    return (
      <ListItem
        key = {i}
        title = {item.Book_Name}
        subtitle = {'Requested By: '+ item.Request_By + '\n Status: '+ item.Request_Status}
        titleStyle = {{color: 'black'}}
        bottomDivider
      />
    )
  }

  componentDidMount() {
      this.getNotification();
  }
  
  render() {
    return (
      <View>
        <AppHeader title = 'Notifications' navigation = {this.props.navigation}/>
        <View>
        {
            this.state.allNotification.length === 0
            ? (
              <View>
                <Text>
                  You have no notifications
                </Text>
              </View>
            )
            : (
              <FlatList 
                keyExtractor = {this.keyExtractor}
                data = {this.state.allNotification}
                renderItem = {this.renderItem}
              />
            )
          }
        </View> 
      </View>
    )
  }
}