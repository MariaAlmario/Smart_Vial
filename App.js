import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';


// 🔥 ICONOS
import { Ionicons } from "@expo/vector-icons";

// 🔷 SCREENS
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Home from './componentes/Home';
import Perfil from './componentes/Perfil';
import Documentos from './componentes/Documentos';
import Examen from './componentes/Examen';
import Infracciones from './componentes/Infracciones';
import Logout from './componentes/Logout';
import Baner1 from './componentes/Baner1';
import Baner2 from './componentes/Baner2';
import Baner3 from './componentes/Baner3';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// 🔥 STACK DE HOME (AQUÍ VA TODO)
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={Home}
        options={{ title: "Inicio" }}
      />

      <Stack.Screen name="Baner1" component={Baner1} />
      <Stack.Screen name="Baner2" component={Baner2} />
      <Stack.Screen name="Baner3" component={Baner3} />

      <Stack.Screen name="Documentos" component={Documentos} />
      <Stack.Screen name="Examen" component={Examen} />
      <Stack.Screen name="Infracciones" component={Infracciones} />
    </Stack.Navigator>
  );
}


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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          // 🔥 ICONOS DINÁMICOS
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Perfil") iconName = "person";
            else if (route.name === "Logout") iconName = "log-out";

            return (
              <Ionicons name={iconName} size={size} color={color} />
            );
          },

          // 🎨 COLORES
          tabBarActiveTintColor: "#1e2a78",
          tabBarInactiveTintColor: "#999",

          // 🎨 DISEÑO DEL TAB
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70,
            borderTopWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: "absolute",
          },

          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
        })}
      >
        {usuario ? (
          <>
            {/* 🔥 HOME DESTACADO */}
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View
                    style={{
                      backgroundColor: "#1e2a78",
                      padding: 12,
                      borderRadius: 30,
                      marginBottom: 20, // efecto flotante
                    }}
                  >
                    <Ionicons name="home" size={22} color="#fff" />
                  </View>
                ),
                tabBarLabel: "Inicio",
              }}
            />

            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="Logout" component={Logout} />
          </>
        ) : (
          <>
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Registro" component={Registro} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}