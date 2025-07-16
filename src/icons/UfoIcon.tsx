import React from "react";
import { IconProps } from "../types";

const UfoIcon: React.FC<IconProps> = ({ color = "currentColor", ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      {...props}
    >
      <path d="M12 2c-3.5 0-6.5 1.5-8 3.5C2.5 7 2 8.5 2 10c0 2 1.5 3.5 4 4.5l1 2c.5 1 1.5 1.5 2.5 1.5h5c1 0 2-.5 2.5-1.5l1-2c2.5-1 4-2.5 4-4.5 0-1.5-.5-3-1.5-4.5C18.5 3.5 15.5 2 12 2zm0 2c2.5 0 4.5 1 5.5 2.5.5.8.5 1.5.5 2.5 0 1-1 2-2.5 2.5L15 12c-.2.5-.8.8-1.5.8h-3c-.7 0-1.3-.3-1.5-.8l-.5-1C6 10.5 5 9.5 5 8.5c0-1 0-1.7.5-2.5C6.5 5 8.5 4 12 4z"/>
      <circle cx="8" cy="8" r="1"/>
      <circle cx="16" cy="8" r="1"/>
      <circle cx="12" cy="8" r="1"/>
    </svg>
  );
};

export default UfoIcon;
