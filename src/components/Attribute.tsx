

const Attribute = () => {
    return (
     
        <div className="m-0 flex flex-row items-center justify-between px-3">
          <div className="flex flex-row items-center ml-7 pr-[462px] pl-3 py-1 bg-gray-200">
            <div className="flex flex-row items-center gap-1 p-1  bg-gray-100 rounded-sm text-gray-700 shadow-sm text-sm">
              <img
                alt=""
                src="https://c.animaapp.com/mclmkdkf288FZk/img/link.svg"
              />
              Q3 Financial Overview
            </div>
            <div className="ml-1">
              <img
                alt=""
                src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-sync.svg"
              />
            </div>
          </div>
          <div className="flex items-center  space-x-0.5 ">
            <div className="flex items-center py-2 px-2 w-[138px] bg-[#d2e3d7] shadow-sm text-gray-800 justify-center text-sm font-medium">
              <img
                className="w-4 h-4 mr-1 invert-30 "
                alt="icon"
                src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-split.svg"
              />
              <span className="text-gray-800  text-sm flex items-center">
                ABC
                <img
                  className="w-4 h-4 ml-1"
                  alt="more"
                  src="https://c.animaapp.com/mclmkdkf288FZk/img/more.svg"
                />
              </span>
            </div>
            <div className="flex items-center px-2 py-2 bg-[#dccffc] shadow-sm w-[278px] justify-center">
              <img
                className="w-4 h-4 mr-1"
                alt="icon"
                src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-split.svg"
              />
              <span className="text-gray-800 font-medium text-sm flex items-center">
                Answer a question
                <img
                  className="w-4 h-4 ml-1"
                  alt="more"
                  src="https://c.animaapp.com/mclmkdkf288FZk/img/more.svg"
                />
              </span>
            </div>
            <div className="flex items-center w-[136px] py-2 bg-[#ffb5a2b8] shadow-sm justify-center ">
              <img
                className="w-4 h-4 mr-1"
                alt="icon"
                src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-split.svg"
              />
              <span className="text-[#724625d9] font-medium text-sm flex items-center">
                Extract
                <img
                  className="w-4 h-4 ml-1"
                  alt="more"
                  src="https://c.animaapp.com/mclmkdkf288FZk/img/more.svg"
                />
              </span>
            </div>
            <button className=" border-x-stone-300 border-2 border-dashed border-gray-50 w-[105px]  flex items-center mr-1  bg-[#eeeeee] shadow-sm font-normal text-2xl p-0.5 justify-center">
              +
              {/* <img
                className="w-12 h-5 invert-20 "
                alt="plus"
                src="https://c.animaapp.com/mclmkdkf288FZk/img/add.svg"
              /> */}
            </button>
          </div>
        </div>
     
    );
  };
  
  export default Attribute;
  