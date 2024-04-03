// import images
import phone from "./images/phone.png";
import watch from "./images/watch.png";
import headphone from "./images/headphone.png";
import cpuHeater from "./images/cpuHeater.png";

//import banner images
import banner1 from "./images/banner-1.png";
import banner2 from './images/banner-2.png';

import sold from "./images/sold.png"

import productData from './Products.json'

//import icons
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineHeart, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsBagCheck, BsEye, BsArrowRight, BsCurrencyDollar, BsYoutube } from "react-icons/bs";
import { BiHeadphone } from "react-icons/bi";
import { CiLogin, CiLogout, CiDollar } from "react-icons/ci";
import { FaTruck, FaShopify, FaPlus, FaMinus, FaEye, FaRegEyeSlash, FaTwitter } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { FcBusinessman, FcBusinesswoman, FcCamcorderPro  } from "react-icons/fc";
import { GiJewelCrown, GiShoppingCart } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { RiFacebookFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'

const categoryImage = [
  { name: "phone", src: phone, productname: "Mobile phones" },
  { name: "watch", src: watch, productname: "watches"},
  { name: "headphone", src: headphone, productname: "Headphones" },
  { name: "cpu heater", src: cpuHeater, productname: "Accessories" },
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
  FaTwitter,
  FaShopify,
  FaPlus,
  FaMinus,
  FaEye,
  FaRegEyeSlash,
  FcBusinessman,
  FcBusinesswoman,
  FcCamcorderPro,
  GiJewelCrown,
  GiShoppingCart,
  GrPowerReset,
  HiOutlineReceiptPercent,
  RiFacebookFill,
  RxCross1,
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
const truncktext = (text) => {
  if (text.length > 30) {
    return text.slice(0, 30) + "...";
  } else {
    return text;
  }
};

export { categoryImage, icons, aboutInfo, titleCase, truncktext, productData, banner1, banner2, sold };
