import ModuleCard from "./ModuleCard";

const ModulesSlider = ({ modules, onModuleClick }) => {
  return (
    <div className="mt-10 bg-gray-100 rounded-xl p-6">
      <div className="flex gap-6 overflow-x-auto pb-4">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            title={module.title}
            description={module.description}
            image={module.image}
            buttonText={module.buttonText}
            path={module.path}
            onClick={
              onModuleClick
                ? () => onModuleClick(module)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ModulesSlider;
