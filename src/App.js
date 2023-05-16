import React, { useState, useEffect, useMemo } from "react";
import DataGrid from "./components/DataGrid";
const App = () => {
  //state variable
  const [apiData, setApiData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [apiResource, setApiResource] = useState("posts");
  const [totalUser, setTotalUser] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
// Fetch API data and calculate total pages
  useEffect(() => {
    const pageLimit = 10;
    let start = (currentPage - 1) * pageLimit;
    const fetchPosts = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${apiResource}?_start=${start}&_limit=${pageLimit}`
      );
      const data = await response.json();
      console.log('resource',data)
      setApiData(data);
    };
    fetchPosts();
    totalPage();
  }, [currentPage, apiResource]);

  const totalPage = async () => {
    const responce = await fetch(
      `https://jsonplaceholder.typicode.com/${apiResource}`
    );
    const data = await responce.json();
    console.log("ashif", data.length);
    setTotalUser(data.length);
    setTotalPages(Math.ceil(data.length / 10));
  };
 // Update search query state
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // console.log(searchQuery);
  //
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
 // Update sort column and order state
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };
  //
  const sortedData = useMemo(() => {
    return apiData
      .filter((item) => {
        const searchRegex = new RegExp(searchQuery, "i");
        return (
          searchRegex.test(item.id) ||
          searchRegex.test(item.title) ||
          searchRegex.test(item.body)
        );
      })
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortColumn] < b[sortColumn] ? -1 : 1;
        } else {
          return b[sortColumn] < a[sortColumn] ? -1 : 1;
        }
      });
  }, [apiData, searchQuery, sortColumn, sortOrder]);
  

  return (
    <div className="m-20 flex flex-col items-center justify-center">
      <div className="search-bar items-center">
        <input
          type="text"
          placeholder="Global Search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className='border-2 rounded-md p-2 border-gray-400 placeholder:font-semibold placeholder:text-gray-600'
        />
      </div>

      <div className="resource-buttons space-x-5">
        <button onClick={() => setApiResource("users")} className='bg-blue-500 p-2 rounded-md text-white m-2'>User</button>
        <button onClick={() => setApiResource("posts")} className='bg-blue-500 p-2 rounded-md text-white m-2'>Post</button>
        <button onClick={() => setApiResource("comments")} className='bg-blue-500 p-2 rounded-md text-white m-2'>Comments</button>
      </div>

      <div>
      <DataGrid
        data={sortedData}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
      </div>

      <div className="">
      <button
        onClick={() => setcurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
className='bg-blue-500 text-white p-2 rounded-md m-2'
      >
        Previous 
      </button>
      {currentPage} of {totalPages}
      <button
        onClick={() => setcurrentPage(currentPage + 1)}
        disabled={currentPage === totalUser / 10}
      className='bg-blue-500 text-white p-2 rounded-md m-2'
      >
        Next
      </button>
      </div>
    </div>
  );
};
export default App;
