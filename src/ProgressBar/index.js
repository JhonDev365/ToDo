import React from 'react'
import './ProgressBar.css';

const ProgressBar = ({total, completed}) => {
    const Childdiv = {
        height: '15',
        width: '90%',
        backgroundColor: 'red',
        borderRadius:40,
        textAlign: 'right'
      }

    return (
    <div className="Parentdiv">
      <div style={Childdiv}>
        {/* <span className="progresstext">{({total}/{completed})*100}%</span> */}
        <span className="progresstext">90%</span>
      </div>
    </div>
    )
}
  
export { ProgressBar };