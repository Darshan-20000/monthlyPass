/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {home, more, qrCode, rider, star, ticket} from '../constant/imgindex';
import {SvgImg} from '../components/SvgImg';

const {height, width} = Dimensions.get('window');
function App() {
  const colors = [
    '#8F8F8F',
    '#CB8BC7',
    '#44A25A',
    '#F2CED5',
    '#F5DF25',
    '#D62104',
    '#0C84E9',
  ]; // Array of colors
  const stripColor = ['#02015E', '#1409BE', '#540C20'];
  const [colorIndex, setColorIndex] = useState(0); // Index to track current color
  const repeatDuration = 30 * 60; // 30 minutes in seconds
  const currentSeconds = new Date().getSeconds();
  const [zone, setZone] = useState(2);
  const [timeLeft, setTimeLeft] = useState(repeatDuration); // Timer state
  const [currentTime, setCurrentTime] = useState(moment());
  const [state, setState] = useState(true); // Initial state set to true
  const [intervalId, setIntervalId] = useState(null); // To store the interval ID for clearing it

  useEffect(() => {
    StatusBar.setBackgroundColor('#000');
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(() => {
      setState(prevState => !prevState); // Toggle between true and false
    }, 500); // 5 milliseconds interval

    setIntervalId(id);

    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000); // Update every second

    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          return repeatDuration; // Reset to 30 minutes
        }
        return prevTime - 1; // Decrement time
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    }; // Cleanup on component unmount
  }, []);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const changeColor = () => {
    // Increment the color index and wrap around using modulo operator
    setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
  };

  return (
    <SafeAreaView style={{...styles.container}}>
      <View style={{...styles.container}}>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            activeOpacity={1}
            style={{height: 120, width: 120, borderRadius: 5, borderWidth: 1}}
            onPress={changeColor}>
            <Text
              style={{
                marginTop: 5,
                fontWeight: 'bold',
                marginLeft: 5,
                fontSize: 18,
              }}>
              One Way
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                marginLeft: 5,
                fontSize: 22,
              }}>
              1 Adult
            </Text>
          </TouchableOpacity>
          <View>
            <Image source={qrCode} style={{height: 120, width: 120}} />
            <Text
              style={{
                marginTop: 5,
                marginLeft: 5,
                fontSize: 11,
                alignSelf: 'center',
              }}>
              Tap to enlarge
            </Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', alignSelf: 'center'}}>
            INTRASTATE
          </Text>
          <View
            style={{
              height: 140,
              marginHorizontal: 15,
              marginTop: 2,
              overflow: 'hidden',
              borderRadius: 15,
            }}>
            <LinearGradient
              style={{
                padding: 5,
                alignContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              colors={[colors[colorIndex], '#fff', colors[colorIndex]]}
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}>
              <View
                style={{
                  padding: 5,
                  alignContent: 'center',
                  alignItems: 'center',
                  marginTop: 2,
                  marginHorizontal: 15,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontSize: 90,
                    lineHeight: 90,
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  {zone}
                </Text>
                <Text style={{fontSize: 22, fontWeight: 'bold', top: -20}}>
                  ZONE RIDE
                </Text>
                <Text style={{fontSize: 11, fontWeight: 'bold', top: -20}}>
                  **Not Valid for HBLR**
                </Text>
              </View>
            </LinearGradient>
            <View
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={() => {
                  if (zone != 1) setZone(zo => zo - 1);
                }}
              />
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={() => {
                  if (zone != 15) setZone(zo => zo + 1);
                }}
              />
            </View>
          </View>
          <Text style={{textAlign: 'center', marginTop: 5}}>
            Valid Validator Instuctions
          </Text>
        </View>

        <View style={{}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', alignSelf: 'center'}}>
            {currentTime.format('hh:mm:ss A')}
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', alignSelf: 'center'}}>
            {moment().format('dddd, ll')}
          </Text>
          {state ? (
            <View
              style={{
                height: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                marginVertical: 5,
              }}>
              <View style={{flex: 1, backgroundColor: stripColor[0]}} />
              <View style={{flex: 1, backgroundColor: stripColor[1]}} />
              <View style={{flex: 1, backgroundColor: stripColor[2]}} />
            </View>
          ) : (
            <View
              style={{
                height: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
                marginVertical: 5,
              }}
            />
          )}
          <Text style={{textAlign: 'center', marginTop: 5, fontWeight: 'bold'}}>
            Expires in 00:00:{formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <SvgImg iconName={star} size={30} />
          <Text style={{...styles.bottomTxt, marginTop: 0}}>Favorites</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <SvgImg iconName={ticket('#004F9B')} size={25} />
          <View
            style={{
              width: 10,
              height: 10,
              position: 'absolute',
              justifyContent: 'center',
              left: 45,
              top: 2,
              alignContent: 'center',
            }}>
            <Text
              style={{
                backgroundColor: 'red',
                borderRadius: 100,
                color: 'white',
                fontSize: 8,
                textAlign: 'center',
              }}>
              1
            </Text>
          </View>

          <Text style={{...styles.bottomTxt, color: '#004F9B'}}>
            My Tickets
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <SvgImg iconName={home()} size={25} />
          <Text style={styles.bottomTxt}>Home</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image source={rider} style={{height: 20, width: 20}} />
          <Text style={{...styles.bottomTxt, marginTop: 10}}>Rider Tools</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <SvgImg iconName={more()} size={25} />
          <Text style={styles.bottomTxt}>More</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomTxt: {
    fontSize: 10,
    color: '#8F8F8F',
    marginTop: 5,
  },
});

export default App;
