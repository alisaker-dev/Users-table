import ResponsivePagination from "react-responsive-pagination";
// types
interface MyPaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}
const MyPagination: React.FC<MyPaginationProps> = ({
  current,
  total,
  onPageChange,
}) => {
  return (
    <div className="flex justify-end mt-6 select-none">
      <ResponsivePagination
        current={current}
        total={total}
        onPageChange={onPageChange}
        className="flex items-center space-x-1 list-none"
        pageItemClassName="inline-block"
        pageLinkClassName="px-3.5 py-2 border border-gray-700 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition cursor-pointer"
        activeItemClassName="!bg-blue-600 !border-blue-600 rounded-md font-bold"
        disabledItemClassName="opacity-40 cursor-not-allowed pointer-events-none"
        previousLabel="previous"
        nextLabel="next"
      />
    </div>
  );
};
export default MyPagination;
