import React from 'react';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
const QrcodePage = () => {
  return (
    <div className='bg-slate-400  p-5 rounded-md z-40'>
      {/* <Image src={'/qr sample.png'} height={400} width={400} alt='qr code' /> */}
      <QRCodeSVG value='https://reactjs.org/' className='h-[400px] w-[400px]' />,
    </div>
  );
};

export default QrcodePage;
