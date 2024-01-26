import React from 'react'
import Image from 'next/image'
const QrcodePage = () => {
  return (
    <div>


      <Image
      src={"/qr sample.png"}
      height={400}
      width={400}
      alt='qr code'
      />

    </div>
  )
}

export default QrcodePage