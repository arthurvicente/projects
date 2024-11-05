import React, { useEffect, useState } from 'react';
import axios from 'axios';

/***
 * This React component fetches a message from an API and allows the user to upload a file.
 * It demonstrates the use of state management, side effects with useEffect, and handling file uploads.
 * 
 * Key functionalities:
 * - Fetch a message from the API when the component mounts.
 * - Allow the user to select a file and upload it to the server.
 * - Display messages based on the API responses and upload status.
 */

function App() {
  // State to store the message fetched from the API
  const [message, setMessage] = useState('');
  // State to store the selected file for upload
  const [file, setFile] = useState(null);
  // State to store the upload status message
  const [uploadMessage, setUploadMessage] = useState('');
  // State to manage the upload process
  const [isUploading, setIsUploading] = useState(false);

  // useEffect hook to fetch the message from the API when the component mounts
  useEffect(() => {
    // Function to fetch the message from the API
    const fetchMessage = async () => {
      try {
        const response = await axios.get('/api');
        setMessage(response.data.message); // Set the fetched message to state
      } catch (error) {
        console.error('Error fetching message:', error.response ? error.response.data : error.message); // Log any errors
      }
    };

    fetchMessage(); // Call the fetchMessage function
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handler for file input change event
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file to state
  };

  // Handler for file upload button click event
  const handleFileUpload = async () => {
    if (!file) {
      setUploadMessage('Please select a file first.'); // Ensure a file is selected
      return;
    }

    setIsUploading(true); // Disable the button during upload
    const formData = new FormData();
    formData.append('file', file); // Append the selected file to the form data

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
      setUploadMessage(response.data.message); // Set the upload response message to state
    } catch (error) {
      console.error('Error uploading file:', error.response ? error.response.data : error.message); // Log any errors
      setUploadMessage('Error uploading file'); // Set an error message to state
    } finally {
      setIsUploading(false); // Re-enable the button after upload
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p> {/* Display the fetched message */}
        <input type="file" onChange={handleFileChange} /> {/* File input for selecting a file */}
        <button onClick={handleFileUpload} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button> {/* Button to trigger file upload */}
        <p>{uploadMessage}</p> {/* Display the upload status message */}
      </header>
    </div>
  );
}

export default App;
