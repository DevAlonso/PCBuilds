import { View, Text, StyleSheet } from "react-native";

function TopBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Builds</Text>
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});
