import React from 'react'
import './ProgressBar.css';

const ProgressBar = ({total, completed}) => {
        
    return (
    <div className="Parentdiv">
      <div className="Childdiv">
        <span className="progresstext">{({total}/{completed})*100}%</span>
      </div>
    </div>
    )
}
  
export { ProgressBar };