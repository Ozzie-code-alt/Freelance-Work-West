import React from 'react';
import Image from 'next/image';
const QrcodePage = () => {
  return (
    <div className='bg-slate-400 rounded-md z-40'>
      <Image src={'/qr sample.png'} height={400} width={400} alt='qr code' />
    </div>
  );
};

export default QrcodePage;
