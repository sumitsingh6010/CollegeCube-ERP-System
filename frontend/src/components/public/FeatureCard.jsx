const FeatureCard = ({ title, text }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">

      <h4 className="font-semibold">{title}</h4>

      <p className="text-sm text-gray-500 mt-1">
        {text}
      </p>

    </div>
  );
};


export default FeatureCard;