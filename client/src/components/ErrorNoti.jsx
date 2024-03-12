
import { MdErrorOutline } from "react-icons/md";

const ErrorNoti = (props) => {
  return (
    <div className=" animate-jump-in animate-ease-in  bg-white py-10 fixed  dark:bg-dark">
      <div className="container">
        <div className="inline-flex rounded-lg bg-red-light-6 px-[18px] py-4 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.08)]">
          <p className="flex items-center text-sm font-medium text-[#BC1C21]">
            <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-red">
            <MdErrorOutline />
            </span>
            {props.Error}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorNoti;
