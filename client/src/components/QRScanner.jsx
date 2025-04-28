import React from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner({ onScan }) {
  return (
    <div className="qr-scanner">
      <QrReader
        delay={300}
        onResult={(result, error) => {
          if (result) {
            onScan(result?.text);  // Send scanned data to the onScan handler
          }
          if (error) {
            console.error(error);
          }
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default QRScanner;