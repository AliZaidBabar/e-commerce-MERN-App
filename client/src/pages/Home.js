import React from 'react'
import Landingsection from '../components/landingsection'
import Mothersdaysellers from '../components/mothersdaysellers'
import Bestsellers from '../components/bestsellers'
import Shopbycategory from '../components/shopbycategory'
import Moisturizer from '../components/moisturizer'
import Lipforanybride from '../components/lipforanybride'
import Chatwithartist from '../components/chatwithartist'
import Ourgift from '../components/ourgift'

function Home() {
  return (
    <div className='scrollable-home-page'>
      <Landingsection/>
      {/* <Mothersdaysellers/> */}
      <Bestsellers/>
      <Shopbycategory/>
      <Moisturizer/>
      <Chatwithartist/>
      <Ourgift/>
    </div>
  )
}

export default Home