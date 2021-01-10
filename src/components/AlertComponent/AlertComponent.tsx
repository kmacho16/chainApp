import React from 'react';
import { IonAlert } from '@ionic/react';

const AlertComponent = (props: any) => {
  const { active, message, action } = props;
  return (
    <IonAlert
      header={'Aviso'}
      isOpen={active}
      message={message}
      backdropDismiss={false}
      buttons={[
        {
          text: 'Entendido',
          cssClass: 'secondary',
          handler: volver => {
            action();
          }
        }
      ]}
    ></IonAlert>
  );
};
export default AlertComponent;
