
import React, { useState } from 'react';
import { IonInput, IonItem, IonLabel, IonButton, IonRadioGroup, IonRadio, IonSelect, IonSelectOption, IonDatetime } from '@ionic/react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TravelDetails: React.FC<{ setTravelDetails: (info: any) => void; nextStep: () => void }> = ({ setTravelDetails, nextStep }) => {
  const [travelMethod, setTravelMethod] = useState("");
  const [flightNumberArriving, setFlightNumberArriving] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [departureTimeArriving, setDepartureTimeArriving] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [flightNumberDeparting, setFlightNumberDeparting] = useState("");
  const [departureTimeDeparting, setDepartureTimeDeparting] = useState("");
  const [shuttleRequired, setShuttleRequired] = useState("");
  const [shuttleDestination, setShuttleDestination] = useState("");
  const [hotel, setHotel] = useState("");
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!travelMethod || (travelMethod === 'flying' && (!flightNumberArriving || !departureAirport || !departureTimeArriving || !arrivalTime || !flightNumberDeparting || !departureTimeDeparting || !shuttleRequired || (shuttleRequired === 'yes' && (!shuttleDestination || (shuttleDestination === 'hotel' && !hotel)))))) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setTravelDetails({ travelMethod, flightNumberArriving, departureAirport, departureTimeArriving, arrivalTime, flightNumberDeparting, departureTimeDeparting, shuttleRequired, shuttleDestination, hotel });
    nextStep();
  };

  const exportToExcel = () => {
    const data = [
      { travelMethod, flightNumberArriving, departureAirport,departureTimeArriving,arrivalTime ,flightNumberDeparting,departureTimeDeparting}
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
      <IonLabel>Tell us how you will be getting to the conference *</IonLabel>
      <IonRadioGroup onIonChange={e => setTravelMethod(e.detail.value)}>
        <IonItem>
          <IonLabel>Flying in</IonLabel>
          <IonRadio slot="start" value="flying" />
        </IonItem>
        <IonItem>
          <IonLabel>Self Drive</IonLabel>
          <IonRadio slot="start" value="drive" />
        </IonItem>
      </IonRadioGroup>
      {travelMethod === 'flying' && (
        <>
          <IonItem>
            <IonLabel>Flight Number - Arriving</IonLabel>
            <IonInput onIonChange={e => setFlightNumberArriving(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel>Departure Airport</IonLabel>
            <IonSelect onIonChange={e => setDepartureAirport(e.detail.value)}>
              <IonSelectOption value="east_london">East London Airport</IonSelectOption>
              <IonSelectOption value="george">George Airport</IonSelectOption>
              <IonSelectOption value="or_tambo">O.R. Tambo International Airport</IonSelectOption>
              <IonSelectOption value="lanseria">Lanseria International Airport</IonSelectOption>
              <IonSelectOption value="grand_central">Grand Central Airport</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Departure Time - Arriving</IonLabel>
            <IonDatetime display-format="h:mm A" picker-format="h:mm A" onIonChange={e => setDepartureTimeArriving(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel>Arrival Time</IonLabel>
            <IonDatetime display-format="h:mm A" picker-format="h:mm A" onIonChange={e => setArrivalTime(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel>Flight Number - Departing</IonLabel>
            <IonInput onIonChange={e => setFlightNumberDeparting(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel>Departure Time - Departing</IonLabel>
            <IonDatetime display-format="h:mm A" picker-format="h:mm A" onIonChange={e => setDepartureTimeDeparting(e.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel>Do you require a shuttle from the airport? *</IonLabel>
            <IonRadioGroup onIonChange={e => setShuttleRequired(e.detail.value)}>
              <IonItem>
                <IonLabel>Yes</IonLabel>
                <IonRadio slot="start" value="yes" />
              </IonItem>
              <IonItem>
                <IonLabel>No</IonLabel>
                <IonRadio slot="start" value="no" />
              </IonItem>
            </IonRadioGroup>
          </IonItem>
          {shuttleRequired === 'yes' && (
            <>
              <IonItem>
                <IonLabel>Where would you like the shuttle to take you? *</IonLabel>
                <IonRadioGroup onIonChange={e => setShuttleDestination(e.detail.value)}>
                  <IonItem>
                    <IonLabel>Hotel</IonLabel>
                    <IonRadio slot="start" value="hotel" />
                  </IonItem>
                  <IonItem>
                    <IonLabel>Nelson Mandela Stadium</IonLabel>
                    <IonRadio slot="start" value="stadium" />
                  </IonItem>
                </IonRadioGroup>
              </IonItem>
              {shuttleDestination === 'hotel' && (
                <IonItem>
                  <IonLabel>Hotel</IonLabel>
                  <IonSelect onIonChange={e => setHotel(e.detail.value)}>
                    <IonSelectOption value="garden_court">Garden Court Airport Hotel</IonSelectOption>
                    <IonSelectOption value="southern_sun">Southern Sun Airport Hotel</IonSelectOption>
                    <IonSelectOption value="intercontinental">InterContinental Airport Hotel</IonSelectOption>
                    <IonSelectOption value="premier">Premier Airport Hotel</IonSelectOption>
                    <IonSelectOption value="protea">Protea Airport Hotel</IonSelectOption>
                    <IonSelectOption value="protea_transit">Protea Airport Transit Hotel</IonSelectOption>
                  </IonSelect>
                </IonItem>
              )}
            </>
          )}
        </>
      )}
      <IonButton expand="full" style={{ marginTop: 30 }} onClick={exportToExcel}>
        Submit
      </IonButton>
      {error && <IonLabel color="danger">{error}</IonLabel>}
    </>
  );
};

export default TravelDetails;
