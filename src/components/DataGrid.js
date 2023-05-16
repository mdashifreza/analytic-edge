import React from "react";
const DataGrid = ({ data, sortColumn, sortOrder, handleSort }) => {
    return (
        <table className="p-3">
            <thead>
                <tr>
                    <th>
                        id{" "}
                        <button onClick={() => handleSort("id")}>
                            {sortColumn === "id" && sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                    </th>
                    <th>
                        title{" "}
                        <button onClick={() => handleSort("title")}>
                            {sortColumn === "title" && sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                    </th>
                    <th>
                        Email{" "}
                        <button onClick={() => handleSort("email")}>
                            {sortColumn === "email" && sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                    </th>
                    <th>
                        body{" "}
                        <button onClick={() => handleSort("body")}>
                            {sortColumn === "body" && sortOrder === "asc" ? "▲" : "▼"}
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody className="border-4 rounder-tr-2xl">
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className="p-3 border-2">{item.id}</td>
                        <td className="p-3 border-2">{item.title}</td>
                        <td className="p-3 border-2">{item.email}</td>
                        <td className="p-3 border-2">{item.body}</td>
                        <td className="p-3 border-2">{item.username}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default DataGrid;
