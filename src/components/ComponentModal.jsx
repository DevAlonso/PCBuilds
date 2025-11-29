import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

function ComponentModal({ visible, onClose, onSave }) {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('GPU');
    const [precio, setPrecio] = useState('');

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
                        <Text style={styles.modalTitle}>Nuevo Componente</Text>
                        <Text style={styles.label}>Nombre del Componente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: RTX 4070"
                            placeholderTextColor="#666"
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <Text style={styles.label}>Precio</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: 499 €"
                            placeholderTextColor="#666"
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
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={() => {
                                    if (nombre.trim() && parseFloat(precio) > 0) {
                                        onSave(nombre, tipo, parseFloat(precio));
                                        setNombre('');
                                        setTipo('GPU');
                                        setPrecio('');
                                    } else {
                                        alert('El nombre y precio son obligatorios');
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

export default ComponentModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#1c242d',
        borderRadius: 16,
        padding: 24,
        maxHeight: '70%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#2c3e50',
        borderRadius: 8,
        padding: 12,
        color: '#ffffff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#34495e',
    },
    pickerContainer: {
        backgroundColor: '#2c3e50',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#34495e',
        overflow: 'hidden',
    },
    picker: {
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
        gap: 12,
    },
    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ef4444',
    },
    saveButton: {
        backgroundColor: '#27ae60',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
