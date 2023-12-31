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
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import PersonalInfo from './pages/PersonalInfo';
import AttendanceAndGuests from './pages/AttendanceAndGuests';
import DietaryRestrictions from './pages/DietaryRestrictions';
import AdditionalInfo from './pages/AdditionalInfo';
import Accommodation from './pages/Accommodation';

/* Theme variables */
import './theme/variables.css';
import TravelDetails from './pages/TravelDetails';

setupIonicReact();



const App: React.FC = () => {
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


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonTitle>RSVP</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ backgroundColor: '#121212', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} color="dark" />
        <IonCard style={{ width: '100%', maxWidth: '1000px', marginTop: '40px' }}>
          {content}
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default App;
