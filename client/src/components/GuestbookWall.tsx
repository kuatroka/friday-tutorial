import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import { IconEntry } from "../types";
import iconComponents from "../icons";

const GuestbookWall: React.FC = () => {
  const [entries, setEntries] = useState<IconEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/icons");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEntries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching guestbook entries:", err);
        setError("Failed to load guestbook entries. Please try again later.");
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-600">
        Opening the guestbook...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-16 text-black">{error}</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-black mb-4">
          Our Guestbook is Empty!
        </h2>
        <p className="text-xl text-gray-700">
          Be the first to sign our guestbook by contributing your icon.
        </p>
      </div>
    );
  }

  return (
    <div className="py-5 bg-white min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {entries.map((entry) => {
          const IconComponent = iconComponents[entry.componentName];

          if (!IconComponent) {
            console.error(`Icon component not found: ${entry.componentName}`);
            return null;
          }

          return (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-black transition-transform hover:-translate-y-1 hover:rotate-1 hover:shadow-lg even:hover:-rotate-1"
            >
              <div className="flex items-center pb-4 mb-4 border-b-2 border-dotted border-gray-200">
                <div className="mr-4 text-black">
                  <Icon component={IconComponent} size="medium" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black m-0 text-left">
                    {entry.componentName}
                  </h3>
                  {entry.date && (
                    <div className="text-sm text-gray-600 mt-1">
                      Signed on{" "}
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </div>

              <div className="font-sans text-gray-800 leading-relaxed mb-5 text-base">
                {entry.message}
              </div>

              <div className="flex flex-wrap justify-center bg-gray-100 p-4 rounded-lg mb-5">
                <div className="flex flex-col items-center m-2">
                  <span className="text-xs text-gray-600 mb-1">S</span>
                  <Icon component={IconComponent} size="small" />
                </div>
                <div className="flex flex-col items-center m-2">
                  <span className="text-xs text-gray-600 mb-1">M</span>
                  <Icon component={IconComponent} size="medium" />
                </div>
                <div className="flex flex-col items-center m-2">
                  <span className="text-xs text-gray-600 mb-1">L</span>
                  <Icon component={IconComponent} size="large" />
                </div>
                <div className="flex flex-col items-center m-2">
                  <span className="text-xs text-gray-600 mb-1">XL</span>
                  <Icon component={IconComponent} size="xlarge" />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center text-xl font-sans text-black">
                  ~ {entry.contributor}
                  {entry.githubUsername && (
                    <a
                      href={`https://github.com/${entry.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuestbookWall;
