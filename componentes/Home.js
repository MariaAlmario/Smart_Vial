import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native'; // ✅ IMPORTANTE

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Dots del slider ──────────────────────────────────────────────────────────
const SliderDots = ({ total, active }) => (
  <View style={styles.dotsContainer}>
    {Array.from({ length: total }).map((_, i) => (
      <View key={i} style={[styles.dot, i === active ? styles.dotActive : styles.dotInactive]} />
    ))}
  </View>
);

// ── Banner individual ────────────────────────────────────────────────────────
const BannerCard = ({ item }) => (
  <View style={styles.bannerCard}>
    <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} resizeMode="cover" />
    <View style={styles.bannerOverlay}>
      {item.categoria ? (
        <View style={styles.bannerBadge}>
          <Text style={styles.bannerBadgeText}>{item.categoria}</Text>
        </View>
      ) : null}
      <Text style={styles.bannerTitle} numberOfLines={2}>{item.titulo}</Text>
      {item.descripcion ? (
        <Text style={styles.bannerDesc} numberOfLines={1}>{item.descripcion}</Text>
      ) : null}
    </View>
  </View>
);

// ── Icono de acción ──────────────────────────────────────────────────────────
const AccionCard = ({ emoji, label, onPress }) => (
  <TouchableOpacity style={styles.accionCard} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.accionIconBox}>
      <Text style={styles.accionEmoji}>{emoji}</Text>
    </View>
    <Text style={styles.accionLabel}>{label}</Text>
  </TouchableOpacity>
);

// ── Pantalla Home ────────────────────────────────────────────────────────────
export default function Home() {
  const navigation = useNavigation(); // ✅ CLAVE

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const flatListRef = useRef(null);
  const timerRef = useRef(null);

  const usuario = auth.currentUser;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const q = query(collection(db, 'banners'), orderBy('orden', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBanners(data.length > 0 ? data : BANNERS_FALLBACK);
      } catch (error) {
        console.log("Error cargando banners:", error); // 👀 DEBUG
        setBanners(BANNERS_FALLBACK);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveSlide(prev => {
          const next = (prev + 1) % banners.length;
          flatListRef.current?.scrollToIndex({ index: next, animated: true });
          return next;
        });
      }, 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [banners]);

  const onScrollEnd = (e) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40));
    setActiveSlide(index);

    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % banners.length;
        flatListRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
  };

  // ✅ navegación segura
  const irA = (pantalla) => {
    navigation.navigate(pantalla);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={'#f5f8ff'} barStyle={'dark-content'} />

      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>Bienvenido 👋</Text>
        <Text style={styles.topbarSub}>
          {usuario?.displayName || usuario?.email?.split('@')[0] || 'Usuario'}
        </Text>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        <View style={styles.sliderWrapper}>
          {loading ? (
            <View style={styles.loaderBox}>
              <ActivityIndicator size="large" color="#f4b400" />
            </View>
          ) : (
            <>
              <FlatList
                ref={flatListRef}
                data={banners}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <BannerCard item={item} />}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={onScrollEnd}
              />
              <SliderDots total={banners.length} active={activeSlide} />
            </>
          )}
        </View>

        <Text style={styles.sectionLabel}>Servicios</Text>

        <View style={styles.accionGrid}>
          <AccionCard emoji="⚠️" label="Infracciones" onPress={() => irA('Infracciones')} />
          <AccionCard emoji="📋" label="Examen" onPress={() => irA('Examen')} />
          <AccionCard emoji="📄" label="Documentos" onPress={() => irA('Documentos')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}