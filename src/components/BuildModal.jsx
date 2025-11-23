import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';

function BuildModal({ visible, onClose, onSave, initialData = null, showImagePicker = false }) {
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [tipo, setTipo] = useState(initialData?.tipo || 'Gaming');
    const [imagen, setImagen] = useState(initialData?.imagen_path || null);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>

                    <Text style={styles.modalTitle}>{initialData ? 'Editar Build' : 'Nueva Build'}</Text>

                    <Text style={styles.label}>Nombre de la Build</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ej: Build Gaming RTX 4070"
                        placeholderTextColor="#666"
                        value={nombre}
                        onChangeText={setNombre}
                    />

                    <Text style={styles.label}>Tipo</Text>
                    <View style={styles.typeSelector}>
                        {['Gaming', 'Oficina', 'Streaming', 'Edición'].map((tipoOption) => (
                            <TouchableOpacity
                                key={tipoOption}
                                style={[
                                    styles.typeButton,
                                    tipo === tipoOption && styles.typeButtonActive
                                ]}
                                onPress={() => setTipo(tipoOption)}
                            >
                                <Text style={[
                                    styles.typeButtonText,
                                    tipo === tipoOption && styles.typeButtonTextActive
                                ]}>
                                    {tipoOption}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {showImagePicker && (
                        <View>
                            <Text style={styles.label}>Imagen</Text>
                            <TouchableOpacity
                                style={styles.imagePicker}
                                onPress={() => alert('Selector de imagen (lo implementamos después)')}
                            >
                                <Text style={styles.imagePickerText}>
                                    {imagen ? 'Cambiar imagen' : 'Seleccionar imagen'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
                                if (nombre.trim()) {
                                    onSave(nombre, tipo);
                                    setNombre('');
                                    setTipo('Gaming');
                                } else {
                                    alert('El nombre es obligatorio');
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </Modal>
    );
}

export default BuildModal;

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
        maxHeight: '80%',
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
    typeSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 8,
    },
    typeButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#2c3e50',
        borderWidth: 1,
        borderColor: '#34495e',
    },
    typeButtonActive: {
        backgroundColor: '#60a5fa',
        borderColor: '#60a5fa',
    },
    typeButtonText: {
        color: '#999',
        fontSize: 14,
        fontWeight: '600',
    },
    typeButtonTextActive: {
        color: '#ffffff',
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
        backgroundColor: '#e74c3c',
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

