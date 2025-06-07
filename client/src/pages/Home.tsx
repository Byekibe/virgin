import { Button } from "@/components/ui/button";
import { CheckCircle2, Code, Rocket, Scale, Component } from "lucide-react"; // Import necessary icons

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-50 text-gray-800 p-6">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-blue-700">
          <Code className="inline-block h-12 w-12 md:h-16 md:w-16 mr-3 text-blue-500" />
          Rapid Full-Stack Development
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600">
          A robust project template built with modern technologies for speed and scalability.
        </p>
        <Button
          onClick={() => console.log("View Demo button clicked!")}
          className="px-10 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
        >
          View Demo
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Feature 1: Modern Tech Stack */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-3 flex items-center text-indigo-600">
            <Rocket className="h-6 w-6 mr-2 text-green-500" /> {/* Changed icon */}
            Modern Tech Stack
          </h2>
          <p className="text-gray-700">
            Leverage the power of React, TypeScript, Tailwind CSS, and a robust backend.
          </p>
        </div>
        {/* Feature 2: Ready-to-Use Components */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-3 flex items-center text-indigo-600">
            <Component className="h-6 w-6 mr-2 text-green-500" /> {/* Changed icon */}
            Ready-to-Use Components
          </h2>
          <p className="text-gray-700">
            Includes a library of pre-built UI components for faster development.
          </p>
        </div>
        {/* Feature 3: Optimized for Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-3 flex items-center text-indigo-600">
            <CheckCircle2 className="h-6 w-6 mr-2 text-green-500" /> {/* Using CheckCircle2 */}
            Optimized for Performance
          </h2>
          <p className="text-gray-700">
            Built with performance in mind, ensuring fast load times and smooth user experience.
          </p>
        </div>
        {/* Feature 4: Scalable Architecture */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-bold mb-3 flex items-center text-indigo-600">
            <Scale className="h-6 w-6 mr-2 text-green-500" /> {/* Changed icon */}
            Scalable Architecture
          </h2>
          <p className="text-gray-700">
            Designed to grow with your project, from small MVPs to large-scale applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;