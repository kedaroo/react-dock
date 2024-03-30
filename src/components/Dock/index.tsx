import './index.css'

export default function Dock() {
  return (
    <>
      <input step={0.1} type="range" min={0} max={1} value={magnification} onChange={(e) => {setMagnification(parseFloat(e.target.value))}} />
      <span style={{fontSize: '2rem'}}>{magnification}</span>
      <div
        ref={conRef}
        className="con"
        onMouseMove={throttledMouseMoveHandler}
        onMouseLeave={() => {setScaleValue(new Array(EL_COUNT).fill(DEFAULT_WIDTH))}}
      >
        {new Array(EL_COUNT).fill("").map((_, idx) => (
          <Item
            key={idx}
            index={idx}
            width={widthArray[idx]}
          />
        ))}
      </div>      
    </>
  )
}
