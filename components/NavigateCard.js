import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice"; // Assuming you have setOrigin action in your slice
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [originPlace, setOriginPlace] = useState(null); // New state for the source location
  const originRef = useRef();
  const destinationRef = useRef();

  const clearOrigin = () => {
    originRef.current?.setAddressText('');
    dispatch(setOrigin(null));
  };

  const clearDestination = () => {
    destinationRef.current?.setAddressText('');
    dispatch(setDestination(null));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {/* Source location input */}
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            ref={originRef}
            placeholder="Where from?"
            styles={{
              container: {
                backgroundColor: "white",
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                backgroundColor: "#DDDDDF",
                borderRadius: 0,
                fontSize: 18,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            renderRightButton={() => (
              <TouchableOpacity onPress={clearOrigin} style={styles.closeButton}>
                <Icon name="close" type="fontawesome" />
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Destination location input */}
        <View>
          <GooglePlacesAutocomplete
            ref={destinationRef}
            placeholder="Where to?"
            styles={{
              container: {
                backgroundColor: "white",
                paddingTop: 20,
                flex: 0,
              },
              textInput: {
                backgroundColor: "#DDDDDF",
                borderRadius: 0,
                fontSize: 18,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            renderRightButton={() => (
              <TouchableOpacity onPress={clearDestination} style={styles.closeButton}>
                <Icon name="close" type="fontawesome" />
              </TouchableOpacity>
            )}
          />
        </View>

        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

// Define styles for close button
const styles = StyleSheet.create({
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
