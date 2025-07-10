import React, { useState } from "react";
import type { RowData } from '../types';

interface ToolbarProps {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
  compactView: boolean;
  setCompactView: React.Dispatch<React.SetStateAction<boolean>>;
  
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const Toolbar: React.FC<ToolbarProps> = ({
  data,
  setData,
  compactView,
  setCompactView,
  setHiddenColumns,
}) => {
  const [isOpen, setIsOpen] = useState(true); 
  // toolbar open by default
  const handleSort = () => {
    const nonBlank = data.filter(row => row.submitted.trim() !== "");
    const blanks = data.filter(row => row.submitted.trim() === "");
  
    const sorted = [...nonBlank].sort((a, b) => {
      const dateA = new Date(a.submitted.split("-").reverse().join("-"));
      const dateB = new Date(b.submitted.split("-").reverse().join("-"));
      return dateA.getTime() - dateB.getTime(); // ascending order
    });
  
    setData([...sorted, ...blanks]); // blank rows at bottom
  };
  
  
  
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.onload = event => {
      const json = JSON.parse(event.target?.result as string);
      setData(json);
    };
    if (e.target.files?.[0]) {
      fileReader.readAsText(e.target.files[0]);
    }
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "spreadsheet-data.json";
    link.click();
  };

  const handleAddRow = () => {
    setData([...data, {
      jobRequest: "", submitted: "", status: "", submitter: "",
      url: "", assigned: "", priority: "", dueDate: "", value: ""
    }]);
  };
  const handleFilter = () => {
    const filtered = data.filter(row => row.priority.toLowerCase() === "high");
    setData(filtered);
  };
  const handleShare = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Spreadsheet data copied to clipboard!");
  };
  
  const toggleColumn = (col: string) => {
    setHiddenColumns(prev =>
      prev.includes(col)
        ? prev.filter(c => c !== col) // unhide
        : [...prev, col]              // hide
    );
  };
  

  return (
    <div className="flex flex-wrap justify-between items-center border border-gray-300 bg-white  p-2">
      
      {/* Left Toolbar Section */}
      <div className="flex items-center gap-4">
        <button onClick={() => setIsOpen(prev => !prev)} className="flex items-center gap-1 hover:text-blue-600 text-base font-medium">
          Tool bar
          <span className="text-lg transition-transform duration-200">
            {isOpen ? '»' : '»'}
          </span>
        </button>

        <div className="h-5 w-px bg-gray-300"></div>

        {isOpen && (
          <div   className="flex items-center gap-4  transition-all duration-300">
            <div className="relative group">
  <button className="flex items-center gap-1 hover:text-blue-600">
    <img alt="icons" width="22" src="https://c.animaapp.com/mclmkdkf288FZk/img/eye.svg" />
    Hide Fields
  </button>
  <div className="absolute left-0 mt-1 hidden group-hover:block bg-white border rounded shadow text-sm z-30 ">
    {["jobRequest", "submitted", "status", "submitter", "url", "assigned", "priority", "dueDate", "value"].map((colKey) => (
      <button
        key={colKey}
        onClick={() => toggleColumn(colKey)}
        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
      >
        Hide {colKey.charAt(0).toUpperCase() + colKey.slice(1)}
      </button>
    ))}
  </div>
</div>


            <button onClick={handleSort} className="flex items-center gap-1 hover:text-blue-600">
              <img alt="icons" width="22" src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-sort.svg" />
              Sort
            </button>

            <button onClick={handleFilter}  className="flex items-center gap-1 hover:text-blue-600">
              <img alt="icons" width="22" src="https://c.animaapp.com/mclmkdkf288FZk/img/filter.svg" />
              Filter
            </button>

            <button onClick={() => setCompactView(prev => !prev)} className="flex items-center gap-1 hover:text-blue-600">
              <img alt="icons" width="22" src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-autofit.svg" />
              {compactView ? "Expand View" : "Cell View"}
              
            </button>
          </div>
        )}
      </div>

      {/* Right Buttons Section */}
      <div className="flex items-center gap-3 text-gray-600 font-medium mt-2 sm:mt-0">
        <label className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
          <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-download.svg" />
          Import
          <input type="file" accept=".json" className="hidden" onChange={handleImport} />
        </label>

        <button onClick={handleExport} className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
          <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-upload.svg" />
          Export
        </button>

        <button onClick={handleShare} className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50">
          <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/share.svg" />
          Share
        </button>

        <button onClick={handleAddRow} className="flex items-center gap-2 px-5 py-3 bg-[#32681d] text-white rounded-md hover:bg-green-800">
          <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/arrow-split.svg" />
          New Action
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
