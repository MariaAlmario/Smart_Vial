
Copiar

import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
 
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Home from './componentes/Home';
import Documentos from './componentes/Documentos';
import Examen from './componentes/Examen';
import Infracciones from './componentes/Infracciones';
import Logout from './componentes/Logout';
import Perfil from './componentes/Perfil'; // <-- Crea este componente
 
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
 
// ── Stack para usuario autenticado ──────────────────────────────────────────
// Las pantallas Infracciones, Examen y Documentos van en un Stack
// para que Home pueda navegar hacia ellas con navigation.navigate()
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Infracciones" component={Infracciones} />
      <Stack.Screen name="Examen" component={Examen} />
      <Stack.Screen name="Documentos" component={Documentos} />
    </Stack.Navigator>
  );
}
 
// ── Tab Navigator (solo Home, Perfil, Logout) ────────────────────────────────
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 15,
          shadowColor: '#1e2a78',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#1e2a78',
        tabBarInactiveTintColor: '#aaa',
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused }) => {
          const icons = {
            Home: focused ? '🏠' : '🏡',
            Perfil: focused ? '👤' : '👤',
            Logout: focused ? '🚪' : '🚪',
          };
          return (
            <Text style={{ fontSize: 20 }}>{icons[route.name]}</Text>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Logout" component={Logout} />
    </Tab.Navigator>
  );
}
 
// ── Tab Navigator para usuarios NO autenticados ──────────────────────────────
function AuthTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Registro" component={Registro} />
    </Tab.Navigator>
  );
}
 
// ── App principal ─────────────────────────────────────────────────────────────
export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return unsubscribe;
  }, []);
 
  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f8ff' }}>
        <ActivityIndicator size="large" color="#1e2a78" />
      </View>
    );
  }
 
  return (
    <NavigationContainer>
      {usuario ? <AppStack /> : <AuthTabs />}
    </NavigationContainer>
  );
}
