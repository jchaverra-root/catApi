import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";

import "./ExploreContainer.css";

interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [cat, setCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Realizar una solicitud GET a la API de razas de gatos
    axios
      .get("https://api.thecatapi.com/v1/breeds")
      .then((response) => {
        // Actualizar el estado con los datos de las razas de gatos
        setCat(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API de gatos", error);
      });
  }, []);

  // Función para mostrar más detalles del gato seleccionado
  const verCat = (cat) => {
    setSelectedCat(cat);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div id="card-container">
        {cat.map((cat) => (
          <div id="card" key={cat.id}>
            <h2>
              Nombre: {cat.id} / Raza: <samp>{cat.name}</samp>
            </h2>
            <img
              id="card-img"
              src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
              alt=""
            />
            <h2>
              Origen: {cat.origin} / Temperamento: {cat.temperament}
            </h2>
            <button id="card-btn" type="button" onClick={() => verCat(cat)}>
              VER MAS
            </button>
          </div>
        ))}
      </div>

      <IonModal isOpen={showModal} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalles del Gato</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedCat && (
            <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`https://cdn2.thecatapi.com/images/${selectedCat.reference_image_id}.jpg`}
                alt="Imagen del gato"
                style={{ width: "50%", margin: "auto" }}
              />

            </div>
            <div style={{
                
              }}>
              <IonItem>
                <IonLabel>
                  Nombre: {selectedCat.name}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Origen: {selectedCat.origin}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Temperamento: {selectedCat.temperament}
                </IonLabel>
              </IonItem>
            </div>
            </>
          )}
          <IonButton expand="full" onClick={closeModal}>
            Cerrar
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default ExploreContainer;
