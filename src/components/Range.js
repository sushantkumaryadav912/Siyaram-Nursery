"use client";
import React, { useState } from 'react'

const Range = ({ min, max, priceValue, setInputCategory }) => {
    const [ currentRangeValue, setCurrentRangeValue ] = useState(priceValue);

    const handleRange = (e) => {
        setCurrentRangeValue(parseInt(e.target.value));
    }

  return (
    <div>
        <input type="range" min={min} max={max} value={priceValue} className="range range-warning" />
        <span>{ `Max price: $${currentRangeValue}` }</span>
    </div>
  )
}

export default Range