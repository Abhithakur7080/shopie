import { titleCase, icons } from "../../assets";

const ProductDetail = ({ detail, setOpen }) => {
  return (
    <div className="w-full h-full top-0 left-0 fixed bg-black bg-opacity-30 z-20 flex items-center justify-center overflow-scroll">
      <div className="mt-3 md:mt-0 scale-up-center md:px-10 py-8 w-screen h-fit md:w-4/5 md:h-4/5 bg-white rounded-md shadow-lg">
        <button className="ml-[99%] text-2xl cursor-pointer" onClick={()=>setOpen(false)}><icons.RxCross1 /></button>
        {detail.map((item) => (
          <div key={item.id} className="max-w-full flex flex-col md:flex-row gap-8 px-8 py-5 mt-5">
            <div className="mt-3 px-5 py-5 min-w-72 max-w-96 min-h-72 max-h-96 bg-neutral-200 flex justify-center rounded-md">
              <img src={item.image} alt={item.title} className="max-w-full max-h-full" />
            </div>
            <div className="mt-3">
              <h4 className="uppercase text-neutral-500 font-extralight">{titleCase(item.category)}</h4>
              <h2 className="mt-5 text-3xl capitalize font-semibold">{item.title}</h2>
              <p className="mt-5 text-neutral-700">{item.description}</p>
              <h3 className="mt-3 text-4xl text-blue-500 font-semibold">${item.price}</h3>
              <button className="mt-8 px-14 py-4 bg-black rounded-sm text-white hover:bg-blue-500">Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
