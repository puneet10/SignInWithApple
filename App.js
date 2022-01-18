import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import TouchID from 'react-native-touch-id';

const App = () => {
  const [isAuth, setIsAuth] = useState(false)
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const pressHandler = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        console.log('bio', biometryType)
        // Success code
        if (biometryType) {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              alert('Authenticated Successfully');
              setIsAuth(true)
            })
            .catch(error => {
              setIsAuth(false)
            });
        } else {
          alert('Turn on Touch / Touch not supported')
          setIsAuth(false)
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });

  }
  const pressHandlerIos = () => {
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        console.log('bio', biometryType)
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              alert('Authenticated Successfully');
              setIsAuth(true)
            })
            .catch(error => {
              setIsAuth(false)
            });
        } else {
          console.log('TouchID is supported.');
          TouchID.authenticate('', optionalConfigObject)
            .then(success => {
              alert('Authenticated Successfully');
              setIsAuth(true)
            })
            .catch(error => {
              setIsAuth(false)
            });
        }
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });

  }
  const backPressHandler = () => {
    setIsAuth(false)
  }
  return (
    <View
      style={styles.container}>
      {!isAuth ?
        <TouchableHighlight style={styles.loginButton} onPress={Platform.OS === 'ios' ? pressHandlerIos : pressHandler}>
          <Text style={styles.buttonText}>click to Login with TouchID/ FaceID</Text>
        </TouchableHighlight> :
        <View>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>USER Authenticated</Text>
          </View>
          <TouchableHighlight style={styles.loginButton} onPress={backPressHandler}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    backgroundColor: 'white',
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    padding: '2%'
  },
  buttonText: {
    textAlign: 'center',
    color: 'black'
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'lightgreen'
  }
});

export default App;
