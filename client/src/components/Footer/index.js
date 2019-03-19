import React from 'react';
import './style.css';


var style = {
  backgroundColor: "#ffffff",
  // borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "0px",
  position: "fixed",
  left: "0",
  bottom: "0",
  // height: "100px",
  width: "100%",
}

var phantom = {
display: 'block',
padding: '2px',
height: '6px',
width: '100%',
}

function Footer({ children }) {
  return (
      <div>
          <div style={phantom} />
          <div style={style}>
              { children }
          </div>
      </div>
  )
}

export default Footer
