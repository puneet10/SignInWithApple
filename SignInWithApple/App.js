import React from 'react';
import { Alert, Platform, View } from 'react-native';
import { appleAuth,appleAuthAndroid, AppleButton } from '@invertase/react-native-apple-authentication';


const App = () => {
  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log('appleAuthRequestResponse', appleAuthRequestResponse)
    Alert.alert('Sign In Successfull', 'Auth Details\n'+
    '\nAuth Code\n' + appleAuthRequestResponse.authorizationCode +
    '\nIdentity Token\n' + appleAuthRequestResponse.identityToken
    , [
      {
        text: 'OK',
        onPress: () => {
          
        },
      },
      {
        text: 'CANCEL',
        style: 'destructive',
        cancelable: true,
      },
    ]);
  }
  async function onAppleButtonPressAndroid() {
   // Generate secure, random values for state and nonce
  const rawNonce = uuid();
  const state = uuid();

  // Configure the request
  appleAuthAndroid.configure({
    // The Service ID you registered with Apple
    clientId: 'com.coredo.applesignin',

    // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
    // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
    redirectUri: 'https://example-app.com/redirect',

    // The type of response requested - code, id_token, or both.
    responseType: appleAuthAndroid.ResponseType.ALL,

    // The amount of user information requested from Apple.
    scope: appleAuthAndroid.Scope.ALL,

    // Random nonce value that will be SHA256 hashed before sending to Apple.
    nonce: rawNonce,

    // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
    state,
  });

  // Open the browser window for user sign in
  const response = await appleAuthAndroid.signIn();
  console.log('responseAndroid',response)
  // Send the authorization code to your backend for verification
  }

  return (
    <View>
      {appleAuthAndroid.isSupported ? 
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          alignSelf: 'center',
          marginTop: '100%',
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPressAndroid()}
      /> : 
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          alignSelf: 'center',
          marginTop: '100%',
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
      }
    </View>
  );
}
export default App;