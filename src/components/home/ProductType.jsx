import { categoryImage } from "../../assets";

const ProductType = () => {
  return (
    <div className="py-8 px-10 w-full">
      <div className="max-w-full flex justify-between gap-3 flex-wrap">
        {categoryImage.map(({ name, src, qty }) => (
          <div key={name} className="py-3 px-5 slide-top group">
            <div className="w-24 h-24 md:w-52 md:h-52 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center shadow-lg cursor-pointer">
              <img
                src={src}
                alt={name}
                className="w-12 h-12 md:w-24 md:h-24 group-hover:scale-150 transition-all duration-700"
              />
            </div>
            <div className="max-w-full text-center">
              <p className="mt-3 text-blue-300">{qty} products</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProductType;
