import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyBl4SS089lh3EQSVdiPeNOBNhvWeFkrS3g",
    authDomain: "genshin-39618.firebaseapp.com",
    databaseURL: "https://genshin-39618-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "genshin-39618",
    storageBucket: "genshin-39618.appspot.com",
    messagingSenderId: "360822506418",
    appId: "1:360822506418:web:3f4784abcaf058d3d85aab"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('accountForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get values from form inputs
        const Character = document.getElementById('Character').value;
        const Named = document.getElementById('Named').value;
        const Quality = document.getElementById('Quality').value;
        const Element = document.getElementById('Element').value;
        const Weapon = document.getElementById('Weapon').value;
        const Region = document.getElementById('Region').value;

      
        const charactersRef = ref(db, 'characters/');

       
        const newCharacterRef = push(charactersRef);

       
        set(newCharacterRef, {
            character: Character,
            named: Named,
            quality: Quality,
            element: Element,
            weapon: Weapon,
            region: Region
        })
        .then(() => {
            alert('Data saved successfully!');

            // Clear the input fields
            document.getElementById('accountForm').reset();
        })
        .catch((error) => {
            console.error('Error saving data: ', error);
            alert('Failed to save data.');
        });
    });

   
    document.getElementById('download').addEventListener('click', () => {
        const dbRef = ref(db, 'characters/');
        
      
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Convert data to JSON and trigger download
                downloadFile('characters-data.json', JSON.stringify(data, null, 2));
            } else {
                alert('No data available for download');
            }
        }).catch((error) => {
            console.error('Error fetching data: ', error);
            alert('Failed to fetch data.');
        });
    });

   
    function downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
});
