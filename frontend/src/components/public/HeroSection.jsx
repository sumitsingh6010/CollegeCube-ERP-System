import React from "react";
import FeatureCard from "./FeatureCard";
import StatCard from "./StatCard";
const HeroSection = () => {



  return (
    <div className="bg-gray-50">

      {/* SECTION 1 */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>

          <h2 className="text-3xl font-bold mb-6">
            Key Features of College Cube ERP
          </h2>

          <p className="text-gray-500 mb-8">
            Powerful. Scalable. Secure.
          </p>

          <div className="space-y-4">

            <FeatureCard
              title="Student Management"
              text="Manage student profiles, track progress, and handle attendance."
            />

            <FeatureCard
              title="Streamlined Admissions"
              text="Online applications, automated workflows, and real-time tracking."
            />

            <FeatureCard
              title="Role-Based Dashboard"
              text="Dashboards tailored to admin, faculty, and student roles."
            />

            <FeatureCard
              title="Finance & Fees Management"
              text="Automated fee collection, invoicing, and financial reports."
            />

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div>
          <img
            src="/landing/dashboard.png"
            alt="dashboard"
            className="rounded-xl shadow-xl"
          />
        </div>

      </section>


      {/* SECTION 2 */}

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}

        <div>

          <h2 className="text-3xl font-bold mb-6">
            Everything You Need for Efficient College Administration
          </h2>

          <p className="text-gray-500 mb-8">
            A complete ERP solution designed to cater to the unique needs of multi-college management.
          </p>

          <div className="space-y-4">

            <FeatureCard
              title="Attendance Tracking"
              text="Monitor student attendance with automated alerts."
            />

            <FeatureCard
              title="Academic Management"
              text="Course scheduling, exam management and gradebook."
            />

            <FeatureCard
              title="Communication Hub"
              text="Integrated messaging between students and faculty."
            />

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="relative">

          <img
            src="/landing/student.png"
            alt="student"
            className="rounded-xl shadow-xl"
          />

        </div>

      </section>


      {/* SECTION 3 */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <img
              src="/landing/team.png"
              alt="team"
              className="rounded-xl"
            />
          </div>

          <div>

            <h2 className="text-3xl font-bold mb-4">
              Powering Campuses of All Sizes
            </h2>

            <p className="text-gray-500 mb-8">
              Trusted by leading institutions nationwide.
            </p>

            <div className="grid grid-cols-3 gap-6">

              <StatCard number="20+" label="Campuses" />

              <StatCard number="50,000+" label="Students Managed" />

              <StatCard number="5,000+" label="Faculties Supported" />

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default HeroSection;
