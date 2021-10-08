/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {RemoteConfigService} from './RemoteConfigService';

const App: () => Node = () => {
  const [remoteConfigValue, setRemoteConfigValue] = useState('');

  useEffect(() => {
    (async () => {
      await RemoteConfigService.init(false);

      setRemoteConfigValue(await RemoteConfigService.getParams());
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.lighter,
      }}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          backgroundColor: Colors.lighter,
        }}>
        <Header />
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 16,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Text style={{flex: 1}}>Use Dev App:</Text>
            <Switch value={RemoteConfigService.useDev} disabled={true} />
          </View>

          <Text>Current Value: {remoteConfigValue}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
