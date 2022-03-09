import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import {COLORS, SIZES} from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Voximplant} from 'react-native-voximplant';
import {useRoute, useNavigation} from '@react-navigation/native';

const IncomingCallScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const call = route.params.call;

  console.log(`call`, call);

  const [caller, setCaller] = React.useState(null);

  const onAccept = () => {
    navigation.navigate('Calling', {
      call,
      isIncomingCall: true,
    });
  };
  const onDecline = () => {
    call.decline();
  };

  React.useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate('Contacts');
    });

    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/bg/bg.jpg')}
      resizeMode="cover"
      style={styles.ImageBackground}>
      <StatusBar translucent backgroundColor="transparent" />
      <Text style={[styles.text]}>{caller}</Text>
      <Text style={styles.phoneNumber}>WhatsApp Video...</Text>

      <View style={[styles.row, {marginTop: 'auto'}]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" color="white" size={30} />
          <Text style={styles.iconText}>Remind me</Text>
        </View>
        <View style={styles.iconContainer}>
          <Entypo name="message" color="white" size={30} />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>
      <View style={styles.row}>
        {/* Decline Button */}
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        {/* Accept Button */}
        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, {backgroundColor: '#2e7bff'}]}>
            <Feather name="check" color="white" size={40} />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  iconButtonContainer: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconText: {
    fontSize: 15,
    color: 'white',
    marginTop: 10,
  },
  row: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'white',
  },
  ImageBackground: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.lightGreen,
    padding: 10,
    paddingBottom: 50,
  },
});
