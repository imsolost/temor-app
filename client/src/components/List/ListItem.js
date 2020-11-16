import React from "react";

function coords() {
  let a = Math.random() * 2 * Math.PI
  let r = 250 * Math.sqrt(Math.random())
  let x = r * Math.cos(a)
  let y = r * Math.sin(a)
  return [x, y]
}

export const ListItem = props => (
  <div className="listItemTest" style={{ 
    position: "absolute",
    // position: "relative", 
    left: window.innerWidth / 2 + coords()[0] + "px",
    top: window.innerHeight / 2 + coords()[1] + "px",
    // left: coords()[0] + "px",
    // top: coords()[1] + "px"
  }}>
    {props.children}
  </div>
  // <div className="listItem"
  //   style={{ 
  //     position: "absolute",
  //     position: "relative", 
  //     // left: window.innerWidth / 2 + coords()[0] + "px",
  //     // top: window.innerHeight / 2 + coords()[1] + "px"
  //     left: coords()[0] + "px",
  //     top: coords()[1] + "px"
  //   }}>
  //   {props.children}
  // </div>
);
