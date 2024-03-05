import { icons } from "../../assets";

const About = () => {
  return (
    <div className="px-10 py-8 w-full">
      <div>
        <h3 className="text-5xl text-center md:text-left uppercase font-normal text-blue-600">
          # about us
        </h3>
        <div className="px-8 mt-3 py-8 bg-blue-50 rounded-md shadow-md">
          <div className="mt-3  flex gap-2 items-center justify-center">
            <div>
              <icons.FaShopify className="text-blue-600" size={"2rem"} />
            </div>
            <h1 className="text-2xl font-extrabold italic text-blue-600">
              Shopie
            </h1>
          </div>
          <p className="text-2xl text-center font-semibold mt-3 shadow-md py-5 px-4">
            Welcome to Shopie, your premier destination for all your online
            shopping needs. At Shopie, we believe in providing our customers
            with a seamless and enjoyable shopping experience from start to
            finish.
          </p>
          
          <p className="text-2xl text-center font-semibold mt-3 shadow-md py-5 px-4">
            Established with a passion for connecting people with top-quality products, Shopie aims to simplify the online shopping process by
            offering a diverse range of products across various categories.
            Whether you're looking for the latest fashion trends, cutting-edge electronics, or essential household items, we've got you covered.
          </p>
          <p className="text-2xl text-center font-semibold mt-3 shadow-md py-5 px-4">
            Our commitment to customer satisfaction is at the forefront of
            everything we do. We strive to offer competitive prices, exceptional customer service, and a secure platform for your peace of mind. With Shopie, you can shop confidently, knowing that your satisfaction is our top priority.
          </p>
          <p className="text-2xl text-center font-semibold mt-3 shadow-md py-5 px-4">
            At Shopie, we're more than just an e-commerce website; we're a
            community dedicated to helping you find exactly what you need, when you need it. Join us on this exciting journey as we continue to expand our product offerings and enhance your shopping experience.
          </p>
          <p className="text-2xl text-center font-normal mt-3 italic">Thank you for choosing Shopie. Happy shopping!</p>
          
        </div>
      </div>
    </div>
  );
};

export default About;
