import React from 'react'
import {screen,render, cleanup} from '@testing-library/react'
import App from './App'
import { assert } from 'chai';
import {nextImg,prev,Img,Home} from "./Components/Home/Home"

 afterEach(cleanup)
 
 it('should take a snapshot', () => {
    const { asFragment } = render(<App />)
    
    expect(asFragment(<App />)).toMatchSnapshot()
   });


describe('tests for Home Component', function() {
   render(<button onClick={() => prevImg()} className='image-scroller'>{"<"}  </button>); 
   const button = screen.queryByTestId("button"); 
   it('returns the first image', function ()  {
     assert.equal(nextImg,undefined)  
   } )  
   test("Button Rendering", () => {
      expect(button).not.toBeInTheDocument(); 
  })
 })


   