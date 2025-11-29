import { View, Text, StyleSheet, ActivityIndicator, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import TopBar from "../layout/TopBar";
import { createComponent, getComponents, deleteComponent,updateComponent  } from '../services/Api';
import { useEffect, useState } from "react";
import ComponentElement from "@/src/components/ComponentElement"
import { Ionicons } from '@expo/vector-icons';
import ComponentModal from '../../src/components/ComponentModal';
import EditComponentModal from '../../src/components/EditComponentModal';
import { pickImageFromGallery, pickImageFromCamera } from '../utils/ImageUtils';


export default function ComponentsScreen() {
    const { id } = useLocalSearchParams();
    const [componentsList, setComponentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [buildImage, setBuildImage] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [componentToEdit, setComponentToEdit] = useState(null);

    const handleGallery = async () => {
        const uri = await pickImageFromGallery();
        if (uri) {
            setBuildImage(uri);
        }
    };

    const handleEditRequest = (componentData) => {
        setComponentToEdit(componentData);
        setEditModalVisible(true);
    };

    const saveEditedComponent = async (id, nombre, tipo, precio) => {
        const success = await updateComponent(id, nombre, tipo, precio);
        
        if (success) {
            const updatedList = componentsList.map(comp => 
                comp.id === id ? { ...comp, nombre, tipo, precio } : comp
            );
            setComponentsList(updatedList);
            alert('Componente actualizado');
        } else {
            alert('Error al actualizar');
        }
    };

    const handleCamera = async () => {
        const uri = await pickImageFromCamera();
        if (uri) {
            setBuildImage(uri);
        }
    };

    const getData = async () => {
        setLoading(true);
        const components = await getComponents(id);
        setComponentsList(components);
        setLoading(false);
    };

    const borrarComponente = async (componentId) => {
        const success = await deleteComponent(componentId);
        if (success) {
            setComponentsList(componentsList.filter(component => component.id !== componentId))
            alert("El componente se ha borrado correctamente")
        } else {
            alert("No se ha podido borrar el componente")
        }
    }

    useEffect(() => {
        getData();
    }, [id]);


    const calcularPrecioTotal = () => {
        return componentsList.reduce((total, comp) => total + comp.precio, 0);
    };


    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor="#050816" />
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
            <TopBar titulo={"Mis componentes"} backButton={true} />
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={
                        buildImage
                            ? { uri: buildImage }
                            : require('../../assets/images/pc-image.jpg')
                    }
                />
                <TouchableOpacity style={styles.galleryButton} onPress={handleGallery}>
                    <Ionicons name="images" size={24} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.cameraButton} onPress={handleCamera}>
                    <Ionicons name="camera" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={componentsList}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.scrollContent}
                renderItem={({ item }) => (
                    <ComponentElement
                        nombre={item.nombre}
                        tipo={item.tipo}
                        precio={item.precio}
                        id={item.id}
                        borrarComponente={borrarComponente}
                        onEdit={handleEditRequest}
                    />
                )}
            />
            <View style={styles.totalContainer}>
                <View style={styles.totalContent}>
                    <Text style={styles.totalLabel}>Precio Total</Text>
                    <Text style={styles.totalPrice}>{calcularPrecioTotal().toFixed(2)}€</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={28} color="#ffffff" />
            </TouchableOpacity>
            <ComponentModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={async (nombre, tipo, precio) => {
                    const success = await createComponent(nombre, tipo, precio, id);
                    if (success) {
                        alert('Componente creado');
                        await getData();
                        setModalVisible(false);
                    } else {
                        alert('Error al crear componente');
                    }
                }}
            />
            <EditComponentModal 
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                onSave={saveEditedComponent}
                componentData={componentToEdit}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'hsl(210, 36%, 10%)',
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
    scrollContent: {
        paddingHorizontal: 9,
        paddingTop: 8,
        paddingBottom: 100,
    },

    totalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#1c242d',
        borderTopWidth: 2,
        borderTopColor: '#60a5fa',
        paddingHorizontal: 16,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    totalContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        color: '#999',
        fontSize: 20,
        fontWeight: '600',
    },
    totalPrice: {
        color: '#10b981',
        fontSize: 28,
        fontWeight: 'bold',
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
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
        borderRadius: 8,

    },

    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 150,
        marginBottom: 8,
    },
    galleryButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8b5cf6',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    cameraButton: {
        position: 'absolute',
        top: 8,
        right: 56,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#8b5cf6',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },

});

