import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, SafeAreaView, ActivityIndicator
} from 'react-native';
import { auth } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export default function Perfil() {
  const [nombre, setNombre]     = useState('');
  const [fecha, setFecha]       = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargando, setCargando] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
    if (!uid) return;
    const traerDatos = async () => {
      const docRef  = doc(db, 'usuarios', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre || '');
        setFecha(data.fecha || '');
        setTelefono(data.telefono || '');
      } else {
        Alert.alert('Usuario no encontrado');
      }
      setCargando(false);
    };
    traerDatos();
  }, [uid]);

  const actualizarDatos = async () => {
    try {
      const docRef = doc(db, 'usuarios', uid);
      await updateDoc(docRef, { nombre, fecha, telefono });
      Alert.alert('✓ Datos actualizados');
    } catch (error) {
      console.error(error);
      Alert.alert('Error al actualizar');
    }
  };

  if (cargando) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#1e2a78" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Avatar inicial */}
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>
            {(nombre || auth.currentUser?.email || 'U')[0].toUpperCase()}
          </Text>
        </View>

        <Text style={styles.h1}>Mi Perfil</Text>
        <Text style={styles.correo}>{auth.currentUser?.email}</Text>

        {/* Campos */}
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={fecha}
          onChangeText={setFecha}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.boton} onPress={actualizarDatos}>
          <Text style={styles.botonTexto}>Guardar cambios</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f8ff',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f8ff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f8ff',
  },

  // Avatar
  avatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e2a78',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },

  // Textos — mismos que infracciones.js
  h1: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e2a78',
    textAlign: 'center',
    marginBottom: 4,
  },
  correo: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },

  // Input — igual al de infracciones.js
  input: {
    borderWidth: 1,
    borderColor: '#c0c0b0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 14,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
  },

  // Botón — igual al de infracciones.js
  boton: {
    backgroundColor: '#f4b400',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});