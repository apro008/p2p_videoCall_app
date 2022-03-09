import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';

import {Navigation} from './src/navigation';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
