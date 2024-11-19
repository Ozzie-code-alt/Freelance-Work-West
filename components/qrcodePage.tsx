import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
const QrcodePage = () => {
  return (
    <div className='bg-slate-400  px-5 pt-5 rounded-md z-40'>
      <QRCodeSVG value='https://thesis-app-chi.vercel.app/' className='h-[400px] w-[400px]' />,
    </div>
  );
};

export default QrcodePage;
