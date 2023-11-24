import React, { useState } from 'react';

const ComicForm = ({ generateComic }) => {
  const [panelTexts, setPanelTexts] = useState(Array(10).fill(''));

  const handleInputChange = (index, event) => {
    const newPanelTexts = [...panelTexts];
    newPanelTexts[index] = event.target.value;
    setPanelTexts(newPanelTexts);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generateComic(panelTexts);
  };

  return (
    <form className="container-mt-4" onSubmit={handleSubmit}>
      <h2 className="mb-4">Enter Text for Comic Panels</h2>
      {panelTexts.map((text, index) => (
        <div className="mb-3" key={index}>
          <label className="form-label">Panel {index + 1}</label>
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => handleInputChange(index, e)}
          />
        </div>
      ))}
      
      <button type="submit" className="btn btn-secondary">Generate Comic</button>
    </form>
  );
};

export default ComicForm;
