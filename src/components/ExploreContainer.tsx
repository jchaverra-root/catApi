import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './ExploreContainer.css';

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [catList, setCatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    // Realizar una solicitud GET a la API de razas de gatos
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then((response) => {
        // Actualizar el estado con los datos de las razas de gatos
        setCatList(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API de gatos', error);
      });
  }, []);

  const handleCatClick = (cat) => {
    // Al hacer clic en un gato, establece el gato seleccionado en el estado
    setSelectedCat(cat);
  };

  return (
    <>
      <div id="card-container">
        {catList.map((cat) => (
          <div id="card" key={cat.id} onClick={() => handleCatClick(cat)}>
            <h2>
              Nombre: {cat.id} / Raza: <samp>{cat.name}</samp>
            </h2>
            <img
              id="card-img"
              src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
              alt=""
            />
          </div>
        ))}
      </div>

      {selectedCat && (
        <div id="cat-details">
          <h3>Detalles del Gato:</h3>
          <p>Nombre: {selectedCat.name}</p>
          {/* Agrega más detalles aquí según tus necesidades */}
        </div>
      )}
    </>
  );
};

export default ExploreContainer;