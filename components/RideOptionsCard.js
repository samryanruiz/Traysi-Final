import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  Switch,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
  {
    id: "Tricycle-Regular-001",
    title: "Regular",
    image: "https://www.iconbolt.com/preview/facebook/ionicons-regular/person.svg",
  },
  {
    id: "Tricycle-Special-002",
    title: "Special",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRllY2G-xeoq0qSoTn-fbF-w03fInQPk2vD5Wlt-Zvh-ubKmue631hbP38T6mgN-jOBgUw&usqp=CAU",
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const calculateFare = (title, distanceInMeters, isDiscounted) => {
    const distanceInKilometers = distanceInMeters / 1000;
    let additionalDistance = distanceInKilometers - 1;
    if (additionalDistance < 0) additionalDistance = 0;

    let fare = 0;
    if (title === "Regular") {
      fare = 10 + additionalDistance * 2;
    } else if (title === "Special") {
      fare = 30 + additionalDistance * 5;
    }
    return isDiscounted ? fare * 0.8 : fare; // Apply discount if isDiscounted is true
  };  

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View style={tw`flex-row items-center justify-between p-5`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl flex-grow`}>
          Calculated Fare
        </Text>
        <View style={{ width: 10 }} />
      </View>
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={isDiscounted}
        renderItem={({ item: { id, title, image }, item }) => {
          const fare = calculateFare(title, travelTimeInformation?.distance?.value || 0, isDiscounted);
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 py-5 ${
                id === selected?.id && "bg-gray-200"
              }`}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.distance?.text} Travel</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "PHP",
                }).format(fare)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.discountContainer}>
        <Text style={styles.discountText}>Discounted (SC, PWD, Student)</Text>
        <Switch
          value={isDiscounted}
          onValueChange={() => setIsDiscounted(previousState => !previousState)}
        />
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;


const styles = StyleSheet.create({
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  discountText: {
    fontSize: 16,
  },
});
