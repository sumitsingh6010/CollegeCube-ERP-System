import { useNavigate } from "react-router-dom";

const ModuleCard = ({
  title,
  description,
  image,
  buttonText,
  path,
  onClick, 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // popup or custom logic
    } else {
      navigate(path); // existing behavior
    }
  };

  return (
   <div className="min-w-[280px] bg-white rounded-2xl shadow-md p-6 flex flex-col">
  
  {/* Image */}
  <div className="flex justify-center items-center h-40">
    <img
      src={`/${image}`}
      alt={title}
      className="max-h-full object-contain"
    />
  </div>

  {/* Content */}
  <h3 className="mt-4 font-semibold text-lg">{title}</h3>
  <p className="text-sm text-gray-500 mt-1">
    {description}
  </p>

  <button
    onClick={handleClick}
    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg transition"
  >
    {buttonText}
  </button>

</div>


  );
};

export default ModuleCard;
