import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// 🔷 BANNERS (AHORA CON RUTA)
const banners = [
  {
    id: '1',
    titulo: 'La dificultad aumenta',
    descripcion: 'Conoce los nuevos examenes de conduccion',
    boton: 'Ver más',
    imagen: 'https://cdn-icons-png.flaticon.com/128/15532/15532224.png',
    color: '#4c6ef5',
    ruta: 'Baner1', 
  },
  {
    id: '2',
    titulo: '¿Pico y placa?',
    descripcion: 'Revisalo aquí',
    boton: 'Ver más',
    imagen: 'https://cdn-icons-png.flaticon.com/128/4924/4924519.png',
    color: '#3b52ac',
    ruta: 'Baner2',
  },
  {
    id: '3',
    titulo: 'Gestiona documentos',
    descripcion: 'Todo en un solo lugar',
    boton: 'Ver documentos',
    imagen: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    color: '#1e2a78',
    ruta: 'Baner3', 
  },
];

// OPCIONES
const opciones = [
  { id: '1', titulo: 'Infracciones', imagen: 'https://cdn-icons-png.flaticon.com/512/2333/2333368.png', ruta: 'Infracciones' },
  { id: '2', titulo: 'Examen', imagen: 'https://cdn-icons-png.flaticon.com/128/3277/3277169.png', ruta: 'Examen' },
  { id: '3', titulo: 'Documentos', imagen: 'https://cdn-icons-png.flaticon.com/128/15325/15325241.png', ruta: 'Documentos' },
];

export default function Home({ navigation }) {

  const [active, setActive] = useState(0);
  const flatRef = useRef();

  // AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (active + 1) % banners.length;
      flatRef.current?.scrollToIndex({ index: next, animated: true });
      setActive(next);
    }, 3500);

    return () => clearInterval(interval);
  }, [active]);

  // 🔷 RENDER BANNER
  const renderBanner = ({ item }) => (
    <View style={[styles.banner, { backgroundColor: item.color }]}>

      <View style={styles.bannerContent}>
        <Text style={styles.bannerTitle}>{item.titulo}</Text>
        <Text style={styles.bannerDesc}>{item.descripcion}</Text>

        {/* AQUI ESTA LA MAGIA */}
        <TouchableOpacity
          style={styles.bannerBtn}
          onPress={() => navigation.navigate(item.ruta)}
        >
          <Text style={styles.bannerBtnText}>
            {item.boton || 'Ver más'}
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: item.imagen }}
        style={styles.bannerImage}
        resizeMode="contain"
      />

    </View>
  );

  // RENDER OPCIONES
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.ruta)}
    >
      <Image
        source={{ uri: item.imagen }}
        style={styles.iconoImg}
        resizeMode="contain"
      />

      <Text style={styles.texto}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 🔷 HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Smart Vial</Text>
        <Text style={styles.subtitle}>Tu mano derecha en la Via</Text>
      </View>

      {/* 🔷 SLIDER */}
      <FlatList
        ref={flatRef}
        data={banners}
        renderItem={renderBanner}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setActive(index);
        }}
      />

      {/* 🔷 DOTS */}
      <View style={styles.dots}>
        {banners.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === active && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* 🔷 GRID */}
      <FlatList
        data={opciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e2a78',
  },

  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },

  banner: {
    width: width,
    borderRadius: 22,
    padding: 20,
    height: 170,
    overflow: 'hidden',
    justifyContent: 'center',
    elevation: 6,
  },

  bannerContent: {
    zIndex: 2,
    width: '65%',
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  bannerDesc: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    marginTop: 6,
  },

  bannerBtn: {
    backgroundColor: '#f4b400',
    marginTop: 14,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    elevation: 3,
  },

  bannerBtnText: {
    color: '#1e2a78',
    fontWeight: '700',
    fontSize: 12,
  },

  bannerImage: {
    position: 'absolute',
    right: 5,
    bottom: 0,
    width: 120,
    height: 120,
    opacity: 0.95,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -10,
    marginBottom: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },

  dotActive: {
    width: 18,
    backgroundColor: '#1e2a78',
  },

  grid: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 20,
    paddingVertical: 22,
    paddingHorizontal: 10,
    alignItems: 'center',
    elevation: 5,
  },

  iconoImg: {
    width: 50,
    height: 50,
    marginBottom: 12,
  },

  texto: {
    fontSize: 12,
    textAlign: 'center',
    color: '#676360',
    fontWeight: '600',
  },
});