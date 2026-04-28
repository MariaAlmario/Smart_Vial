import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import infracciones from '../assets/data/infracciones.json';

export default function BuscarInfraccion() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState(null);

  const buscarInfraccion = () => {
    const busqueda = infracciones.find(
      item => item.codigo.toUpperCase() === codigo.toUpperCase()
    );
    setResultado(busqueda || null);
  };

  const getColor = (codigo) => {
    const letra = codigo.charAt(0);
    switch (letra) {
      case 'A': return '#2ecc71';
      case 'B': return '#3498db';
      case 'C': return '#f1c40f';
      case 'D': return '#e67e22';
      case 'E': return '#e74c3c';
      case 'F': return '#9b59b6';
      case 'G': return '#95a5a6';
      case 'H': return '#34495e';
      default: return '#304ffe';
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.h1}>Buscar Infracción</Text>

      <Text style={styles.label}>Ingrese código:</Text>

      <TextInput
        placeholder="Ej: C14"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />

      <TouchableOpacity style={styles.boton} onPress={buscarInfraccion}>
        <Text style={styles.botonTexto}>Buscar</Text>
      </TouchableOpacity>

      {resultado ? (
        <View style={[styles.card, { borderLeftColor: getColor(resultado.codigo) }]}>
          <Text style={styles.codigo}>{resultado.codigo}</Text>
          <Text style={styles.descripcion}>{resultado.descripcion}</Text>
          <Text style={styles.tipo}>Tipo: {resultado.tipo}</Text>
          <Text style={styles.multa}>{resultado.valor_multa}</Text>
        </View>
      ) : codigo !== '' && (
        <Text style={styles.noEncontrado}>
          No se encontró infracción
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',   
    padding: 20,
    backgroundColor: '#f5f8ff'
  },

   h1: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e2a78',
    textAlign: 'center',
    marginBottom: 15
  },

  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5
  },
 
  input: {
    borderWidth: 1,
    borderColor: '#c0c0b0',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

   boton: {
    backgroundColor: '#f4b400',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10
  },

  botonTexto: {
    color: '#fff',
    fontWeight: '600'
  },

   card: {
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderLeftWidth: 6,

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5
  },

  codigo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#304ffe',   
    textAlign: 'center', 
    alignItems: 'center', 
  },

  descripcion: {
    fontSize: 14,
    color: '#555',
    marginVertical: 8
  },

  tipo: {
    fontSize: 12,
    color: '#888'
  },

  multa: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#f4b400'
  },

  noEncontrado: {
    marginTop: 20,
    textAlign: 'center',
    color: '#999'
  }
});