import React from 'react';
import { IonRadioGroup, IonRadio, IonLabel, IonItem, IonButton, IonSelect, IonSelectOption } from '@ionic/react';

const AttendanceAndGuests: React.FC<{ setAttendance: (attendance: string) => void; setGuests: (guests: number) => void; prevStep: () => void; nextStep: () => void }> = ({ setAttendance, setGuests, prevStep, nextStep }) => (
  <>
    <IonRadioGroup onIonChange={e => setAttendance(e.detail.value)}>
      <IonItem>
        <IonLabel>Attending</IonLabel>
        <IonRadio slot="start" value="attending" />
      </IonItem>
      <IonItem>
        <IonLabel>Can't make it</IonLabel>
        <IonRadio slot="start" value="not_attending" />
      </IonItem>
    </IonRadioGroup>
    <IonSelect placeholder="How many guests will you be bringing?" onIonChange={e => setGuests(Number(e.detail.value))}>
      {/* Generate options from 0 to 10 */}
      {[...Array(11).keys()].map(number => (
        <IonSelectOption key={number} value={number}>{number}</IonSelectOption>
      ))}
    </IonSelect>
    <IonButton expand="full" type="button"  onClick={prevStep}>Back</IonButton>
    <IonButton expand="full" type="button"  onClick={nextStep}>Next</IonButton>
  </>
);

export default AttendanceAndGuests;
