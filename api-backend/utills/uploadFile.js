const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const fbConfig = require("./firebaseConfig");
const giveCurrentDateTime = require("./giveCurrentDateTime");


const storage = getStorage(fbConfig);

const uploadFileToFirebase = async (file) => {
    const dateTime = giveCurrentDateTime();
    const storageRef = ref(storage, `files/${file.originalname + "       " + dateTime}`);

    // Create file metadata including the content type
    const metadata = {
        contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log('File successfully uploaded.');
    return {
        message: 'file uploaded to firebase storage',
        name: file.originalname,
        type: file.mimetype,
        downloadURL: downloadURL
    };
};


module.exports = uploadFileToFirebase;