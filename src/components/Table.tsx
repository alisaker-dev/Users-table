import React, { useState } from "react";
import { data } from "../Utils/data";
import { type Projects } from "../types/Projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { type Filters } from "../types/Filters";
import MyPagination from "./MyPagination";
export default function Table() {
  const [projects, setProjects] = useState<Projects[] | []>(data);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    name: "",
    country: "",
    email: "",
    project: "",
    status: "",
  });
  const sortProjects = (key: keyof Projects): void => {
    const sortedProjects = [...projects];
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      sortedProjects.sort((a, b) => a[key].localeCompare(b[key]));
      setSortConfig({ key, direction: "descending" });
    } else {
      sortedProjects.sort((a, b) => b[key].localeCompare(a[key]));
      setSortConfig({ key, direction: "ascending" });
    }
    setProjects(sortedProjects);
  };
  const handleSortOptionClick = (key: keyof Projects) => {
    setDropdownVisible(false);
    sortProjects(key);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    console.log(projects);
  };
  const filteredProject = projects.filter(
    (project: Projects) =>
      (filters.name === "" ||
        project.client.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.country === "" ||
        project.country
          .toLowerCase()
          .includes(filters.country.toLowerCase())) &&
      (filters.email === "" ||
        project.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (filters.project === "" ||
        project.project
          .toLowerCase()
          .includes(filters.project.toLowerCase())) &&
      (filters.status === "" ||
        project.status.toLowerCase().includes(filters.status.toLowerCase())),
  );
  // Pagination
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const startOffset = (currentPage - 1) * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const currentItems = filteredProject.slice(startOffset, endOffset);
  const pageCount = Math.ceil(projects.length / itemsPerPage);

  return (
    <div className="p-4 w-[93%] ml-20">
      {/* sorting */}
      <div className="flex items-center mb-5">
        <div className="relative">
          <button
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="border flex border-gray-700 items-center justify-center text-white p-2 rounded"
          >
            <FontAwesomeIcon icon={faSort} className="mr-[0.3rem]" /> Sort{" "}
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
          {dropdownVisible && (
            <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg">
              <button
                onClick={() => handleSortOptionClick("client")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Name
              </button>
              <button
                onClick={() => handleSortOptionClick("country")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Country
              </button>
              <button
                onClick={() => handleSortOptionClick("date")}
                className="block px-4 py-2 text-white w-full hover:bg-gray-700"
              >
                Date
              </button>
            </div>
          )}
        </div>
        <div className="relative ml-4 w-full">
          <button
            onClick={() => setFilterVisible(!filterVisible)}
            className="border border-gray-700 flex items-center justify-center text-white p-2 rounded"
          >
            Filters <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
          </button>
          {filterVisible && (
            <form className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow-lg p-4">
              <div className="mb-2">
                <label htmlFor="" className="block text-white">
                  Filter By Name:{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="block text-white">
                  Filter By Country:{" "}
                </label>
                <input
                  type="text"
                  name="country"
                  value={filters.country}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="block text-white">
                  Filter By Email:{" "}
                </label>
                <input
                  type="text"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="block text-white">
                  Filter By Project:{" "}
                </label>
                <input
                  type="text"
                  name="project"
                  value={filters.project}
                  onChange={handleFilterChange}
                  className="bg-gray-900 text-white rounded p-2 w-full"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="block text-white">
                  Filter By Status:{" "}
                </label>
                <div className="flex gap-1">
                  <div>
                    <input
                      id="All"
                      type="radio"
                      name="status"
                      value=""
                      onChange={handleFilterChange}
                      className="bg-gray-900 text-white rounded p-2 w-5"
                    />
                    <label htmlFor="All" className="text-white">
                      All
                    </label>
                  </div>
                  <div>
                    <input
                      id="Completed"
                      type="radio"
                      name="status"
                      value="Completed"
                      onChange={handleFilterChange}
                      className="bg-gray-900 text-white rounded p-2 w-5"
                    />
                    <label htmlFor="Completed" className="text-white">
                      Completed
                    </label>
                  </div>
                  <div>
                    <input
                      id="In Progress"
                      type="radio"
                      name="status"
                      value="In Progress"
                      onChange={handleFilterChange}
                      className="bg-gray-900 text-white rounded p-2 w-5"
                    />
                    <label htmlFor="In Progress" className="text-white">
                      In Progress
                    </label>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* main table */}
      <table className="min-w-full table-auto rounded border border-gray-700 text-white">
        <thead>
          <tr>
            <th className="px-5 py-3 text-left">Image</th>
            <th className="px-5 py-3 text-left">Client</th>
            <th className="px-5 py-3 text-left">Country</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-left">Project</th>
            <th className="px-5 py-3 text-left">Progress</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((project: Projects, index: number) => (
            <tr key={index} className="border border-gray-700">
              <td className="px-4 py-2">
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-12 h-12 object-cover rounded-full"
                />
              </td>
              <td className="px-4 py-2">{project.client}</td>
              <td className="px-4 py-2">{project.country}</td>
              <td className="px-4 py-2">{project.email}</td>
              <td className="px-4 py-2">{project.project}</td>
              <td className="px-4 py-2">
                <div className="w-24 h-2 bg-gray-500 rounded">
                  <div
                    className={`h-2 bg-green-500 rounded`}
                    style={{ width: `${project.progress}` }}
                  ></div>
                </div>
              </td>
              <td className="px-4 py-2 w-40">
                <span> {project.status}</span>
              </td>
              <td className="px-4 py-2">{project.date}</td>
              <td className="px-4 py-2">
                <div className="relative">
                  <span className="cursor-pointer">...</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
      <MyPagination
        current={currentPage}
        total={pageCount}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
}
