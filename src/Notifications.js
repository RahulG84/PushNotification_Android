import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment/moment';

export default function Notifications() {
  const currentTime = new Date();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [selectDate, setSelectDate] = useState([currentTime]);
  const [selectDate, setSelectDate] = useState('');
  const [title, setTile] = useState('');
  const [message, setMessage] = useState('');
  console.log('title : ', title);
  console.log('msg : ', message);

  useEffect(() => {
    createChannels();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channnel',
      channelName: 'Test Channel',
    });
  };

  const handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channnel',
      title: title,
      message: message,
      color: 'blue',
    });

    PushNotification.localNotificationSchedule({
      channelId: 'test-channnel',
      title: 'Rahul',
      message: message + ' Schedule Message',
      // date: new Date(Date.now() + 5 * 1000),
      date: new Date(selectDate),
      // date: moment(selectDate).format('hh:mm:ss A'),
      color: 'blue',
      allowWhileIdle: true,
    });

    setTile('');
    setMessage('');
  };

  const deleteDate = () => {
    setSelectDate(null);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = time => {
    console.log('A date has been picked: ', time);
    setSelectDate(time);
    hideDatePicker();
  };

  return (
    <View>
      <View>
        <TextInput
          defaultValue={title}
          placeholder="Enter Notification Title"
          onChangeText={t => setTile(t)}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Enter Notification Message"
          value={message}
          onChangeText={m => setMessage(m)}
          style={styles.textInput}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleNotification();
          }}>
          <Text style={styles.buttontext}>Get Notification</Text>
        </TouchableOpacity>
      </View>
      <View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          // onChange={date => setSelectDate(moment(date).format('DD-MM-YY'))}
          onChange={date => setSelectDate(moment(date).format('h:mm:ss A'))}
        />
      </View>
      <View style={styles.Textview}>
        <Text style={styles.textView}>
          {selectDate
            ? // ? moment(selectDate).format('MMM Do YYYY, hh:mm:ss A')
              moment(selectDate).format('hh:mm:ss A')
            : 'Please select date'}
        </Text>
      </View>

      <View style={styles.removeView}>
        <Button title="Remove" onPress={deleteDate} />
      </View>
      <View style={{marginTop: 10, marginHorizontal: 20}}>
        <Button title="+ Add Date And Time" onPress={showDatePicker} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    marginTop: 20,
    marginHorizontal: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  button: {
    backgroundColor: 'blue',
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 7,
  },
  buttontext: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  mainConatiner: {
    flex: 0.8,
    marginTop: 30,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  bottomBtn: {
    flex: 0.2,
    paddingHorizontal: 10,
    marginBottom: -40,
  },
  textView: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  removeView: {
    paddingTop: 30,
    marginTop: 10,
    // marginLeft: -60,
    marginHorizontal: 20,
  },
  Textview: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: -10,
  },
});

// const App = () => {

//   const deleteDate = () => {
//     setSelectDate(null);
//   };

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = datetime => {
//     console.log('A date has been picked: ', datetime);
//     setSelectDate(datetime);
//     hideDatePicker();
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View style={styles.mainConatiner}>
//         <View>
//           <DateTimePickerModal
//             isVisible={isDatePickerVisible}
//             mode="datetime"
//             onConfirm={handleConfirm}
//             onCancel={hideDatePicker}
//             onChange={date => setSelectDate(moment(date).format('DD-MM-YY'))}
//           />
//         </View>
//         <View style={styles.Textview}>
//           <Text style={styles.textView}>
//             {selectDate
//               ? moment(selectDate).format('MMMMM Do YYYY, h:mm:ss a')
//               : 'Please select date'}
//           </Text>
//         </View>

//         <View style={styles.removeView}>
//           <Button title="Remove" onPress={deleteDate} />
//         </View>
//       </View>
//       <View style={styles.bottomBtn}>
//         <Button title="+ Add Date And Time" onPress={showDatePicker} />
//       </View>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   mainConatiner: {
//     flex: 0.8,
//     marginTop: 30,
//     paddingLeft: 10,
//     flexDirection: 'row',
//   },
//   bottomBtn: {
//     flex: 0.2,
//     paddingHorizontal: 10,
//     marginBottom: -40,
//   },
//   textView: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'red',
//   },
//   removeView: {
//     paddingTop: 30,
//     marginTop :10,
//     marginLeft : -60
//   },
//   Textview : {
//     marginTop : -5
//   }
// });

// return (
//   <View style={{flex:1}}>
//     <View style={styles.mainConatiner}>
//     <View>
//     <DateTimePickerModal
//       isVisible={isDatePickerVisible}
//       mode="datetime"
//       onConfirm={handleConfirm}
//       onCancel={hideDatePicker}
//       onChange={(date) => setSelectDate(moment(date).format('DD/MM/YY'))}
//     />
//     <Text style={styles.textView}>
//       {selectDate ? moment(selectDate).format('DD/MM/YY :  HH:MM') : "Please select date"}
//     </Text>
//     </View>
//     <View style={styles.removeView}>
//     <Button title="Remove" onPress={deleteDate}/>
//     </View>
//     </View>
//     <View style={styles.bottomBtn}>
//     <Button title="+ Add Date And Time" onPress={showDatePicker} />
//     </View>
//   </View>
// );
// };

{
  /* <View>
{

  show ? (
    <FlatList
    data={selectDate}
    renderItem={({ item }) =>(
      <View>
      <Text>{item.getTime}</Text>
      </View>
    )}
  />
  ) : (null)

}
   </View> */
}

// const getData = () => {
//   fetch(url)
//     .then(response => response.json())
//     .then(json => setData(json));
// };

{
  /* <FlatList
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
      /> */
}

// const handleNotification = item => {
//   PushNotification.localNotification({
//     channelId: 'test-channnel',
//     title: 'You Clicked On' + item.id,
//     message: item.title,
//     color: 'blue',
//   });

//   PushNotification.localNotificationSchedule({
//     channelId: 'test-channnel',
//     title: 'Rahul',
//     message: 'You Touch on' + item.title + '20 Seconds Ago',
//     date: new Date(Date.now() + 20 * 1000),
//     color: 'blue',
//     allowWhileIdle: true,
//   });
// };

// const url = 'https://jsonplaceholder.typicode.com/posts';
// getData();
