import React from 'react'
import './indicator.css'


export default function Indicator({formIndex}) {
  

  
    return (
    <div className='container-indicator'>
        <div className="container-lines">
            <div className="line upper-line"
            style={{
                width: formIndex === 1 ? "0%"
                : formIndex === 2 ? "0%"
                : formIndex === 3 ? "30%"
                : formIndex === 4 ? "60%"
                : formIndex === 5 ? "90%"
                : formIndex === 6 ? "100%"
                : ""
            }}
            > </div>
            <div className="line under-line" >

            </div>
        </div>

        <div className='container-img'>
            <div className="bloc-img">
                {/* <img src={healthy} alt="" /> */}
            </div> 
            <div className="bloc-img">
                {/* <img src={love} alt="" /> */}
            </div> 
            <div className="bloc-img">
                {/* <img src={allergy} alt="" /> */}
            </div> 
            <div className="bloc-img">
                {/* <img src={diet} alt="" /> */}
            </div>
        </div>

    </div>
  )
}
