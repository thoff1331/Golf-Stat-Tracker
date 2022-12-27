import * as React from 'react';
import './Home.css'
import {useState} from 'react'
import * as imgs from '../../constants/HomeConstants.json'

function Home() {
    const [imgPage,setImgPage] = useState(0)
    const imageIndex = Array.from(imgs)  
    const numOfImages = imageIndex.length
    function nextImg() {
     setImgPage( imgPage === numOfImages - 1 ? 0 : imgPage + 1)   
    }
    function prevImg() {
        setImgPage( imgPage === 0  ? 0 : imgPage - 1)   
       }

  return (
    <div className='home-container'>
<button onClick={() => prevImg()} className='image-scroller' data-testid="button">{"<"}  </button>
<img src={imgs[imgPage].src}  alt='golf-news' />
<button  onClick={() => nextImg()}  className='image-scroller'> {">"}</button>
</div>
  );
}

export default Home;