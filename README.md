# 🧮 React Spreadsheet UI – Intern Assignment

This project is a **static React prototype** of a Google Sheets/Excel-like spreadsheet interface, built as part of an intern assignment. The goal was to recreate a pixel-perfect, responsive UI matching the provided [Figma design](https://www.figma.com/design/3nywpu5sz45RrCmwe68QZP/Intern-Design-Assigment?node-id=2-2535&t=DJGGMt8I4fiZjoIB-1) and simulate spreadsheet-like behavior using React, TypeScript, Tailwind CSS, and optionally `react-table`.

---

## ✨ Features
- Pixel-close match with the provided Figma design  
- Editable spreadsheet-style table
- Toolbar with:
  - **Import/Export JSON**
  - **Sort by Submitted Date**
  - **Filter by Priority**
  - **Toggle Hidden Fields**
  - **Compact / Cell View Mode**
  - **Add New Row**
  - **Column hiding and resizing support**
- Tag-based status/priority styling
- Search with highlight
- URL preview + currency formatting
- ESLint, Prettier, and strict TypeScript compliance  

✅ Pixel-close match with the provided Figma design  
✅ Editable spreadsheet-style table  
✅ Interactive buttons and tabs (log actions to console)  
✅ Column hiding and resizing support (if implemented)  
✅ Clean, accessible, responsive layout  
✅ ESLint, Prettier, and strict TypeScript compliance  
✅ Supports Indian number formatting (₹ + comma-separated)

---

## 🔧 Tech Stack

- [React 18](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript (strict mode)](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [`@tanstack/react-table`](https://tanstack.com/table) *(optional or partially used)*

---

## 📦 Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/anchal-1703/spreadsheet.git
cd spreadsheet-app

# 2. Install dependencies
npm install

# 3. Run in development mode
npm run dev

# 4. Build for production
npm run build

```
##  Trade-offs & Notes
-  No backend — data is not persisted after reload.

-  Sorting is fixed to "Submitted Date (DD-MM-YYYY)" and doesn't handle time or other formats yet.

-  Filtering is hardcoded to "High Priority" (can be extended to dropdown filters).

-  Good prototype to extend into Airtable-style database or task board.

-  Handles blank rows gracefully during sort.

##  Future Improvements
- Column-based sorting with toggles (ASC/DESC)

- Drag-and-drop row/column reordering

- Persist data to local storage or backend

- Column visibility dropdown instead of hardcoded button
