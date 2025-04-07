import React from 'react';
import { environment } from '../envirenement/environnement';

export default function Home() {
  return <div style={{ display: "flex", justifyContent: "center" ,}}>
    <img
    style={{ backgroundColor: "#0A8FDC"}}
      src={`${environment?.BASE_PATH ?? ''}/images/logo-oriachad.png`}
      alt='crema-logo'
      width="400"
    />
  </div>
}