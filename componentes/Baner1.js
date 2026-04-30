import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function Baner1() {
  return (
    <ScrollView style={styles.container}>

      {/* 🔷 HEADER */}
      <Text style={styles.titulo}>
        Nuevos Exámenes de Conducción: El CALE
      </Text>

      <Text style={styles.subtitulo}>
        Conoce los cambios recientes en las pruebas
      </Text>

      {/* 🔷 IMAGEN */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/128/15532/15532224.png",
        }}
        style={styles.imagen}
      />

      {/*  CONTENIDO */}
      <View style={styles.card}>
        <Text style={styles.texto}>
          El proceso para sacar o renovar la licencia de conducción en Colombia 
          podría encarecerse por la implementación de los Centros de Apoyo 
          Logístico y de Evaluación CALE, encargados de las pruebas teórica y 
          práctica; aunque buscan mayor rigor y transparencia, también implican 
          nuevos costos, por lo que se recomienda informarse y prepararse para 
          evitar gastos innecesarios.
        </Text>

        <Text style={styles.texto}>
          Los CALE aplicarán los exámenes teórico y práctico que determinarán si 
          el aspirante realmente domina las normas de tránsito, la seguridad vial 
          y las habilidades al conducir.
        </Text>
      </View>

      {/* 🔷 SECCIÓN EXTRA */}
      <View style={styles.card}>
        <Text style={styles.subTituloSeccion}>
          Costos Actuales sin CALE
        </Text>

        <Text style={styles.texto}>
          Actualmente, el curso de conducción B1 cuesta entre $1.100.000 y 
          $1.300.000 e incluye varios trámites oficiales; sumando exámenes 
          médicos y derechos de licencia, el total para carro ronda $1.762.900 y 
          para moto cerca de $1.300.000.
        </Text>
        
      </View>

      <View style={styles.card}>
        <Text style={styles.subTituloSeccion}>
          Costos con CALE
        </Text>

        <Text style={styles.texto}>
          Una vez entren en funcionamiento los CALE, los aspirantes deberán 
          pagar por separado los exámenes teórico y práctico. Según la 
          resolución mencionada, los valores serán:
        </Text>

        <Text style={styles.lista}>• Examen teórico: $108.589.</Text>
        <Text style={styles.lista}>• Examen práctico: entre $512.512 y $582.221, 
          dependiendo de la categoría.</Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8ff",
    padding: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1e2a78",
  },

  subtitulo: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },

  imagen: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },

  texto: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
    lineHeight: 20,
  },

  subTituloSeccion: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1e2a78",
  },

  lista: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444",
  },
});