import React from "react";
import { icons } from "../../assets";

const Logo = ({title='', className=''}) => {
  return (
    <div className="py-5 flex gap-2 items-center justify-center">
      <div>
        <icons.FaShopify className="text-blue-600" size={"2rem"} />
      </div>
      <h1 className="text-2xl font-extrabold text-blue-600">{title}</h1>
    </div>
  );
};

export default Logo;
