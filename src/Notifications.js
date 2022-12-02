import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';


export default function Notifications() {
  const [data, setData] = useState([]);

  const url = 'https://jsonplaceholder.typicode.com/posts';

  useEffect(() => {
    getData();
    createChannels();
  }, []);

  const getData = () => {
    fetch(url)
      .then(response => response.json())
      .then(json => setData(json));
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channnel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-channnel',
      title: 'You Clicked On' + item.id,
      message: item.title,
      color: 'blue',
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channnel',
      title: 'Rahul',
      message: 'You Touch on' + item.title + '20 Seconds Ago',
      date: new Date(Date.now() + 20 * 1000),
      color: 'blue',
      allowWhileIdle: true,
    });
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              handleNotification(item);
            }}>
            <View>
              <Text>{item.id}</Text>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
