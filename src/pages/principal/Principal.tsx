import React, { FC, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/react';
import style from './style.module.css';
import { changeStateLed } from '../../services/services';

const Principal: FC = () => {
  const [stateLed, setStateLed] = useState<boolean>(true);
  const [led, setLed] = useState<string>('assets/img/ledOn.png');
  const changeState = () => {
    setStateLed(!stateLed);
    changeStateLed(stateLed ? 1 : 0);
    setLed(stateLed ? 'assets/img/ledOn.png' : 'assets/img/ledOff.png');
  };
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar className={`${style['toolBar']}`}>
          <IonTitle>Principal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={changeState}>
            <IonAvatar slot="start">
              <img src={led}></img>
            </IonAvatar>
            <IonLabel>
              <h3>Luz principal</h3>
              <p>
                La Luz en este momento se encuentra{' '}
                {stateLed ? 'Encendida' : 'Apagada'}
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Principal;
