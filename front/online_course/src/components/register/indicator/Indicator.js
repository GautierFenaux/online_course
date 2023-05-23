import React from 'react'
import './indicator.css'
import { FaAddressBook, FaSortAmountUp, FaMusic} from 'react-icons/fa';

export default function Indicator({formIndex}) {
  

  
    return (
    <div className='container-indicator'>
        <div className="container-lines">
            <div className="line upper-line"
            style={{
                width: formIndex === 1 ? "0%"
                : formIndex === 2 ? "50%"
                : formIndex === 3 ? "98%"
                : ""
            }}
            > </div>
            <div className="line under-line" >

            </div>
        </div>

        <div className='container-img'>
            <div className="bloc-img">
            <FaAddressBook className='icon'size={32}/>
            </div> 
            <div className="bloc-img">
                <FaSortAmountUp  className='icon' size={28}/>
            </div> 
            <div className="bloc-img">
                <FaMusic className='icon' size={28}/>
                {/* <img src={allergy} alt="" /> */}
            </div> 
        </div>

    </div>
  )
}
