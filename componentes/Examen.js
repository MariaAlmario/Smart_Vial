import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

import preguntas from "../assets/data/preguntas.json";

const TOTAL_PREGUNTAS = 10;

export default function Examen() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    generarSimulacro();
  }, []);

  const generarSimulacro = () => {
    const mezcladas = [...preguntas].sort(() => Math.random() - 0.5);
    setQuiz(mezcladas.slice(0, TOTAL_PREGUNTAS));
  };

  // 🔥 NUEVO: Reiniciar examen
  const reiniciarExamen = () => {
    generarSimulacro();
    setIndex(0);
    setRespuestas([]);
    setFinalizado(false);
  };

  const responder = (opcionIndex) => {
    const actual = quiz[index];

    const nuevaRespuesta = {
      pregunta: actual.pregunta,
      respuestaUsuario: actual.opciones[opcionIndex],
      correcta: actual.opciones[actual.correcta],
      esCorrecta: opcionIndex === actual.correcta,
      categoria: actual.categoria,
    };

    const nuevasRespuestas = [...respuestas, nuevaRespuesta];
    setRespuestas(nuevasRespuestas);

    if (index + 1 < quiz.length) {
      setIndex(index + 1);
    } else {
      setFinalizado(true);
    }
  };

  // 🔹 Cargando
  if (quiz.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Cargando examen...</Text>
      </View>
    );
  }

  // 🔹 Pantalla final
  if (finalizado) {
    const correctas = respuestas.filter((r) => r.esCorrecta).length;

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titulo}>Tus resultados</Text>

        <Text style={styles.subtitulo}>
          Total preguntas: {quiz.length}
        </Text>

        <Text style={styles.subtitulo}>
          Correctas: {correctas}
        </Text>

        <Text style={styles.subtitulo}>
          Incorrectas: {quiz.length - correctas}
        </Text>

        <Text style={styles.porcentaje}>
          Nota: {((correctas / quiz.length) * 100).toFixed(1)}%
        </Text>

        {/* 🔥 BOTÓN REINTENTAR */}
        <TouchableOpacity style={styles.reintentarBtn} onPress={reiniciarExamen}>
          <Text style={styles.reintentarText}>Reintentar examen</Text>
        </TouchableOpacity>

        <Text style={styles.detalleTitulo}>Revisión:</Text>

        {respuestas.map((r, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.preguntaTexto}>{r.pregunta}</Text>

            <Text
              style={{
                color: r.esCorrecta ? "green" : "red",
                marginTop: 5,
              }}
            >
              Tu respuesta: {r.respuestaUsuario}
            </Text>

            {!r.esCorrecta && (
              <Text style={{ color: "green" }}>
                Correcta: {r.correcta}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    );
  }

  // 🔹 Pregunta actual
  const actual = quiz[index];

  return (
    <View style={styles.container}>
      <Text style={styles.pregunta}>
        {index + 1}. {actual.pregunta}
      </Text>

      {actual.imagen && (
        <Image source={{ uri: actual.imagen }} style={styles.imagen} />
      )}

      {actual.opciones.map((op, i) => (
        <TouchableOpacity
          key={i}
          style={styles.boton}
          onPress={() => responder(i)}
        >
          <Text style={styles.opcionTexto}>{op}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#f5f8ff",
  },

  center: {
    paddingTop: 100,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  pregunta: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },

  boton: {
    padding: 15,
    backgroundColor: "#f4b400",
    marginVertical: 5,
    borderRadius: 10,
  },

  opcionTexto: {
    fontSize: 14,
  },

  imagen: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitulo: {
    fontSize: 16,
    marginBottom: 5,
  },

  porcentaje: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#1e2a78",
  },

  detalleTitulo: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },

  preguntaTexto: {
    fontWeight: "600",
  },

  // 🔥 botón nuevo
  reintentarBtn: {
    backgroundColor: "#1e2a78",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    alignItems: "center",
  },

  reintentarText: {
    color: "#fff",
    fontWeight: "700",
  },
});