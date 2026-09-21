import { Search } from "lucide-react";

const FeesSearchBar = ({ search, setSearch }) => {

  return (
    <div className="relative w-72">

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
      />

      <input
        type="text"
        placeholder="Search student or department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 text-sm
        bg-blue-50 border border-blue-200 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500
        focus:bg-white transition"
      />

    </div>
  );
};

export default FeesSearchBar;