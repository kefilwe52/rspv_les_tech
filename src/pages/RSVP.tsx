import { Redirect, Route } from 'react-router-dom';
import React, { useState } from 'react';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
   IonButton, 
   IonInput, 
   IonSelect, 
   IonSelectOption,
    IonRadioGroup,
     IonRadio,
      IonCheckbox, IonItem, IonSearchbar, IonCard
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import PersonalInfo from './PersonalInfo';
import AttendanceAndGuests from './AttendanceAndGuests';
import DietaryRestrictions from './DietaryRestrictions';
import AdditionalInfo from './AdditionalInfo';
import Accommodation from './Accommodation';
import TravelDetails from './TravelDetails';

setupIonicReact();



const RSVP: React.FC = () => {
  // State to hold the current step
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guests, setGuests] = useState(0);
  const [restrictions, setRestrictions] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [needsAccommodation, setNeedsAccommodation] = useState(false);
  const [travelDetails, setTravelDetails] = useState({});


  // Function to go to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  const [searchText, setSearchText] = useState('');
  // Function to go to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  
  const setPersonalInfo = (info: any) => {
    setName(info.name);
    setEmail(info.email);
    setContact(info.contact);
  };
  // Render different content based on the step
  let content;
  switch (step) {
    case 1:
      content = <AttendanceAndGuests setAttendance={setAttendance} setGuests={setGuests} prevStep={prevStep} nextStep={nextStep} />;
      break;
    case 2:
      content = <PersonalInfo setPersonalInfo={setPersonalInfo} nextStep={nextStep} />;
      break;
      case 3:
        content = <TravelDetails setTravelDetails={setTravelDetails} nextStep={nextStep} />;
        break;
    // case 4:
    //   content = <AdditionalInfo setAdditionalInfo={setAdditionalInfo} prevStep={prevStep} nextStep={nextStep} />;
    //   break;
    //   case 5:
    //     content = <Accommodation setAccommodation={setAccommodation} setArrivalDate={setArrivalDate} setNeedsAccommodation={setNeedsAccommodation} prevStep={prevStep} nextStep={nextStep} />;
    //     break;
      default:
        content = <div>All steps completed!</div>;
  }
   return content;
};

export default RSVP;
