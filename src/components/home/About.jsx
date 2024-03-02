import { aboutInfo } from "../../assets";

const About = () => {
  return (
    <div className="px-10 py-8 md:px-12 md:py-10 w-full">
      <div className="max-w-full flex flex-wrap gap-3 justify-between">
        {aboutInfo.map(({ Icon, text, subText }) => (
          <div
            key={text}
            className="px-5 py-3 flex flex-col md:flex-row items-center gap-3 bg-blue-100 w-[9rem] md:w-64 rounded-md shadow-md cursor-pointer"
          >
            <div className="text-pink-700 text-5xl">
              <Icon />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-center">{text}</h3>
              <p className="md:text-nowrap text-center text-gray-600">
                {subText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default About;
