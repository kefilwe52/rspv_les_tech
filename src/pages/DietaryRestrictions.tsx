
import React from 'react';
import { IonCheckbox, IonLabel, IonItem, IonButton, IonInput } from '@ionic/react';

const DietaryRestrictions: React.FC<{ setRestrictions: (restrictions: string) => void; prevStep: () => void; nextStep: () => void }> = ({ setRestrictions, prevStep, nextStep }) => (
  <>
    <IonItem>
      <IonLabel>Does anyone in your party have any allergies or dietary restrictions we should be aware of?</IonLabel>
      <IonCheckbox slot="start" onIonChange={e => setRestrictions(e.detail.value)} />
    </IonItem>
    <IonInput placeholder="If yes, please specify." onIonChange={e => setRestrictions(e.detail.value!)} />
    <IonButton expand="full" type="button"  onClick={prevStep}>Back</IonButton>
    <IonButton expand="full" type="button"  onClick={nextStep}>Next</IonButton>
  </>
);

export default DietaryRestrictions;
