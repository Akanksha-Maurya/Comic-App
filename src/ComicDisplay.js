import React from 'react';
import { useState } from 'react';

const ComicDisplay = ({ comicImages }) => {
    const [textInputs, setTextInputs] = useState(Array(comicImages.length).fill(''));

    const handleInputChange = (index, event) => {
        const newInputs = [...textInputs];
        newInputs[index] = event.target.value;
        setTextInputs(newInputs);
    };

  return (
    <div className="container-mt-4">
      <h2 className="mb-4">Generated Comic Panels</h2>
      <div className="row">
        {comicImages.map((image, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <div className="card">
              <img src={image} className="card-img-top" alt={`Comic Panel ${index + 1}`}/>
              <div className="speech-bubble">
                <textarea style={{width: '100%'}}
                  className="form-control"
                  placeholder="Add speech bubbles...."
                  value={textInputs[index]}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComicDisplay;
