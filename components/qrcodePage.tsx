import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
const QrcodePage = () => {
  return (
    <div className='bg-slate-400  px-5 pt-5 rounded-md z-40'>
      <QRCodeSVG
        value='https://thesis-app-chi.vercel.app/OfficePage'
        className=' h-[250px] w-[250px] md:h-[400px] md:w-[400px]'
      />
      ,
    </div>
  );
};

export default QrcodePage;
