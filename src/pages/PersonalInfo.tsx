import React, { useState } from 'react';
import { IonInput, IonButton, IonText, IonLabel, IonItem, IonRadio, IonRadioGroup, IonSelect, IonSelectOption } from '@ionic/react';

const PersonalInfo: React.FC<{ setPersonalInfo: (info: any) => void; nextStep: () => void }> = ({ setPersonalInfo, nextStep }) => {
    const [attendance, setAttendance] = useState("");
    const [title, setTitle] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [dietaryRequirements, setDietaryRequirements] = useState("");
    const [error, setError] = useState('');
  
    const handleNext = () => {
      if (!attendance || !firstName || !lastName || !phone || !email || (attendance === 'yes' && (!organization || !professionalTitle || !dietaryRequirements))) {
        setError('Please fill in all fields.');
        return;
      }
  
      setError('');
      setPersonalInfo({ attendance, title, firstName, lastName, phone, email, organization, professionalTitle, dietaryRequirements });
      nextStep();
    };
  
    return (
      <>
        <IonRadioGroup onIonChange={e => setAttendance(e.detail.value)}>
          <IonItem>
            <IonLabel>Yes, I will be there</IonLabel>
            <IonRadio slot="start" value="yes" />
          </IonItem>
          <IonItem>
            <IonLabel>Unfortunately not</IonLabel>
            <IonRadio slot="start" value="no" />
          </IonItem>
        </IonRadioGroup>
        <IonItem>
          <IonLabel>Title</IonLabel>
          <IonSelect onIonChange={e => setTitle(e.detail.value)}>
            <IonSelectOption value="mr">Mr</IonSelectOption>
            <IonSelectOption value="ms">Ms</IonSelectOption>
            <IonSelectOption value="mrs">Mrs</IonSelectOption>
            <IonSelectOption value="dr">Dr</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>First Name</IonLabel>
          <IonInput onIonChange={e => setFirstName(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel>Last Name</IonLabel>
          <IonInput onIonChange={e => setLastName(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel>Phone</IonLabel>
          <IonInput type="tel" onIonChange={e => setPhone(e.detail.value as string)} />
        </IonItem>
        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput type="email" onIonChange={e => setEmail(e.detail.value as string)} />
        </IonItem>
        {attendance === 'yes' && (
          <>
            <IonItem>
              <IonLabel>Organization</IonLabel>
              <IonInput onIonChange={e => setOrganization(e.detail.value as string)} />
            </IonItem>
            <IonItem>
              <IonLabel>Professional Title</IonLabel>
              <IonInput onIonChange={e => setProfessionalTitle(e.detail.value as string)} />
            </IonItem>
            <IonLabel>Dietary requirements *</IonLabel>
            <IonRadioGroup onIonChange={e => setDietaryRequirements(e.detail.value)}>
              <IonItem>
                <IonLabel>None</IonLabel>
                <IonRadio slot="start" value="none" />
              </IonItem>
              <IonItem>
                <IonLabel>Vegetarian</IonLabel>
                <IonRadio slot="start" value="vegetarian" />
              </IonItem>
              <IonItem>
                <IonLabel>Halaal</IonLabel>
                <IonRadio slot="start" value="halaal" />
              </IonItem>
              <IonItem>
                <IonLabel>Other</IonLabel>
                <IonRadio slot="start" value="other" />
              </IonItem>
            </IonRadioGroup>
          </>
        )}
        {error && <p>{error}</p>}
        <IonButton expand="full" fill="solid" style={{ marginTop: '20px' }} onClick={handleNext}>{attendance === 'no' ? 'Submit' : 'Next'}</IonButton>
      </>
    );
  };
  
  export default PersonalInfo;