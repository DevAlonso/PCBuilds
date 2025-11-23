import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

const getTagColor = (tag) => {
  if (!tag) return "#60a5fa";
  switch (tag.toLowerCase()) {
    case "gaming":
      return "#f87171";
    case "oficina":
      return "#34d399";
    case "streaming":
      return "#a78bfa";
    case "edición":
      return "#d7bd3aff";
    default:
      return "#60a5fa";
  }
};

function PcCard({ nombre, tipo, precio, image_path }) {
  const [visibilidadAjustes, setVisibilidadAjustes] = useState(false);


  return (
    <View style={styles.cardContainer}>

      <Image style={styles.image} source={image_path} />
      <TouchableOpacity style={styles.iconContainer} onPress={()=> setVisibilidadAjustes(!visibilidadAjustes)}>
        <Ionicons name="settings" size={28} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.chip}>
          <Text style={[styles.chipText, { color: getTagColor(tipo) }]}>
            {tipo}
          </Text>
        </View>
        <Text style={styles.title}>{nombre}</Text>
        <Text style={styles.price}>{precio}</Text>
        {visibilidadAjustes &&
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonContainer}> <Text style={styles.buttonsText}>Editar</Text> </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}> <Text style={styles.buttonsText}>Borrar</Text> </TouchableOpacity>
          </View>
        }
      </View>
    </View>
  );
}

export default PcCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: "#1c242d",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  chip: {
    alignSelf: "flex-start",
    backgroundColor: "#1e3a5f",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  chipText: {
    color: "#60a5fa",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  price: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: "auto",
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 50
  },
  buttonContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
  },
  buttonsText: {
    fontSize: 20,
    fontWeight: "500",
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: '#60a5fa',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
