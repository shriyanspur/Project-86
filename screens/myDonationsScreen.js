import * as React from 'react';
import { Text, View, TouchableOpacity, FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import AppHeader from '../components/AppHeader';

export default class MyDonationsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: firebase.auth().currentUser.email,
      allDonations: [],
      donorName: '',
    }
    this.ref = null
  }

  getAllDonations = () => {
    this.ref = db.collection('All_Donations').where('Donor_ID', "==", this.state.userID)
    .onSnapshot((snap)=> {
      var donations = [];
      snap.docs.map((doc)=>{
        var donation = doc.data();
        donation ['doc_id'] = doc.id
        donations.push(donation);
      })

      this.setState({
        allDonations: donations
      })
    })
  }

  getDonorDetails = (DonorID) => {
    db.collection('Users').where('Email_ID', '==', DonorID).get()
    .then((snap)=> {
      snap.forEach((doc)=>{
        this.setState({
          donorName: doc.data().First_Name + ' ' + doc.data().Last_Name
        })
      })
    })
  }

  sendBook = (BookDetails) => {
    if (BookDetails.Request_Status == 'Book Sent') {
      var requestStatus = 'Donor Interested';

      db.collection('All_Donations').doc(BookDetails.doc_id).update({
        Request_Status: 'Donor Interested',
      })

      this.sendNotification(BookDetails, requestStatus);
    }
    else {
      var requestStatus = 'Book Sent';

      db.collection('All_Donations').doc(BookDetails.doc_id).update({
        Request_Status: 'Book Sent',
      })

      this.sendNotification(BookDetails, requestStatus);
    }
  }

  sendNotification = (BookDetails, RequestStatus) => {
    var requestID = BookDetails.Request_ID;
    var donorID = BookDetails.Donor_ID;

    db.collection('All_Notifications').where('Donor_ID', '==',  donorID).where('Request_ID', '==', requestID).get()
    .then((snap)=> {
      snap.forEach((doc)=> {
        var message;

        if (RequestStatus === 'Book Sent') {
          message = this.state.donorName + ' sent you a book !!!'
        }
        else {
          message = this.state.donorName + ' has shown interest in sharing the book.'
        }
        db.collection('All_Notifications').doc(doc.id).update({
          Message: message,
          NotificationStatus: 'Unread',
          RequestDate: firebase.firestore.FieldValue.serverTimestamp(),
        })
      })
    })
  }

  componentDidMount() {
    this.getAllDonations();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item, i}) => {
    console.log(this.state.reqBookList);
    return (
      <ListItem
        key = {i}
        title = {item.Book_Name}
        subtitle = {'Requested By: '+ item.Request_By + '\n Status: '+ item.Request_Status}
        titleStyle = {{color: 'black'}}
        rightElement = {
          <TouchableOpacity onPress={this.sendBook(item)}>
            <Text>
              {
                item.Request_Status === 'Book Sent'
                ? (
                  'Book Sent !'
                )
                : (
                  'Send Book'
                )
              }
            </Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }

  render() {
    return (
      <View>
        <AppHeader title = 'My Donations' navigation={this.props.navigation}/>
        <View>
          {
            this.state.allDonations.length === 0
            ? (
              <View>
                <Text>
                  List of my book donations
                </Text>
              </View>
            )
            : (
              <FlatList 
                keyExtractor = {this.keyExtractor}
                data = {this.state.allDonations}
                renderItem = {this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}