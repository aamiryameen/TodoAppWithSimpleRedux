

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';

import BackgroundJob from 'react-native-background-actions';
import { getApi } from '../services';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

BackgroundJob.on('expiration', () => {
  console.log('iOS: I am being closed!');
});

const taskRandom = async (taskData) => {
  if (Platform.OS === 'ios') {
    console.warn(
      'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
      'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.'
    );
  }
  await new Promise(async (resolve) => {
    // For loop with a delay
    const { delay } = taskData;
    console.log(BackgroundJob.isRunning(), delay)
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      console.log('Runned -> ', i);
      await BackgroundJob.updateNotification({ taskDesc: 'Runned -> ' + i });
      await sleep(delay);
    }
  });
};

const options = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask desc',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'exampleScheme://chat/jane',
  parameters: {
    delay: 1000,
  },
};

function handleOpenURL(evt) {
  console.log(evt.url);
  // do something with the url
}

Linking.addEventListener('url', handleOpenURL);

export default App = () => {
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null;

  let playing = BackgroundJob.isRunning();

  /**
   * Toggles the background task
   */
  const toggleBackground = async () => {
    playing = !playing;
    if (playing) {
      try {
        console.log('Trying to start background service');
        await BackgroundJob.start(taskRandom, options);
            getApi().then((response) => console.log('response', response)).
    catch((error) => console.log('error', error))
        console.log('Successful start!');
      } catch (e) {
        console.log('Error', e);
      }
    } else {
      console.log('Stop background service');
      await BackgroundJob.stop();
    }
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}> 
      <Text>Api call while runnig in background</Text>     
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={toggleBackground}>
                <Text style={{color: 'white'}}>Start Service</Text>
              </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    // backgroundColor: Colors.lighter,
flex: 1
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  body: {
    backgroundColor: Colors.white,
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  btnStyle: {
height: 50,
 width: '90%',
 justifyContent: 'center',
 alignItems: 'center',
  backgroundColor: '#34eb83',
  marginTop: 30
  }
});
