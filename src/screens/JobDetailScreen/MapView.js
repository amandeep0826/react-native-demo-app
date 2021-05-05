import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapsView = ({route, navigation}) => {
  const {lat, lng} = route.params;

  useEffect(() => {
    console.log(lat, lng);
  }, []);
  const [region, setRegion] = useState({
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={region => setRegion(region)}>
        <Marker coordinate={{latitude: lat, longitude: lng}} />
      </MapView>
    </View>
  );
};

export default MapsView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
