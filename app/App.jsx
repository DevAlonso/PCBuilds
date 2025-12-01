import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import TopBar from "./layout/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import PcCard from "@/src/components/PcCard";
import React, { useState, useCallback } from "react";
import { createBuild, deleteBuild, getBuilds } from './services/Api'
import { Ionicons } from '@expo/vector-icons';
import BuildModal from '@/src/components/BuildModal';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';


function App() {
  const [buildsList, setBuildsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const borrarBuild = async (buildId) => {
    const success = await deleteBuild(buildId);
    if (success) {
      setBuildsList(buildsList.filter(build => build.id !== buildId))
      alert("La build se ha borrado correctamente")
    } else {
      alert("No se ha podido borrar la build")
    }
  }

  const getData = async () => {
    setLoading(true);
    const builds = await getBuilds();
    setBuildsList(builds);
    setLoading(false);
  };
  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const FooterMapa = () => (
    <View style={styles.mapContainer}>
      <Text style={styles.mapTitle}>Visita nuestra Sede</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.9881,
          longitude: 86.9250,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={{ latitude: 27.9881, longitude: 86.9250 }}
          title="Sede Central"
          description="En la cima del mundo"
        />
      </MapView>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <TopBar />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#60a5fa" />
          <Text style={styles.loadingText}>Cargando builds...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#050816" />
      <TopBar titulo={"Mis Builds"} />
      <FlatList
        data={buildsList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <PcCard
            nombre={item.nombre}
            tipo={item.tipo}
            precio={item.precio_total}
            id={item.id}
            borrarBuild={borrarBuild}
            onUpdate={getData}
          />
        )}
        ListFooterComponent={FooterMapa}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
      <BuildModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={async (nombre, tipo) => {
          const success = await createBuild(nombre, tipo);
          if (success) {
            Alert.alert('Éxito', 'Build creada');
            await getData();
            setModalVisible(false);
          } else {
            Alert.alert('Error', 'Error al crear');
          }
        }}

      />
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "hsl(210, 36%, 10%)",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    marginTop: 10,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  mapContainer: {
    marginBottom: 80,
    backgroundColor: '#1c242d',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 10,
  },
  mapTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
});
