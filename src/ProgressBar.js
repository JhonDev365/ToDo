import React from 'react'
import './ProgressBar.css';

const ProgressBar = ({total, completed}) => {
    const Childdiv = {
        height: '15',
        width: `{({total}/{completed})*100}%`,
        backgroundColor: '#99ff66',
        borderRadius:40,
        textAlign: 'right'
      }

    return (
    <div className="Parentdiv">
      <div style={Childdiv}>
        <span className="progresstext">{({total}/{completed})*100}%</span>
      </div>
    </div>
    )
}
  
export { ProgressBar };