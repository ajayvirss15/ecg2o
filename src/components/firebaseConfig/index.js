import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

function StartFirebase() {
    const config = {
      apiKey: "AIzaSyCpdJ1Iwql-bNRUolSAvZiJ02cXsF1IH9U",
      authDomain: "heart-detection2o.firebaseapp.com",
      databaseURL: "https://heart-detection2o-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "heart-detection2o",
      storageBucket: "heart-detection2o.appspot.com",
      messagingSenderId: "1072652216200",
      appId: "1:1072652216200:web:97a8a100044819eb047c3d"
      };

    const app = initializeApp(config);
    return getDatabase(app);

}

export default StartFirebase;
