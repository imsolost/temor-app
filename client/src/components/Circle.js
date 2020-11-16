import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ 
      width: 500, 
      height: 500, 
      clear: "both", 
      textAlign: "center", 
      borderRadius: "50%", 
      margin: "auto"
    }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
