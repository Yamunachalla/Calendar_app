import React from "react";

const TooltipComponent = ({ comm, children }) => {
  return (
    <span title={comm.notes}>
      {children}
    </span>
  );
};

export default TooltipComponent;
