import React, { FC, useState, useContext, useCallback } from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonImg,
  IonInput,
  IonAlert,
  NavContext,
  IonIcon,
  IonItem,
  IonChip,
  IonLabel
} from '@ionic/react';
import style from './style.module.css';
import { star, qrCode, pin, close, lockClosed } from 'ionicons/icons';

const Registro: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [active, setActive] = useState<boolean>(true);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { navigate } = useContext(NavContext);

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    if (data) {
      setShowAlert(false);
      const date = new Date(data.text.split(':')[1]);
      const myDate = new Date();
      if (date > myDate) {
        changeData();
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }

    console.log(`Barcode data: ${data.text}`);
  };
  const redirect = useCallback(() => navigate('/login', 'back'), [navigate]);

  const changeData = async () => {
    const uid = await UniqueDeviceID.get();
    if (uid) {
      setUsername(uid);
      console.log('Cambio de data', uid);
      setActive(!active);
    }
  };
  return (
    <IonPage>
      <IonContent>
        <IonAlert
          header={'Aviso'}
          isOpen={showAlert}
          message={
            'Para poder realizar el registro es necesario que captures el codigo <strong>QR</strong> desde el dispositivo que vas a registrar'
          }
          backdropDismiss={false}
          buttons={[
            {
              text: 'Cancelar',
              cssClass: 'secondary',
              handler: volver => {
                redirect();
              }
            },
            {
              text: 'Ok, capturar',
              cssClass: 'primary',
              handler: capturar => {
                openScanner();
              }
            }
          ]}
        ></IonAlert>
        <div>
          <IonImg src="assets/img/header.png" />
        </div>
        <div className={`${style['card-body']}`}>
          <IonInput
            className={
              active ? `${style['input-inactive']}` : `${style['input']}`
            }
            value={email}
            disabled={active}
            placeholder="Email"
            onIonChange={e => setEmail(e.detail.value!)}
          ></IonInput>
          <IonInput
            className={
              active ? `${style['input-inactive']}` : `${style['input']}`
            }
            value={username}
            disabled={active}
            placeholder="Username"
            onIonChange={e => setUsername(e.detail.value!)}
          ></IonInput>
          <IonInput
            className={
              active ? `${style['input-inactive']}` : `${style['input']}`
            }
            value={password}
            disabled={active}
            type="password"
            placeholder="Password"
            onIonChange={e => setPassword(e.detail.value!)}
          ></IonInput>
          <IonChip
            outline
            color="secondary"
            className={`${style['content-center']}`}
          >
            <IonIcon icon={lockClosed} color="secondary" />
            <IonLabel>Icon Chip</IonLabel>
          </IonChip>
          <IonButton
            disabled={active}
            className={`${style['btn']}`}
            color="primary"
            expand="block"
          >
            Registrar
          </IonButton>
        </div>
        <section className={`${style['content-center']}`}>
          <IonButton
            disabled={!active}
            onClick={openScanner}
            color="tertiary"
            size="small"
          >
            <IonIcon slot="start" icon={qrCode} />
            Capturar
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Registro;
