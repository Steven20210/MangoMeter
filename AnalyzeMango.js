import { getStorage, ref, getDownloadURL } from 'firebase/storage'
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

        mangoUrl = url
    })



    // Run the python script to predict the state of the mango
    // const spawn = require("child_process").spawn;
    // const pythonProcess = spawn('python', ["C/Users/Steven/Documents/mangoBackend", mangoUrl])
    
    // pythonProcess.stdout.on('data', (data) => {
    //     condition = data.toString()
    // });
    




}
module.exports = {
    AnalyzeMango,
    condition
}