import type { RowData } from "../types";
import React, { useState, useRef } from "react";

interface SpreadsheetProps {
  data: RowData[];
  setData: React.Dispatch<React.SetStateAction<RowData[]>>;
  searchTerm: string;
  hiddenColumns: string[];
  compactView: boolean;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({
  data,
  setData,
  searchTerm,
  hiddenColumns,
  compactView,
}) => {

  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);
  const cellRefs = useRef<Array<Array<HTMLElement | null>>>([]);


 

  cellRefs.current = data.map((row) =>
    (Object.keys(row) as (keyof RowData)[]).map(() => null)
  );

  const handleChange = (index: number, field: keyof RowData, value: string) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };



  const handleKeyDown = (e: React.KeyboardEvent, row: number, col: number) => {
    let newRow = row;
    let newCol = col;

    switch (e.key) {
      case "ArrowDown":
        newRow = Math.min(row + 1, data.length - 1);
        break;
      case "ArrowUp":
        newRow = Math.max(row - 1, 0);
        break;
      case "ArrowLeft":
        newCol = Math.max(col - 1, 0);
        break;
      case "ArrowRight":
        newCol = Math.min(col + 1, Object.keys(data[0]).length - 1);
        break;
      case "Escape":
        (e.target as HTMLInputElement).blur();
        return;
    }

    e.preventDefault();
    setFocusedCell({ row: newRow, col: newCol });
    cellRefs.current[newRow][newCol]?.focus();
  };

  const columnTypes: { [key in keyof RowData]?: string } = {
    status: "tag",
    priority: "tag",
    url: "url",
    value: "currency",
  };

  const renderCell = (value: string | number, type: string, idx: number, columnIndex: number, key: keyof RowData) => {
    switch (type) {
      case "url":
        return (
          <input
            ref={(el) => {
              if (!cellRefs.current[idx]) cellRefs.current[idx] = [];
              cellRefs.current[idx][columnIndex] = el;
            }}
            onFocus={() => setFocusedCell({ row: idx, col: columnIndex })}
            onKeyDown={(e) => handleKeyDown(e, idx, columnIndex)}
            className="bg-transparent underline  hover:text-blue-900 outline-none w-full truncate text-sm"
            value={value as string}
            onChange={(e) => handleChange(idx, key, e.target.value)}
            tabIndex={0}
          />
        );

      case "currency":
        return (
          <>
            <input
              type="text"
              ref={(el) => {
                if (!cellRefs.current[idx]) cellRefs.current[idx] = [];
                cellRefs.current[idx][columnIndex] = el;
              }}
              onFocus={() => setFocusedCell({ row: idx, col: columnIndex })}
              onKeyDown={(e) => handleKeyDown(e, idx, columnIndex)}
              className="bg-transparent outline-none text-right mr-1 w-20"
              value={value ? Number(value).toLocaleString("en-IN") : ""}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, "");
                handleChange(idx, key, raw);
              }}
            />
            <span className={value ? " text-gray-700 items-start" : "hidden"}>₹</span>
          </>
        );
      case "tag":
        return (
          <div className={`rounded items-center flex justify-center `}>
            <input
              ref={(el) => {
                if (!cellRefs.current[idx]) cellRefs.current[idx] = [];
                cellRefs.current[idx][columnIndex] = el;
              }}
              onFocus={() => setFocusedCell({ row: idx, col: columnIndex })}
              onKeyDown={(e) => handleKeyDown(e, idx, columnIndex)}
              tabIndex={0}
              className={`text-sm text-center w-full  outline-none rounded-full  ${getTagColor(
                value as string
              )}`}
              value={value as string}
              style={{ width: `${(value as string)?.length + 1}ch` }}
              onChange={(e) => handleChange(idx, key, e.target.value)}
            />
          </div>

        );
      default:
        return <span className="text-sm">{value}</span>;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "in-process":
        return "bg-amber-100 text-yellow-800 font-semibold items-center";
      case "need to start":
        return "bg-gray-200 text-gray-700 font-semibold text-center";
      case "blocked":
        return "bg-red-200 text-red-700 font-semibold text-center";
      case "complete":
        return "bg-green-200 text-green-700 font-semibold text-center";
      case "low":
        return "text-blue-500 font-semibold text-center";
      case "medium":
        return "text-yellow-600 font-semibold text-center";
      case "high":
        return "text-red-500 font-semibold text-center";
      default:
        return " font-semibold text-center";
    }
  };


  return (
    <div className="mr-4">
      <div className="overflow-x-auto shadow">
        <table className="mt-0 table-auto w-full text-sm text-left">
        <thead>
  <tr>
    <th className="text-gray-300 border-2 border-amber-50 text-center font-semibold text-2xl px-3 sticky top-0 z-10 bg-gray-100 max-w-[40px] min-w-[40px] w-[40px] truncate">
      #
    </th>

    {!hiddenColumns.includes("jobRequest") && (
      <th className="text-gray-500 border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-gray-100 max-w-[240px] min-w-[240px] w-[240px] truncate">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img alt="Briefcase" className="w-5 h-5" src="https://c.animaapp.com/mclmkdkf288FZk/img/briefcase.svg" />
            Job Request
          </div>
          <button onClick={() => console.log("clicked")} className="relative flex items-center">
            <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron.svg" />
          </button>
        </div>
      </th>
    )}

    {!hiddenColumns.includes("submitted") && (
      <th className="text-gray-500 border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-gray-100 max-w-[140px] min-w-[140px] w-[140px] truncate">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img alt="Calendar" className="w-5 h-5" src="https://c.animaapp.com/mclmkdkf288FZk/img/calendar.svg" />
            Submitted
          </div>
          <button onClick={() => console.log("clicked")} className="relative flex items-center">
            <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron.svg" />
          </button>
        </div>
      </th>
    )}

    {!hiddenColumns.includes("status") && (
      <th className="text-gray-500 border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-gray-100 max-w-[140px] min-w-[140px] w-[140px] truncate">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img alt="Status" className="w-5 h-5" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron-circle.svg" />
            Status
          </div>
          <button onClick={() => console.log("clicked")} className="relative flex items-center">
            <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron.svg" />
          </button>
        </div>
      </th>
    )}

    {!hiddenColumns.includes("submitter") && (
      <th className="text-gray-500 border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-gray-100 max-w-[140px] min-w-[140px] w-[140px] truncate">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img alt="Person" className="w-5 h-5" src="https://c.animaapp.com/mclmkdkf288FZk/img/person.svg" />
            Submitter
          </div>
          <button onClick={() => console.log("clicked")} className="relative flex items-center">
            <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron.svg" />
          </button>
        </div>
      </th>
    )}

    {!hiddenColumns.includes("url") && (
      <th className="text-gray-500 border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-gray-100 max-w-[140px] min-w-[140px] w-[140px] truncate">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img alt="Globe" className="w-5 h-5" src="https://c.animaapp.com/mclmkdkf288FZk/img/globe.svg" />
            URL
          </div>
          <button onClick={() => console.log("clicked")} className="relative flex items-center">
            <img alt="" src="https://c.animaapp.com/mclmkdkf288FZk/img/chevron.svg" />
          </button>
        </div>
      </th>
    )}

    {!hiddenColumns.includes("assigned") && (
      <th className="border-2 border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 bg-[#d2e0d4a4] max-w-[140px] min-w-[140px] w-[140px] truncate">
        <div className="flex items-center gap-2">
          <img alt="Emoji" className="w-5 h-5 invert-0" src="https://c.animaapp.com/mclmkdkf288FZk/img/emoji.svg" />
          Assigned
        </div>
      </th>
    )}

    {!hiddenColumns.includes("priority") && (
      <th className="border-2 border-amber-50 px-3 py-1 text-left font-semibold text-sm text-purple-900 bg-[#dccffcb4] max-w-[140px] min-w-[140px] w-[140px] truncate">
        Priority
      </th>
    )}

    {!hiddenColumns.includes("dueDate") && (
      <th className="border border-amber-50 px-3 py-1 text-left font-semibold text-sm text-purple-900 bg-[#dccffcb4] max-w-[140px] min-w-[140px] w-[140px] truncate">
        Due Date
      </th>
    )}

    {!hiddenColumns.includes("value") && (
      <th className="border border-amber-50 px-3 py-1 text-left font-semibold text-sm text-[#724625d9] bg-[#ffb7a564] max-w-[140px] min-w-[140px] w-[140px] truncate">
        Est. Value
      </th>
    )}

    <th className="border-x-stone-300 border-2 border-dashed border-amber-50 px-3 py-2 text-left font-semibold text-sm sticky top-0 z-10 max-w-[125px] min-w-[125px] w-[125px] truncate mr-5" />
  </tr>
</thead>

          <tbody>
            {data.map((row, idx) => {
              const rowString = Object.values(row).join(" ").toLowerCase();
              const isMatch = rowString.includes(searchTerm.toLowerCase());

              return (
                <tr
                  key={idx}
                  className={searchTerm && isMatch ? "bg-yellow-100" : "border-gray-200"}
                >
                  <td className="border border-gray-200 text-center">{idx + 1}</td>
                  {(Object.keys(row) as (keyof RowData)[]).map((key, columnIndex) =>
                    !hiddenColumns.includes(key) ? (
                      <td
                        key={String(key)}
                        className={`border border-gray-200 max-w-[140px] min-w-[100px] w-[140px] whitespace-nowrap align-middle truncate overflow-ellipsis items-center justify-center m-auto ${focusedCell?.row === idx && focusedCell?.col === columnIndex
                            ? "outline outline-blue-500 bg-blue-50"
                            : ""
                          }`}
                      >
                        {columnTypes[key]
                          ? renderCell(row[key], columnTypes[key]!, idx, columnIndex, key)
                          : (
                            <input
                              ref={(el) => {
                                if (!cellRefs.current[idx]) cellRefs.current[idx] = [];
                                cellRefs.current[idx][columnIndex] = el;
                              }}
                              tabIndex={0}
                              onFocus={() => setFocusedCell({ row: idx, col: columnIndex })}
                              onKeyDown={(e) => handleKeyDown(e, idx, columnIndex)}
                              className={`outline-none bg-transparent px-4 py-2 w-full truncate overflow-ellipsis focus:outline-green-500 active:shadow-green-900 focus:outline-2 focus:outline-offset-2 focus:border-green-900 focus:bg-blue-50 ${compactView ? "px-1 py-1 text-xs" : "px-4 py-2 text-sm"
                                } `}
                              value={row[key] as string}
                              onChange={(e) => handleChange(idx, key, e.target.value)}
                            />
                          )}
                      </td>
                    ) : null
                  )}
                  <td className="border-x-stone-300 border-2 border-dashed border-gray-50 px-6 py-1">
                    <button></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
