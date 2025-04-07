import React, { useState, useEffect  } from "react";
import { GoogleMap, Marker, useJsApiLoader  } from '@react-google-maps/api';



export const Mapa = ({ direccion }) => {


const libraries = ["places"];
const API_KEY = "AIzaSyDmy8sAYm7a65M-7R7qm-vYNIwbb2pPu7k";
const [coordenadas, setCoordenadas] = useState(null);

    

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDmy8sAYm7a65M-7R7qm-vYNIwbb2pPu7k', // Reemplaza 'TU_API_KEY' con tu clave de API de Google
    libraries: ['places'], // Necesario para la geocodificación
  });

  

  // Función para obtener las coordenadas de una dirección
  const geocodeDireccion = async (direccion) => {

    console.log("localizacion");
    
   // if (!isLoaded) return;
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: direccion }, (results, status) => {
      if (status === 'OK') {
        console.log('Dirección geocodificada: ', results[0]);
        const { lat, lng } = results[0].geometry.location;
        setCoordenadas({ lat: lat(), lng: lng() });
      } else {
        console.error('Error al geocodificar la dirección:', status);
      }
    });
  };


  // Cargar el mapa y geocodificar la dirección cuando el componente se monte
  useEffect(() => {
    if (direccion) {
      geocodeDireccion(direccion);
    
    }
  }, [direccion]); // Se ejecutará solo cuando la dirección cambie

  

   geocodeDireccion(direccion);

  // Si las coordenadas no se han obtenido, mostramos un mapa centrado por defecto
 
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }
  

  return (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '600px',
      }}
      zoom={14}
      center={coordenadas} // Centro del mapa con coordenadas obtenidas o por defecto
    >
      {/* Verifica si las coordenadas están disponibles antes de renderizar el marcador */}
       { console.log("renderizacion")}
      {coordenadas && (
        <Marker position={coordenadas} />
      )}
    </GoogleMap>
  );
};