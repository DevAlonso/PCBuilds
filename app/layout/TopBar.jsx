import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar({ titulo, backButton }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.sideContainer}>
        {backButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={"#ffffff"} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title} numberOfLines={1}>{titulo}</Text>
      <View style={styles.sideContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sideContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    textAlign: 'center',
  },
});
