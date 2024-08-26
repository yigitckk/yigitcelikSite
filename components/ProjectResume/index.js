import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ProjectResume = ({ dates, type, position, bullets }) => {
  // Convert bullets to an array, and handle the case where bullets might be undefined or empty
  const [bulletsLocal, setBulletsLocal] = useState(
    bullets ? bullets.split(",").map((bullet) => bullet.trim()) : []
  );

  useEffect(() => {
    // Update bulletsLocal if the 'bullets' prop changes
    setBulletsLocal(bullets ? bullets.split(",").map((bullet) => bullet.trim()) : []);
  }, [bullets]);

  return (
    <div className="mt-5 w-full flex mob:flex-col desktop:flex-row justify-between">
      <div className="text-lg w-2/5">
        <h2>{dates || "No Date Provided"}</h2>
        <h3 className="text-sm opacity-50">{type || "No Type Provided"}</h3>
      </div>
      <div className="w-3/5">
        <h2 className="text-lg font-bold">{position || "No Position Provided"}</h2>
        {bulletsLocal.length > 0 ? (
          <ul className="list-disc">
            {bulletsLocal.map((bullet, index) => (
              <li key={index} className="text-sm my-1 opacity-70">
                {bullet}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm my-1 opacity-70">No bullet points provided.</p>
        )}
      </div>
    </div>
  );
};

// PropTypes for prop validation
ProjectResume.propTypes = {
  dates: PropTypes.string,
  type: PropTypes.string,
  position: PropTypes.string,
  bullets: PropTypes.string,
};

// DefaultProps in case some props are not provided
ProjectResume.defaultProps = {
  dates: "Unknown Dates",
  type: "Unknown Type",
  position: "Unknown Position",
  bullets: "",
};

export default ProjectResume;
