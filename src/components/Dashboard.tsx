import Sidebar from "./Sidebar";
import Table from "./Table";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-900">
        <Table />
      </div>
    </div>
  );
}
