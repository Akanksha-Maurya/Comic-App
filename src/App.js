import React, { useState} from 'react';
import ComicForm from './ComicForm';
import ComicDisplay from './ComicDisplay';
import 'bootstrap/dist/css/bootstrap.min.css'; //Import the bootstrap
import './App.css'; // Import the CSS file
import logoImg from './comic-logo-jpg (2).jpg';

const API_KEY = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM";
const API_URL = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";

const App = () => {
  const [comicImages, setComicImages] = useState([]);
  const [error, setError] = useState(null); // State for managing errors

  //to generate comic
  const generateComic = (texts) => {
    setError(null); // Reset error state before making a new request
    const query = async (data) => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Accept": "image/png",
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Failed to generate images');
        }
        const result = await response.blob();
        return result;
      } catch (error) {
        setError('Error generating images. Please try again.'); // Update error state
        console.error('API Error:', error);
        return null; // Return null or handle the error accordingly
      }
    };

    //to generate image
    const generateImage = async () => {
      const images = [];
      for (let i = 0; i < texts.length; i++) {
        try {
          const imageData = await query({ "inputs": texts[i] });
          if (imageData) {
            images.push(URL.createObjectURL(imageData));
          }
        } catch (error) {
          console.error('Error generating image:', error);
        }
      }
      setComicImages(images);
    };

    generateImage();
  };

  return (
    <div className="App">   
    <img src={logoImg} alt="comic-logo" className="logo-img"/> 
    <div className="tit">Comic Creator App</div>
    {error && <div className="error-message">{error}</div>}
    <ComicForm generateComic={generateComic} />
    <ComicDisplay comicImages={comicImages} />
    </div>
  );
};

export default App;

