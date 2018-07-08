/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Alert} from 'react-native';
import firebase from 'react-native-firebase'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state= {
    new_update : false
  }
  componentDidMount(){
    if(__DEV__){
      firebase.config().enableDeveloperMode();
    }

    firebase.config().setDefaults({
      new_update: false,
    });

    
  }

  fetchFire(){
    console.log(899)
    firebase.config().fetch()
    .then(() => {
      return firebase.config().activateFetched();
    }).then((activated) => {
      console.log('activated', activated)
      if (!activated) console.log('Fetched data not activated');
      return firebase.config().getValue('new_update');
    })
    .then((snapshot) => {
      console.log(snapshot, 'snapshot')
      console.log('val', snapshot.val())
      const new_update = snapshot.val();
  
      if(new_update) {
        this.setState({
          new_update
        })
      }
  
      // continue booting app
    })
    .catch(console.error);
    // firebase.config().fetch()
    //   .then(() => firebase.config().activateFetched())
    //   .then(() => config.getValue('new_update'))
    //   .then(data => {
    //     console.log(data, 'data')
    //     return (
    //       <View>
    //         <Text>ahahhahah</Text>
    //     <Text>update : {data}</Text>
    //     </View>
    //   )
    //   }).catch(err => <Text>{err}</Text>)
  }

  renderA(){
    if(this.state.new_update){
      return <Text>New Update</Text>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        {this.fetchFire()}
        {this.renderA()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
