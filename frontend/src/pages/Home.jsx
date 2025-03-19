import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      <main className="flex-grow px-10 py-4">
        <Hero />
        <RecentlyAdded />
      </main>
    </div>
  );
};

export default Home;
