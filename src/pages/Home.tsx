import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Home</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Welcome to the Conference!</h1>
      <p>We're glad you're here. Please select RSVP from the menu to confirm your attendance.</p>
    </IonContent>
  </IonPage>
);

export default Home;