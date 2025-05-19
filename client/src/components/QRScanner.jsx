import React from 'react';
import QrScanner from 'react-qr-scanner';

function QRScanner({ onScan }) {
  const handleScan = (data) => {
    if (data) {
      onScan(data);  // Send scanned data to the onScan handler
    }
  };

  const handleError = (err) => {
    console.error('QR Scanner error:', err);
  };

  return (
    <div className="qr-scanner">
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default QRScanner;