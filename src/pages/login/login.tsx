import React, { FC, useState, useContext, useCallback } from 'react';
import {
  IonButton,
  IonPage,
  IonContent,
  IonInput,
  IonImg,
  NavContext,
  IonLoading
} from '@ionic/react';
import style from './style.module.css';
import { Auth } from '../../model/auth';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { loginUser } from '../../services/services';
import AlertComponent from '../../components/AlertComponent/AlertComponent';
const Login: FC = () => {
  const { navigate } = useContext(NavContext);
  const [username, setusername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [uid, setUid] = useState<string>();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<String>();
  const [showMoldalMessage, setShowMoldalMessage] = useState<boolean>(false);

  const redirectRegistro = useCallback(() => navigate('/registro', 'back'), [
    navigate
  ]);
  const redirectPrincipal = useCallback(() => navigate('/principal', 'back'), [
    navigate
  ]);

  const getUid = async () => {
    const uid = '12a51da51da5da5da11d15aa2'; //await UniqueDeviceID.get();
    setUid(uid);
    return uid;
  };

  const login = () => {
    setShowLoading(true);
    getUid().then(r => {
      const auth: Auth = {
        username: username!,
        password: password!,
        uid: r
      };
      loginUser(auth)
        .then(response => {
          setShowLoading(false);
          if (response['continue']) {
            localStorage.setItem('token', response['token']);
            setModalMessage('Logueado con exito');
            setShowMoldalMessage(true);
            redirectPrincipal();
          } else {
            setModalMessage(response['message']);
            setShowMoldalMessage(true);
          }
        })
        .catch(error => {
          setShowLoading(false);
          console.log('ERROR', error);
        });
    });
  };
  return (
    <IonPage className={`${style['container']}`}>
      <IonContent>
        <IonLoading
          cssClass="my-custom-class"
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={''}
          spinner="crescent"
        ></IonLoading>
        <AlertComponent
          active={showMoldalMessage}
          message={modalMessage}
          action={() => {
            setShowMoldalMessage(false);
          }}
        ></AlertComponent>
        <div>
          <IonImg src="assets/img/header.png" />
        </div>
        <div className={`${style['card-body']}`}>
          <IonInput
            className={`${style['input']}`}
            value={username}
            autocomplete="off"
            placeholder="Username"
            onIonChange={e => setusername(e.detail.value!)}
          ></IonInput>
          <IonInput
            className={`${style['input']}`}
            value={password}
            autocomplete="off"
            type="password"
            placeholder="Password"
            onIonChange={e => setPassword(e.detail.value!)}
          ></IonInput>
          <IonButton
            shape="round"
            className={`${style['btn']}`}
            color="primary"
            expand="block"
            onClick={login}
          >
            Ingresar
          </IonButton>
          <p className={`${style['link']}`}>Olvidaste tu contraseña?</p>
          <p
            className={`${style['link']}`}
            onClick={e => {
              redirectRegistro();
            }}
          >
            Crear Cuenta
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
