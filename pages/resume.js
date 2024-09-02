import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cursor from "../components/Cursor";
import Header from "../components/Header";
import ProjectResume from "../components/ProjectResume";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";

const Resume = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMount(true);

    const fetchResumeData = async () => {
      try {
        const response = await fetch('/api/resume');
        if (!response.ok) {
          throw new Error('Failed to fetch resume data');
        }
        const data = await response.json();
        if (!data || !data.resume || typeof data.showResume !== 'boolean') {
          throw new Error('Invalid resume data structure');
        }
        setResumeData(data);
        setLoading(false);
        if (!data.showResume) {
          router.push("/");
        }
      } catch (error) {
        console.error('Error fetching resume data:', error.message);
        setError(error.message);
        setLoading(false);
        router.push("/");
      }
    };

    fetchResumeData();
  }, [router]);

  if (loading) {
    return <p>Loading your resume, please wait...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!resumeData) {
    return <p>No resume data found</p>;
  }

  const { name, showResume, resume } = resumeData;

  if (!resume) {
    return <p>No detailed resume data available</p>;
  }

  const backgroundColorClass = theme === "dark" ? "bg-slate-800" : "bg-gray-50";

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => router.push("/edit")} type="primary">
            Edit Resume
          </Button>
        </div>
      )}
      {showResume && <Cursor />}
      <div className={`container mx-auto mb-10 ${showResume && "cursor-none"}`}>
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div className={`w-full ${backgroundColorClass} max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}>
              <h1 className="text-3xl font-bold">{name}</h1>
              <h2 className="text-xl mt-5">{resume.tagline}</h2>
              <h2 className="w-4/5 text-xl mt-5 opacity-50">{resume.description}</h2>
              <div className="mt-2">
                <Socials />
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Experience</h1>
                <div className="mt-2">
                      <h2 className="text-lg">Blog Writer</h2>
                      <h3 className="text-sm opacity-75">2024-Present</h3>
                      <p className="text-sm mt-2 opacity-50">I post blogs in this website about the things i learn and my experiences such as computer science concepts, programming languages, mathematical articles, project outcomes etc. 
                      </p>
                    </div>
              
                
                
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Education</h1>
                {resume.education && resume.education.length > 0 ? (
                  resume.education.map((edu, index) => (
                    <div key={index} className="mt-2">
                      <h2 className="text-lg">{edu.universityName}</h2>
                      <h3 className="text-sm opacity-75">{edu.universityDate}</h3>
                      <p className="text-sm mt-2 opacity-50">{edu.universityPara}</p>
                    </div>
                  ))
                ) : (
                  <p>No education data available.</p>
                )}
              </div>
              <div className="mt-5">
                <h1 className="text-2xl font-bold">Skills</h1>
                <div className="flex mob:flex-col desktop:flex-row justify-between">
                  {resume.languages && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Languages</h2>
                      <ul className="list-disc">
                        {resume.languages.map((language, index) => (
                          <li key={index} className="ml-5 py-2">{language}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {resume.frameworks && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Frameworks</h2>
                      <ul className="list-disc">
                        {resume.frameworks.map((framework, index) => (
                          <li key={index} className="ml-5 py-2">{framework}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {resume.others && (
                    <div className="mt-2 mob:mt-5">
                      <h2 className="text-lg">Others</h2>
                      <ul className="list-disc">
                        {resume.others.map((other, index) => (
                          <li key={index} className="ml-5 py-2">{other}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
