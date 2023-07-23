
import React, { useState } from 'react';
import { IonRadioGroup, IonRadio, IonLabel, IonItem, IonButton, IonDatetime, IonText, IonCheckbox } from '@ionic/react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Accommodation: React.FC<{ setAccommodation: (accommodation: string) => void; setArrivalDate: (date: string) => void; setNeedsAccommodation: (needsAccommodation: boolean) => void; prevStep: () => void; nextStep: () => void }> = ({ setAccommodation, setArrivalDate, setNeedsAccommodation, prevStep, nextStep }) => {
    const [accommodation, setAccommodationLocal] = useState("");
    const [arrivalDate, setArrivalDateLocal] = useState("");
    const [needsAccommodation, setNeedsAccommodationLocal] = useState(false);
    const [error, setError] = useState('');
  
    const handleNext = () => {
      if (needsAccommodation && (!accommodation || !arrivalDate)) {
        setError('Please fill in all fields.');
        return;
      }
  
      setError('');
      setAccommodation(accommodation);
      setArrivalDate(arrivalDate);
      setNeedsAccommodation(needsAccommodation);
      nextStep();
    };
  
    const exportToExcel = () => {
      const data = [
        { accommodation, arrivalDate, needsAccommodation }
      ];
  
      /* Create workbook and worksheet */
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      
      /* Add worksheet to workbook */
      XLSX.utils.book_append_sheet(wb, ws, "Data");
  
      /* Write workbook and save to file */
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      let buf = new ArrayBuffer(wbout.length);
      let view = new Uint8Array(buf);
      for (let i=0; i<wbout.length; i++) view[i] = wbout.charCodeAt(i) & 0xFF;
      saveAs(new Blob([buf],{type:"application/octet-stream"}), 'data.xlsx');
    };
  
    return (
      <>
        <IonItem>
          <IonLabel>Will you require accommodation?</IonLabel>
          <IonCheckbox slot="start" onIonChange={e => setNeedsAccommodationLocal(e.detail.checked)} />
        </IonItem>
        {needsAccommodation && (
          <>
            <IonItem>
              <IonLabel>Select Arrival Date:</IonLabel>
              <IonDatetime placeholder="Select Date" onIonChange={e => setArrivalDateLocal(e.detail.value as string)} />
            </IonItem>
            <IonRadioGroup onIonChange={e => setAccommodationLocal(e.detail.value)}>
              <IonItem>
                <IonLabel>Hampton Inn Hotel Room Block</IonLabel>
                <IonRadio slot="start" value="hampton_inn" />
              </IonItem>
              <IonItem>
                <IonLabel>Comfort Suites Lake Norman Hotel Room Block</IonLabel>
                <IonRadio slot="start" value="comfort_suites" />
              </IonItem>
              <IonItem>
                <IonLabel>Airbnb or other hotel accommodations</IonLabel>
                <IonRadio slot="start" value="airbnb" />
              </IonItem>
              <IonItem>
                <IonLabel>I will not be needing accommodation.</IonLabel>
                <IonRadio slot="start" value="no_accommodation" />
              </IonItem>
            </IonRadioGroup>
          </>
        )}
        {error && <IonText color="danger">{error}</IonText>}
        <IonButton expand="full" fill="solid" style={{ marginTop: '20px' }} onClick={prevStep}>Back</IonButton>
        <IonButton expand="full" fill="solid" style={{ marginTop: '20px' }} onClick={handleNext}>Next</IonButton>
        <IonButton expand="full" fill="solid" style={{ marginTop: '20px' }} onClick={exportToExcel}>Submit</IonButton>
      </>
    );
  };
  
  export default Accommodation;