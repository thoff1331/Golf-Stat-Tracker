import { expect, assert } from 'chai';
import {nextImg,prev,Img} from "./src/Components/Home/Home"

describe('tests for Home Component', function() {
  it('returns the first image', function ()  {
    assert.equal(nextImg,0)  
  } )  
})