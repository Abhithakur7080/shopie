// import images
import phone from "./images/phone.png";
import watch from "./images/watch.png";
import headphone from "./images/headphone.png";
import cpuHeater from "./images/cpuHeater.png";

//import banner images
import banner1 from "./images/banner-1.png";
import banner2 from './images/banner-2.png';

import productData from './Products.json'

//import icons
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsBagCheck, BsEye, BsArrowRight, BsCurrencyDollar, BsYoutube } from "react-icons/bs";
import { BiHeadphone } from "react-icons/bi";
import { CiLogin, CiLogout, CiDollar } from "react-icons/ci";
import { FaTruck, FaShopify } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FcBusinessman, FcBusinesswoman, FcCamcorderPro  } from "react-icons/fc";
import { GiJewelCrown } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { RiFacebookFill } from 'react-icons/ri'

const categoryImage = [
  { name: "phone", src: phone, qty: 20 },
  { name: "watch", src: watch, qty: 40 },
  { name: "headphone", src: headphone, qty: 30 },
  { name: "cpu heater", src: cpuHeater, qty: 10 },
];

const icons = {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineInstagram,
  AiOutlineTwitter,
  BsBagCheck,
  BsCurrencyDollar,
  BsArrowRight,
  BsEye,
  BsYoutube,
  BiHeadphone,
  CiLogin,
  CiLogout,
  CiDollar,
  FiTruck,
  FaTruck,
  FaShopify,
  FcBusinessman,
  FcBusinesswoman,
  FcCamcorderPro,
  GiJewelCrown,
  GrPowerReset,
  HiOutlineReceiptPercent,
  RiFacebookFill,
};

const aboutInfo = [
  { Icon: FiTruck, text: "Free Shipping", subText: "Order above $1000" },
  {
    Icon: CiDollar,
    text: "Return & Refund",
    subText: "Money Back guarantee",
  },
  {
    Icon: HiOutlineReceiptPercent,
    text: "Member Discount",
    subText: "On every Order",
  },
  { Icon: BiHeadphone, text: "Customer Support", subText: "24 X 7"},
];

const titleCase = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};


export { categoryImage, icons, aboutInfo, titleCase, productData, banner1, banner2 };
