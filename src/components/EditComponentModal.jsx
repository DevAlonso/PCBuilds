import React, { useState, useEffect } from 'react';
import {
    View, Text, Modal, StyleSheet, TextInput, TouchableOpacity,
    KeyboardAvoidingView, ScrollView, Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

function EditComponentModal({ visible, onClose, onSave, componentData }) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('GPU');
    const [precio, setPrecio] = useState('');

    // Rellenar datos cuando se abre el modal con componentData
    useEffect(() => {
        if (componentData) {
            setNombre(componentData.nombre);
            setTipo(componentData.tipo);
            setPrecio(componentData.precio.toString());
        }
    }, [componentData]);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={styles.modalOverlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <Text style={styles.modalTitle}>Editar Componente</Text>

                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <Text style={styles.label}>Precio (€)</Text>
                        <TextInput
                            style={styles.input}
                            value={precio}
                            onChangeText={setPrecio}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Tipo</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={tipo}
                                onValueChange={(itemValue) => setTipo(itemValue)}
                                style={styles.picker}
                                dropdownIconColor="#60a5fa"
                            >
                                <Picker.Item label="CPU" value="CPU" />
                                <Picker.Item label="GPU" value="GPU" />
                                <Picker.Item label="RAM" value="RAM" />
                                <Picker.Item label="Almacenamiento" value="ALMACENAMIENTO" />
                                <Picker.Item label="Placa Base" value="PLACA BASE" />
                                <Picker.Item label="PSU" value="PSU" />
                                <Picker.Item label="Caja" value="CAJA" />
                                <Picker.Item label="Disipador" value="DISIPADOR" />
                            </Picker>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={() => {
                                    if (nombre.trim() && parseFloat(precio) > 0) {
                                        onSave(componentData.id, nombre, tipo, parseFloat(precio));
                                        onClose();
                                    } else {
                                        alert('Revisa los campos');
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '85%', backgroundColor: '#1c242d', borderRadius: 16, padding: 24, maxHeight: '70%' },
    modalTitle: { fontSize: 24, fontWeight: 'bold', color: '#ffffff', marginBottom: 20, textAlign: 'center' },
    label: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginBottom: 8, marginTop: 12 },
    input: { backgroundColor: '#2c3e50', borderRadius: 8, padding: 12, color: '#ffffff', fontSize: 16, borderWidth: 1, borderColor: '#34495e' },
    pickerContainer: { backgroundColor: '#2c3e50', borderRadius: 8, borderWidth: 1, borderColor: '#34495e', overflow: 'hidden' },
    picker: { color: '#ffffff', backgroundColor: 'transparent' },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 12 },
    modalButton: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
    cancelButton: { backgroundColor: '#ef4444' },
    saveButton: { backgroundColor: '#27ae60' },
    buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});

export default EditComponentModal;
