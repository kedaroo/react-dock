import './App.css'
import { DEFAULT_WIDTH } from './App';

interface Props {
  index: number;
  width: number;
}

const calculateTransform = (width: number): string => {
  const translateVal = (((width - DEFAULT_WIDTH) / DEFAULT_WIDTH) * 10).toString()
  return `translateY(-${translateVal}px)`
}

function Item(props: Props) {
  return (
    <div 
    onClick={() => {console.log('clicked', props.index)}}
      className='item' 
      style={{
        width: props.width, 
        transform: calculateTransform(props.width)
      }}
    />
  )
}

export default Item