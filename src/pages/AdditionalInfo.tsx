
import React from 'react';
import { IonTextarea, IonButton } from '@ionic/react';

const AdditionalInfo: React.FC<{ setAdditionalInfo: (additionalInfo: string) => void; prevStep: () => void; nextStep: () => void }> = ({ setAdditionalInfo, prevStep, nextStep }) => (
  <>
    <IonTextarea placeholder="Please elaborate on any dietary restrictions that apply, or let us know if there's anything else you'd like to tell us. Hope to see you soon!" onIonChange={e => setAdditionalInfo(e.detail.value!)} />
    <IonButton expand="full" type="button"  onClick={prevStep}>Back</IonButton>
    <IonButton expand="full" type="button"  onClick={nextStep}>Next</IonButton>
  </>
);

export default AdditionalInfo;
