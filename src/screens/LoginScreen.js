import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS, SIZES, FONTS} from '../components';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../Constants';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const voximplant = Voximplant.getInstance();
  //const navigation = useNavigation();

  React.useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();
      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (status === Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
        //navigation.navigate('Contacts');
      }
    };
    connect();
  }, []);

  const signIn = async () => {
    try {
      const fqUsername = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(fqUsername, password);

      redirectHome();
      //navigation.navigate('Contacts');
    } catch (e) {
      let message;
      switch (e.name) {
        case Voximplant.ClientEvents.ConnectionFailed:
          message = 'Connection error, check your internet connection';
          break;
        case Voximplant.ClientEvents.AuthResult:
          message = convertCodeMessage(e.code);
          break;
        default:
          message = 'Unknown error. Try again';
      }
      showLoginError(message);
    }
  };

  const redirectHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };

  // async function login() {
  //   try {
  //     let clientState = await voximplant.getClientState();
  //     if (clientState === Voximplant.ClientState.DISCONNECTED) {
  //       await voximplant.connect();
  //       await voximplant.login(
  //         `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
  //         password,
  //       );
  //     }
  //     if (clientState === Voximplant.ClientState.CONNECTED) {
  //       await voximplant.login(
  //         `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
  //         password,
  //       );
  //     }
  //     navigation.navigate('Main');
  //   } catch (e) {
  //     let message;
  //     switch (e.name) {
  //       case Voximplant.ClientEvents.ConnectionFailed:
  //         message = 'Connection error, check your internet connection';
  //         break;
  //       case Voximplant.ClientEvents.AuthResult:
  //         message = convertCodeMessage(e.code);
  //         break;
  //       default:
  //         message = 'Unknown error. Try again';
  //     }
  //     showLoginError(message);
  //   }
  // }

  const convertCodeMessage = code => {
    switch (code) {
      case 401:
        return 'Invalid password';
      case 404:
        return 'Invalid user';
      case 491:
        return 'Invalid state';
      default:
        return 'Try again later';
    }
  };

  const showLoginError = message => {
    Alert.alert('Login error', message, [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="User Name"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '80%',
    ...FONTS.h3,
  },
  button: {
    backgroundColor: COLORS.darkGreen,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    textAlign: 'center',
    ...FONTS.h4,
  },
});
