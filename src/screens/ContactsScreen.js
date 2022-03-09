import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {Voximplant} from 'react-native-voximplant';
import dummyContacts from '../../assets/data/contacts.json';

const ContactsScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredContacts, setFilteredContacts] = React.useState(dummyContacts);

  const voximplant = Voximplant.getInstance();

  React.useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      navigation.navigate('IncomingCall', {call: incomingCallEvent.call});
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  React.useEffect(() => {
    const newContacts = dummyContacts.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  const callUser = user => {
    navigation.navigate('Calling', {user});
  };

  return (
    <View style={styles.container}>
      <TextInput
        dataKey={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <FlatList
        style={{
          marginTop: 1,
        }}
        data={filteredContacts}
        keyExtractor={item => `${item.user_id}`}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => callUser(item)}
            style={{
              marginLeft: 3,
            }}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    marginVertical: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
});
