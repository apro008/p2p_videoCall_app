import React, {useState} from 'react';
import {Pressable, StyleSheet, TouchableOpacity, View} from 'react-native';

import {COLORS, SIZES} from '../components';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialsIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CallActionBox = ({onHangUpPress}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraReverse, setIsCameraReverse] = useState(true);

  const onReverseCamera = () => {
    setIsCameraReverse(!isCameraReverse);
  };

  const ontoggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const onToggleMicrophone = () => {
    setIsMicOn(!isMicOn);
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={onReverseCamera}>
        <Ionicons
          name={
            isCameraReverse ? 'ios-camera-reverse' : 'camera-reverse-outline'
          }
          size={SIZES.icon}
          color={COLORS.white2}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={ontoggleCamera}>
        <MaterialsIcons
          name={isCameraOn ? 'camera-off' : 'camera'}
          size={SIZES.icon}
          color={COLORS.white2}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onToggleMicrophone}>
        <MaterialsIcons
          name={isMicOn ? 'microphone-off' : 'microphone'}
          size={SIZES.icon}
          color={COLORS.white2}
        />
      </TouchableOpacity>
      <Pressable
        style={[styles.iconButton, {backgroundColor: 'red'}]}
        onPress={onHangUpPress}>
        <MaterialsIcons
          name="phone-hangup"
          size={SIZES.icon}
          color={COLORS.white2}
        />
      </Pressable>
    </View>
  );
};

export default CallActionBox;

const styles = StyleSheet.create({
  buttonsContainer: {
    backgroundColor: COLORS.lightGray2,
    padding: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#4a4a4a',
    padding: 15,
    borderRadius: 50,
  },
});
