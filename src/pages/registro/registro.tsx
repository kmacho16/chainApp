import React, { FC, useState, useContext, useCallback } from 'react';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import {
  IonContent,
  IonPage,
  IonButton,
  IonImg,
  IonInput,
  IonAlert,
  NavContext,
  IonIcon,
  IonChip,
  IonLabel,
  IonLoading
} from '@ionic/react';
import style from './style.module.css';
import { qrCode, lockClosed, closeCircle } from 'ionicons/icons';
import { userRegister, validateHash } from '../../services/services';
import { Auth } from '../../model/auth';
import AlertComponent from '../../components/AlertComponent/AlertComponent';

const Registro: FC = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [uid, setUid] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<String>();
  const [showMoldalMessage, setShowMoldalMessage] = useState<boolean>(true);
  const { navigate } = useContext(NavContext);

  const openScanner = async () => {
    const data = await BarcodeScanner.scan();
    if (data) {
      setShowLoading(true);
      setShowAlert(false);
      const hash = data.text.split(':')[0];
      const date = new Date(data.text.split(':')[1]);
      const myDate = new Date();
      if (date > myDate) {
        validateHash(hash).then(response => {
          setShowLoading(false);
          if (response['continue']) {
            changeData();
          } else {
            setActive(false);
            setShowAlert(true);
          }
        });
      } else {
        setShowAlert(true);
      }
    } else {
      setShowAlert(true);
    }
  };
  const redirect = useCallback(() => navigate('/login', 'back'), [navigate]);

  const changeData = async () => {
    const uid = await UniqueDeviceID.get();
    if (uid) {
      setUid(uid);
      setActive(true);
    }
  };
  const showRender = () => {
    if (active) {
      return (
        <IonChip
          outline
          color="secondary"
          className={`${style['content-center-imei']}`}
        >
          <IonIcon icon={lockClosed} color="secondary" />
          <IonLabel>Huella celular capturada</IonLabel>
        </IonChip>
      );
    } else {
      return (
        <IonChip
          outline
          color="danger"
          className={`${style['content-center-imei-inactive']}`}
        >
          <IonIcon icon={closeCircle} color="danger" />
          <IonLabel>Aún no se tiene registro del telefono</IonLabel>
        </IonChip>
      );
    }
  };

  const registerData = () => {
    setShowLoading(true);
    const auth: Auth = {
      email: email!,
      password: password!,
      username: username!,
      uid: uid!
    };
    userRegister(auth).then((d: any) => {
      setShowMoldalMessage(true);
      setModalMessage(
        'Gracias, su usuario sera activado en un plazo maximo de 24 horas'
      );
      setShowLoading(false);
    });
  };
  return (
    <IonPage>
      <IonContent>
        <AlertComponent
          active={showMoldalMessage}
          message={modalMessage}
          action={redirect}
        ></AlertComponent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={''}
          spinner="crescent"
        ></IonLoading>
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
              active ? `${style['input']}` : `${style['input-inactive']}`
            }
            value={email}
            disabled={!active}
            placeholder="Email"
            onIonChange={e => setEmail(e.detail.value!)}
          ></IonInput>
          <IonInput
            className={
              active ? `${style['input']}` : `${style['input-inactive']}`
            }
            value={username}
            disabled={!active}
            placeholder="Username"
            onIonChange={e => setUsername(e.detail.value!)}
          ></IonInput>
          <IonInput
            className={
              active ? `${style['input']}` : `${style['input-inactive']}`
            }
            value={password}
            disabled={!active}
            type="password"
            placeholder="Password"
            onIonChange={e => setPassword(e.detail.value!)}
          ></IonInput>
          {showRender()}
          <IonButton
            disabled={!active}
            className={`${style['btn']}`}
            color="primary"
            expand="block"
            onClick={registerData}
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
