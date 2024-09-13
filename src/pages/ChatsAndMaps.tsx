import React from "react";
import LineGraph from "./maps/line-graph";
import MapComponent from "./maps/map-component";
import Layout from "../components/Layout";

const ChartsAndMaps: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Charts and Maps</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Case Fluctuations</h2>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <LineGraph />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">World Map</h2>
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <MapComponent />
        </div>
      </div>
    </Layout>
  );
};

export default ChartsAndMaps;
