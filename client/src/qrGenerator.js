
import QRCode from 'qrcode';
import fs from 'fs';


async function generateStaticQRCode() {
  const qrData = 'INOUTQR_CHECKIN_CODE_2024Q4'; // Unique identifier for Q4 2024
  const outputPath = './qr_codes/inout_qr_checkin_code_q4.png';

  await QRCode.toFile(outputPath, qrData, function (err) {
    if (err) throw err;
    console.log('QR code saved to', outputPath);
  });
}

generateStaticQRCode();