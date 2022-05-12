import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';
import { TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useState,useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { useFonts,Ubuntu_400Regular } from '@expo-google-fonts/ubuntu';
import AppLoading from 'expo-app-loading';

const audio = "https://icecast.skyrock.net/s/natio_aac_128k?tvr_name=website_fm_app&tvr_section2=1.0&deviceId=38E3D9E2A1E24E4F871E91CEE779BDC6&tvr_section3=skyf_html5&token=WE2%24YnN%2FBA%24nw3ao8iEM1J%2F9oOAWzFYVh8iQGu8EwPqIV097HfCz%2FE&aw_0_req.userConsentV2=CPYfsMAPYfsMAAKAoAFRCNCsAP_AAH_AAAqIIttd_X__bX9j-_5_fft0eY1P9_r3_-QzjhfNs-8F3L_W_L0X42E7NF36pq4KuR4Eu3LBIQNlHMHUTUmwaokVrzHsak2cpyNKJ7LEknMZO2dYGH9Pn9lDuYKY7_5___bx3j-v_t_-39T378Xf3_d5_2---vCfV599jbn9fV___9nP___9v-_8________giyASYal5AF2ZY4Mm0aRQogRhWEhVAoAKKAYWiKwAcHBTsrAJ9QQsAEAqQjAiBBiCjBgEAAgkASERASAFggEQBEAgABAAiAQgAImAQWAFgYBAAKAaFiAFAAIEhBkQERymBAVIlFBLZWIJQV7GmEAdZ4EUCiMioAESSQgkBASFg5jgCQEvFkgaYoXyAEYIAAA.YAAAAAAAAAAA&rgpdstatus=ok&ts=1651736440";

const callLink = () => {
  Linking.openURL('tel: 0756321367');
};

const Contact = () => (
  <ImageBackground source={require("./assets/imag/contact.jpg")} style={styles.content}>
    <Text>
      Page Contact
    </Text>
  </ImageBackground>
);

export default function App() {


  

  const homeLink = () => {
    setPage('Home');
  };

  const [sound, setSound] = useState(null); 
  const [page, setPage] = useState('Home');

  const [fontLoaded] = useFonts({
    Ubuntu_400Regular,
    });
    if(!fontLoaded){
      return <AppLoading/>
    }
  
  async function playSound(){
    if (sound === null){

    
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      {uri : audio}
    );

    setSound(sound);
      sound.playAsync();
    }else {
      setSound(null);
      sound.stopAsync();
    }

  }
  return (
    <View style={styles.container}>
      <View style={ styles.header }>
        <TouchableOpacity onPress={ homeLink }>
          <Feather name="home" size={25} color="#e30" />
        </TouchableOpacity>
        <Text style={ {color: '#e30', fontFamily: 'Ubuntu_400Regular'} }>My Web Radio</Text>
        <Ionicons name="person-circle-outline" size={28} color="#e30" />
      </View>

      {
        ( () => {
          switch (page){
            case 'Contact':
              return <Contact/>
            case 'Home':
              return (
                <ImageBackground source={require("./assets/imag/vinyl.jpg")} style={ styles.content }>
                  <TouchableOpacity style={ styles.play } onPress={ playSound }>
                    <Ionicons name={ sound === null ? "play-outline" : "ios-pause-outline"}
                    size={45} color="#e30"/>
                  </TouchableOpacity>
                </ImageBackground>
              )
          }
        } )()
      }
      

      <View style={ styles.footer }>
      <TouchableOpacity onPress={ callLink }>
        <Ionicons name="call-outline" size={24} color="#e30" />
      </TouchableOpacity>
        <Feather name="instagram" size={24} color="#e30" />
      <TouchableOpacity onPress={ () => setPage('Contact')}>
        <Feather  name="mail" size={24} color="#e30" />
      </TouchableOpacity>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    flex: 1
  },
  header: {
    height: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  footer: {
    height: 100,
    borderTopColor: 'black',
    borderTopWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  content: {
    flex: 5,
    justifyContent: 'center'
  },
  play: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10vw'
  }

});
