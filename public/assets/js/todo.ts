import {firebaseConfig} from './config.js';
import * as firebase from 'firebase';
(
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // const model = {};
      const view = {
        init: () => {
          view.render();
        },
        render: () => {
        },
      };
      const controller = {
        init: () => {
          view.init();
        },
      };
      // const firebase = require('firebase');
      firebase.initializeApp(firebaseConfig);
      const ui = new firebase.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          {
            provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            defaultCountry: 'IN',
          },
        ],
        signInSuccessUrl: './user.html',
      });
      controller.init();
    }
  }
)();// anonymous function
