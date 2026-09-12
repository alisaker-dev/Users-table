import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  return (
    <div className="w-16 bg-[#242424e9] fixed z-10 h-screen border border-[#242424] p-4 flex flex-col items-center space-y-8">
      <div className="text-white">Logo</div>
      <div className="text-white">📁</div>
      <div className="text-white">
        <FontAwesomeIcon icon={faPerson} />
      </div>
      <div className="text-white">⚙</div>
    </div>
  );
}
