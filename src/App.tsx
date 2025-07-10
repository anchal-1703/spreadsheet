
import './App.css'
import { useState } from 'react';
import Attribute from './components/Attribute';
import Header from './components/Header';
import Spreadsheet from './components/Spreadsheet';
import Toolbar from './components/Toolbar';

import type { RowData } from './types';


function App() {


  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [compactView, setCompactView] = useState(false);


  // your spreadsheet data
  const generateBlankRows = (count: number): RowData[] =>
  Array.from({ length: count }, () => ({
    jobRequest: "",
    submitted: "",
    status: "",
    submitter: "",
    url: "",
    assigned: "",
    priority: "",
    dueDate: "",
    value: ""
  }));

  const [searchTerm, setSearchTerm] = useState(""); 
  const [data, setData] = useState<RowData[]>([
    {
      jobRequest: 'Launch social media campaign for pro...',
      submitted: '15-11-2024',
      status: 'In-process',
      submitter: "Aisha Patel",
      url: "www.aishapatel...",
      assigned: 'Sophie Choudhury',
      priority: 'Medium',
      dueDate: '20-11-2024',
      value: '6200000'
    },
    {
       jobRequest: 'Update press kit for company redesign',
    submitted: '28-10-2024',
    status: 'Need to start',
    submitter: 'Irfan Khan',
    url: 'www.irfankhan.com',
    assigned: 'Tejas Pandey',
    priority: 'High',
    dueDate: '30-10-2024',
    value: '3500000'
    },
    {
       jobRequest: 'Finalize user testing feedback for app',
    submitted: '05-12-2024',
    status: 'In-process',
    submitter: 'Mark Johnson',
    url: 'www.markjohnson.com',
    assigned: 'Rachel Lee',
    priority: 'Medium',
    dueDate: '10-12-2024',
    value: '4750000'
    },
    {
    jobRequest: 'Design new features for the website',
    submitted: '10-01-2025',
    status: 'Complete',
    submitter: 'Emily Green',
    url: 'www.emilygreen.com',
    assigned: 'Tom Wright',
    priority: 'Low',
    dueDate: '15-01-2025',
    value: '5900000'
  },
  {
    jobRequest: 'Prepare financial report for Q4',
    submitted: '25-01-2025',
    status: 'Blocked',
    submitter: 'Jessica Brown',
    url: 'www.jessicabrown.com',
    assigned: 'Kevin Smith',
    priority: 'Low',
    dueDate: '30-01-2025',
    value: '2800000'
  },
    ...generateBlankRows(10)
  ]);
  

  return (
    <div className = "">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Toolbar setData={setData} data={data} compactView={compactView}
  setCompactView={setCompactView} 
  setHiddenColumns={setHiddenColumns}/>
      <Attribute />
      <Spreadsheet data={data} setData={setData} searchTerm={searchTerm} hiddenColumns={hiddenColumns} compactView={compactView}/>
    </div>
  )
}

export default App
