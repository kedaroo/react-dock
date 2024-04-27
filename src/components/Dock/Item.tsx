import { DEFAULT_WIDTH } from './utils';
import './index.css'

interface Props {
  index: number;
  width: number;
  children: React.ReactNode;
  gap: number;
}

const calculateTransform = (width: number): string => {
  const translateVal = (Math.round(((width - DEFAULT_WIDTH) / DEFAULT_WIDTH) * 10 * 100) / 100 ).toString()
  return `translateY(-${translateVal}px)`
}

export default function Item(props: Props) {
  return (
    <div
      className='item'
      style={{
        width: props.width,
        transform: calculateTransform(props.width),
      }}
    >
      <div 
        className='inner-wrapper'
        style={{
          transform: `scale(${(props.width/DEFAULT_WIDTH).toString()})`
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
