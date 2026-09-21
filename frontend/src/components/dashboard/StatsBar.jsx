import StatCard from "./StatCard";

const StatsBar = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <StatCard
        icon="👥"
        value={3250 + stats.students}
        label="Students"
      />
      <StatCard
        icon="✉️"
        value={150 + stats.faculty}
        label="Faculty"
      />
      <StatCard
        icon="💼"
        value={75 + stats.courses}
        label="Courses"
      />
    </div>
  );
};

export default StatsBar;
