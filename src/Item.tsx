import React from 'react'
import './App.css'

interface Props {
  index: number;
  width: number;
}

function Item(props: Props) {
  return (
    <div 
      className='item' 
      style={{width: props.width}}
    />
  )
}

export default Item