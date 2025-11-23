import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import TopBar from "./layout/TopBar";
import { SafeAreaView } from "react-native-safe-area-context";
import PcCard from "@/src/components/PcCard";
import React, { useEffect, useState } from "react";
import { createBuild, getBuilds } from './services/Api'
import { Ionicons } from '@expo/vector-icons';
import BuildModal from '@/src/components/BuildModal';
import { Alert } from 'react-native';


function App() {
  const [buildsList, setBuildsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    setLoading(true)
    const builds = await getBuilds();
    console.log('Datos recibidos:', builds);
    setBuildsList(builds)
    setLoading(false)
  }

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
      <TopBar />
      <FlatList
        data={buildsList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        renderItem={({ item }) => (
          <PcCard
            nombre={item.nombre}
            tipo={item.tipo}
            precio={0}
            image_path={require('../assets/images/pc-image.jpg')}
          />
        )}
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
            alert('Build creada');
            await getData();
            setModalVisible(false);
          } else {
            alert('Error al crear');
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
    bottom: 30,
    right: 20,
    width: 56,
    height: 56,
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
