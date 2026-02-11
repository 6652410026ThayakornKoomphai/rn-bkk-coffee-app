import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  //สร้าง State เพื่อเก็บข้อมูล  coffee_shops ที่ดึงมาจากฐานข้อมูลทั้งหมด
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  //ดึงข้อมูล CoffeeShop จากฐานข้อมูล และ เก็บใน State ที่สร้างไว้
  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        //แสดงข้อผิดพลาดถ้ามี
        Alert.alert("คำเตือน, เกิดข้อผิดพลาดในการดึงข้อมูล");
      } else {
        setShops(data);
      }
    };

    fetchCoffeeShops();
  }, []);

  //สร้างหน้าตา Component รายการที่จะแสดงใน FlatList
  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.CardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            district: item.district,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
            image_url: item.image_url,
            phone: item.phone,
          },
        })
      }
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 100, height: 100, borderRadius: 5 }}
      />
      <View style={{ marginLeft: 10, justifyContent: "center" }}>
        <Text style={styles.textName}>{item.name}</Text>
        <Text style={styles.textDistrict}>🚩 {item.district}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <FlatList
          contentContainerStyle={{ padding: 15 }}
          showsVerticalScrollIndicator={false}
          data={shops} //กำหนดข้อมูลที่จะแสดงใน FlatList
          keyExtractor={(item) => item.id} // กำหนด Key สำหรับแต่ละไอดี
          renderItem={renderShopItem} //หน้าตาของแต่ละรายการที่จะแสดงใน FlatList
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#4e3120",
  },
  textDistrict: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#6e6058",
  },
  CardItem: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 7,
    padding: 10,
    borderRadius: 5,
  },
});
