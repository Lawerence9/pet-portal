import React from 'react';

const GoogleMaps = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11611.833383115998!2d-8.522812012841786!3d43.315131400000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xba12e5673fd09b5%3A0x4f8ff9f794a36ae3!2sAsociaci%C3%B3n%20Protectora%20de%20Animales%20Marea%20Felina!5e0!3m2!1ses!2ses!4v1743788866740!5m2!1ses!2ses"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de la Asociación Protectora de Animales"
      ></iframe>
    </div>
  );
};

export default GoogleMaps;