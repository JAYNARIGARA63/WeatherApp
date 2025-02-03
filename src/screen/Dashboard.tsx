import {
  ActivityIndicator,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WetherApi} from '../APi/WetherApi';
import Geolocation from '@react-native-community/geolocation';

const Dashboard = () => {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(weather, 'weather---');

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const data = await WetherApi(latitude, longitude);
        console.log(data, 'data=====');

        console.log('Latitude:', latitude, 'Longitude:', longitude);
        if (data) {
          setWeather({
            description: data.weather[0].description,
            temp: Math.round(data.main.temp) + '°C',
            feelsLike: Math.round(data.main.feels_like) + '°C',
            minTemp: Math.round(data.main.temp_min) + '°C',
            maxTemp: Math.round(data.main.temp_max) + '°C',
            humidity: data.main.humidity + '%',
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          });
        }
        setLoading(false);
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/e5/11/2b/e5112b5e9e8be0b0b887dd9309534d5e.jpg',
        }}
        resizeMode="cover"
        style={styles.image}>
        {loading ? (
          // Activity Indicator while loading
          <ActivityIndicator
            size="large"
            color="#ffffff"
            style={styles.loader}
          />
        ) : (
          weather && (
            <View style={styles.card}>
              <Image source={{uri: weather.icon}} style={styles.weatherIcon} />
              <Text style={styles.temp}>{weather.temp}</Text>
              <Text style={styles.description}>{weather.description}</Text>
              <Text style={styles.info}>Feels like: {weather.feelsLike}</Text>
              <Text style={styles.info}>
                Min: {weather.minTemp} | Max: {weather.maxTemp}
              </Text>
              <Text style={styles.info}>Humidity: {weather.humidity}</Text>
            </View>
          )
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temp: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  info: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});
