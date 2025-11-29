import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";


const getIconByType = (tipo) => {
    switch (tipo.toUpperCase()) {
        case "CPU": return "hardware-chip";
        case "GPU": return "game-controller";
        case "RAM": return "layers";
        case "ALMACENAMIENTO": return "server";
        case "PLACA BASE": return "grid";
        case "PSU": return "flash";
        case "CAJA": return "cube-outline";
        case "DISIPADOR": return "snow";
        default: return "hardware-chip-outline";
    }
};

const getColorByType = (tipo) => {
    switch (tipo.toUpperCase()) {
        case "CPU": return "#f87171";
        case "GPU": return "#a78bfa";
        case "RAM": return "#60a5fa";
        case "ALMACENAMIENTO": return "#34d399";
        case "PLACA BASE": return "#fbbf24";
        case "PSU": return "#fb923c";
        case "CAJA": return "#94a3b8";
        case "DISIPADOR": return "#67e8f9";
        default: return "#60a5fa";
    }
};

export default function ComponentElement({ nombre, tipo, precio, id, borrarComponente,onEdit  }) {
    const [visibilidadAjustes, setVisibilidadAjustes] = useState(false);
    const borrarBtn = () => {
        borrarComponente(id)
        setVisibilidadAjustes(false)
    }
    const editarBtn = () => {
        // Pasamos los datos hacia arriba al padre
        onEdit({ id, nombre, tipo, precio });
        setVisibilidadAjustes(false);
    };

    return (
        <View style={styles.containerComponent}>
            <View style={styles.mainRow}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={getIconByType(tipo)}
                        size={40}
                        color="#60a5fa"
                    />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.nombre}>{nombre}</Text>
                    <View style={[styles.chip, { backgroundColor: getColorByType(tipo) }]}>
                        <Text style={styles.chipText}>{tipo}</Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    <Text style={styles.precio}>{precio}€</Text>
                </View>
                <TouchableOpacity
                    style={styles.settingsContainer}
                    onPress={() => setVisibilidadAjustes(!visibilidadAjustes)}
                >
                    <Ionicons name="settings" size={19} color="#ffffff" />
                </TouchableOpacity>
            </View>

            {visibilidadAjustes && (
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={editarBtn} style={[styles.buttonContainer, { backgroundColor: "#8b5cf6" }]}>
                        <Text style={styles.buttonsText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={borrarBtn} style={[styles.buttonContainer, { backgroundColor: "#ef4444" }]}>
                        <Text style={styles.buttonsText}>Borrar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    containerComponent: {
        backgroundColor: '#1c242d',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    mainRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 50,
        height: 50,
        backgroundColor: '#2c3e50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    nombre: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 6,
    },
    chip: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    chipText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '600',
    },
    priceContainer: {
        marginLeft: 'auto',
    },
    precio: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    settingsContainer: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: '#475569',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 50,
        marginTop: 16,
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
});
