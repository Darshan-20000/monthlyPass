import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import {SvgImg} from '../components/SvgImg';
import {leftIcon} from '../constant/imgindex';
import moment from 'moment';

const {height, width} = Dimensions.get('window');

export default function NewMyTicket() {
  const [remainingDays, setRemainingDays] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [showStrip, setShowStrip] = useState(true); // blinking state
  const stripColor = ['#02015E', '#1409BE', '#540C20']; // strip colors

  // Calculate month progress
  useEffect(() => {
    StatusBar.setBackgroundColor('#1D86D7');
    StatusBar.setBarStyle('light-content');

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const currentDay = now.getDate();

    const progressPercent = (currentDay / totalDays) * 100;
    setRemainingDays(totalDays - currentDay);

    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  // Blinking strip
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowStrip(prev => !prev); // toggle every 500ms
    }, 500);

    return () => clearInterval(blinkInterval); // cleanup
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: [0, width / 1.4],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.subContainer}>
        <View
          style={{padding: 10, flexDirection: 'row', alignContent: 'center'}}>
          <SvgImg iconName={leftIcon()} size={30} />
          <Text
            style={{
              alignSelf: 'center',
              flex: 1,
              textAlign: 'center',
              fontWeight: '700',
              marginRight: width / 10,
              color: '#ffff',
            }}>
            Monthly Pass
          </Text>
        </View>
      </View>

      {/* Main Card */}
      <View style={styles.mainView}>
        <View style={{flex: 1, alignContent: 'center'}}>
          <View
            style={{
              marginTop: height / 20,
              backgroundColor: '#BE87BA',
              alignSelf: 'center',
              padding: 15,
              borderRadius: 15,
            }}>
            <Image
              style={{
                height: 140,
                width: 140,
              }}
              source={require('./../../qr.png')}
            />
          </View>
          <Text style={{textAlign: 'center', fontSize: 12}}>
            Tap to enlarge
          </Text>

          <Text
            style={{
              textAlign: 'center',
              color: '#FF3237',
              fontSize: 28,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            INTERSTATE
          </Text>
          <View style={{flexShrink: 0.15}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginHorizontal: 15,
              }}>
              <View
                style={{
                  top: -5,
                  position: 'absolute',
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  borderWidth: 3,
                  backgroundColor: '#BE87BA',
                  alignContent: 'center',
                  alignSelf: 'flex-start',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#ffffff',
                  }}>
                  Nov{`\n`}2025
                </Text>
              </View>
              <View style={{top: -10, flex: 1}}>
                <Text
                  style={{
                    fontSize: 55,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  2
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  ZONE RIDE
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Blinking Color Strip */}
        {showStrip && (
          <View
            style={{
              height: 20,
              marginHorizontal: 30,
              flexDirection: 'row',
              // marginVertical: 5,
            }}>
            <View style={{flex: 1, backgroundColor: stripColor[0]}} />
            <View style={{flex: 1, backgroundColor: stripColor[1]}} />
            <View style={{flex: 1, backgroundColor: stripColor[2]}} />
          </View>
        )}

        {/* Progress Bar */}
        <View style={{alignSelf: 'center', marginTop: 20}}>
          <View
            style={{
              width: width / 1.4,
              backgroundColor: '#E2E2E2',
              height: 4,
              borderRadius: 10,
              marginBottom: 10,
            }}>
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: '#1D86D7',
                borderRadius: 10,
                width: progressWidth,
              }}
            />
          </View>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              color: 'black',
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            Expires in {remainingDays} day{remainingDays !== 1 ? 's' : ''}
          </Text>

          <Text
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'black',
              textDecorationLine: 'underline',
              marginBottom: 5,
            }}>
            View Onboard Validator Instructions
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  subContainer: {
    flex: 0.35,
    backgroundColor: '#1D86D7',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  mainView: {
    backgroundColor: '#fff',
    zIndex: 1,
    position: 'absolute',
    top: 50,
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 20,
    elevation: 10,
  },
});
