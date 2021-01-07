import React, { FC, useState, useContext, useCallback } from 'react';
import {
  IonButton,
  IonPage,
  IonContent,
  IonInput,
  IonImg,
  NavContext
} from '@ionic/react';
import style from './style.module.css';

const Login: FC = () => {
  const { navigate } = useContext(NavContext);
  const [username, setusername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const redirect = useCallback(() => navigate('/registro', 'back'), [navigate]);
  return (
    <IonPage className={`${style['container']}`}>
      <IonContent>
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
          >
            Ingresar
          </IonButton>
          <p className={`${style['link']}`}>Olvidaste tu contraseña?</p>
          <p
            className={`${style['link']}`}
            onClick={e => {
              redirect();
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
