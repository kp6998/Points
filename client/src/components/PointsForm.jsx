import React, { useState } from 'react';

const PointsForm = ({ onSetPoints }) => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');

  const handleSetPoints = () => {
    // Call the onSetPoints function with the entered details
    onSetPoints(sender, receiver);
  };

  return (
    <div>
      <h2>Set Points</h2>
      <input
        type="text"
        placeholder="Sender"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <button onClick={handleSetPoints}>Set Points</button>
    </div>
  );
};

export default PointsForm;
