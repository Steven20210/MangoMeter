import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import {View, TextInput, Image, Text} from 'react-native'

let condition = ""

const AnalyzeMango = async () => {

    let mangoUrl = ""
    // Fetch data from storage
    const storage = getStorage();
    const storageRef = ref(storage, 'gs://mangometer-2e7ef.appspot.com/mango')
    getDownloadURL(storageRef)
    .then((url) => {
    // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        console.log(url)
        mangoUrl = url
    })
    
    const prediction = await fetch('http://e6e3-50-65-185-217.ngrok.io', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: mangoUrl,
        })
        }).then
        ((response) => response.json()).then((json) => {
            return json.prediction
        });
    
    condition = prediction

    

}
module.exports = {
    AnalyzeMango,
    condition
}