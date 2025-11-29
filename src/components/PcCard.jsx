import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from 'expo-router';
import EditBuildModal from './EditBuildModal';
import { updateBuild } from '../../app/services/Api';

const getTagColor = (tag) => {
  if (!tag) return "#60a5fa";
  switch (tag.toLowerCase()) {
    case "gaming": return "#f87171";
    case "oficina": return "#34d399";
    case "streaming": return "#a78bfa";
    case "edición": return "#d7bd3aff";
    default: return "#60a5fa";
  }
};

function PcCard({ nombre, tipo, precio, id, borrarBuild, onUpdate }) {
  const [visibilidadAjustes, setVisibilidadAjustes] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const router = useRouter();

  const borrarBtn = () => {
    borrarBuild(id);
    setVisibilidadAjustes(false);
  }

  const handleEdit = async (nuevoNombre, nuevoTipo) => {
    const success = await updateBuild(id, nuevoNombre, nuevoTipo);

    if (success) {
      alert('Build actualizada correctamente');
      setEditModalVisible(false);
      setVisibilidadAjustes(false);
      if (onUpdate) onUpdate();
    } else {
      alert('Error al actualizar');
    }
  };

  const handleCardPress = () => {
    router.push(`/components/${id}`);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.cardContainer}
        onPress={handleCardPress}
        activeOpacity={0.8}
      >
        <Image
          style={styles.image}
          source={require('../../assets/images/pc-image.jpg')}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setVisibilidadAjustes(!visibilidadAjustes)}
        >
          <Ionicons name="settings" size={28} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.chip}>
            <Text style={[styles.chipText, { color: getTagColor(tipo) }]}>
              {tipo}
            </Text>
          </View>
          <Text style={styles.title}>{nombre}</Text>
          <Text style={styles.price}>{precio} €</Text>

          {visibilidadAjustes && (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: "#8b5cf6" }]}
                onPress={() => {
                  setEditModalVisible(true);
                  setVisibilidadAjustes(false);
                }}
              >
                <Text style={styles.buttonsText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={borrarBtn}
                style={[styles.buttonContainer, { backgroundColor: "#ef4444" }]}
              >
                <Text style={styles.buttonsText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>

      <EditBuildModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleEdit}
        buildData={{ nombre, tipo, id }}
      />
    </>
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
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 8,
  },
  buttonsText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
