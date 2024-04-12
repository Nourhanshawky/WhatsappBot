import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [qrCode, setQrCode] = useState('');
  useEffect(() => {
    socket.on('qr_code', qrCodeData => {
      setQrCode(qrCodeData);
    });

    return () => {
      socket.off('qr_code');
    };
  }, []);

  console.log(qrCode)

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {qrCode && (
                <>
                  <div className="text-center">
                    <h4>Scan this QR code</h4>
                    <img src={qrCode} className="img-fluid" alt="QR Code" />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='mt-4'>
            <h3>Steps To Scan QR Code</h3>
            <div className='d-flex'>
              <p className="mt-4 fs-5">To scan the QR code, open WhatsApp on your mobile device. Tap Linked devices and then Link a device. Point your device's camera at the QR code.
              </p>
              <img src="../images/scan.jpg" width={200} alt="Scan" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
