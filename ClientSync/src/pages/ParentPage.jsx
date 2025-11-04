import React from "react";

const ParentPage = () => {
  return (
    // Full-screen dark background, padding for breathing room
    <div className="min-h-screen bg-[#111827] text-gray-200 flex flex-col items-center justify-center px-6 py-12">
      
      {/* Title Section */}
      <h1 className="text-4xl font-bold mb-4 text-white">
        Introducing <span className="text-indigo-500">ClientSync</span>
      </h1>

      {/* Subtitle / description */}
      <p className="text-lg text-gray-400 max-w-xl text-center mb-8">
        You are a business beginner, freelancer, or self-employed individual and
        want a CRM?
      </p>

      {/* Tagline */}
      <h2 className="text-2xl font-semibold mb-10 text-indigo-400">
        ClientSync is the way to go.
      </h2>

      {/* Cards container */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Individual card */}
        <div className="bg-[#1f2937] hover:bg-[#252f3f] transition rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">
            Easy to Use with customisable metrics
          </h3>
          <p className="text-gray-400">
            A beginner-friendly dashboard that’s clean and intuitive.
          </p>
        </div>

        <div className="bg-[#1f2937] hover:bg-[#252f3f] transition rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">
            All Business Types
          </h3>
          <p className="text-gray-400">
            Whether you're a freelancer or an agency, ClientSync fits your needs.
          </p>
        </div>

        <div className="bg-[#1f2937] hover:bg-[#252f3f] transition rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-white">
            Cost Effective
          </h3>
          <p className="text-gray-400">
            Affordable and scalable for all business groups.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
