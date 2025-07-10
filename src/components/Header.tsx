


interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
      return (
          <div className='h-16 bg-white flex justify-between items-center px-4'>
              {/* left bar */}
              <div className="flex items-center">
  
                  
                  <ul className='flex gap-1 text-m items-center font-sans '>
                      <li className='items-center'><img alt="img" width="27px" height="27px" src="https://c.animaapp.com/mclmkdkf288FZk/img/panel.svg"/></li>
                      <li className="text-gray-500   ">Workspace</li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -4 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
  
                      <li className="text-gray-500">Folder 2</li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -4 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 text-gray-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
  
                      <li className=" font-semibold">Spreadsheet 3</li>
                      <li className=""><img alt="" className="w-6 h-6  " src="https://c.animaapp.com/mclmkdkf288FZk/img/more.svg"/></li>
  
                  </ul>
              </div>
              {/* right bar */}
              <div className="flex">
                   <div className="flex items-center relative">
          <button className='py-2 px-1 border-l border-gray-200 rounded-l bg-gray-100 text-sm font-light h-8'>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search within sheet"
            className="py-2 border-r border-gray-200 rounded-r bg-gray-100 text-sm font-light h-8 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
                  <div className="relative inline-block ">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-8 text-gray-700"
                          fill="none"
                          viewBox="0 -2 24 24"
                          strokeWidth={1.2}
  
                          stroke="currentColor"
                      >
                          <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                          />
                      </svg>
  
                      {/* Notification badge */}
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center 
                     w-4 h-4 text-xs font-bold text-white bg-green-800 rounded-full">
                          2
                      </span>
                  </div>
  
                  <div className="flex items-center gap-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      {/* Profile Picture */}
                      <img
                          src="https://i.pravatar.cc/40?img=3" // example avatar
                          alt="John Doe"
                          className="w-7 h-7 rounded-full object-cover"
                      />
  
                      {/* Name + Dropdown icon */}
                      <div className="flex flex-col ">
                          <span className="text-sm font-sans text-gray-800">John Doe</span>
                          <span className="text-xs/6 font-sans  text-gray-400">john.doe...</span>
  
                      </div>
                  </div>
              </div>
          </div>
      )
  }
  
  export default Header