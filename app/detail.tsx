import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  const params = useLocalSearchParams();

  //ฟังค์ชันเปิดแอปโทรศัพท์
  const handleCallApp = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  //ฟังค์ชันเปิดแผนที่ Google
  const handleOpenMapApp = () => {
    //เปิด Google Map
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;

    //เปิด Apple Map
    const appleMap = `https://maps.apple.com/?q=${params.latitude},${params.longitude}`;

    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#e2e1df" }}>
      <Image
        source={{ uri: params.image_url as string }}
        style={{ width: "100%", height: 200 }}
      />
      {/* แสดงรายละเอียดของร้านกาแฟ */}
      <View style={{ padding: 18, gap: 10 }}>
        <Text
          style={{
            fontFamily: "Kanit_700Bold",
            fontSize: 20,
            fontWeight: "bold",
            color: "#5c2f15",
          }}
        >
          {params.name as string}
        </Text>
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: 16,
            color: "#382f2b",
          }}
        >
          {params.district as string}
        </Text>
        <Text
          style={{
            fontFamily: "Kanit_400Regular",
            fontSize: 16,
            fontWeight: "bold",
            color: "#6d5044",
          }}
        >
          {params.description as string}
        </Text>
        <TouchableOpacity
          onPress={handleCallApp}
          style={{
            marginTop: 10,
            paddingVertical: 10,
            backgroundColor: "#00b118",
            borderRadius: 5,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Kanit_400Regular",
              fontSize: 16,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            📞 {params.phone as string}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "Kanit_700Bold",
            fontSize: 18,
            fontWeight: "bold",
            color: "#5c2f15",
          }}
        >
          แผนที่ร้าน
        </Text>
        <MapView
          style={{ width: "100%", height: 300 }}
          initialRegion={{
            latitude: parseFloat(params.latitude as string),
            longitude: parseFloat(params.longitude as string),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(params.latitude as string),
              longitude: parseFloat(params.longitude as string),
            }}
            title={params.name as string}
            description={params.district as string}
            onPress={handleOpenMapApp}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
