const {PythonShell} = require('python-shell')
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';


const analyzeMango = async (doc_name, db ) => {

    // Fetch data from Firebase
    const cityRef = db.collection('Mango Pictures').doc(doc_name);
    const doc = await cityRef.get();
    if (!doc.exists) {
    console.log('No such document!');
    } else {
    console.log('Document data:', doc.data());
    }

    // Run the python script to predict the state of the mango

    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
          scriptPath: 'C:/Users/Steven/Documents/GitHub/RainChecker/xhacks_website/src/expressBackend/express-api/src/email_users', //If you are having python_test.py script in same folder, then it's optional.
        args: [item, new_price, email] //An argument which can be accessed in the python file using sys.argv[1]
    };
    
    
    PythonShell.run('emailer.py', options, function (err, result){
          if (err) throw err;
          // result is an array consisting of messages collected
          //during execution of script.
        //   console.log('price: ', result.toString());  
        //   price = result.toString()   
        console.log('success') 

          
    });



}

export default analyzeMango