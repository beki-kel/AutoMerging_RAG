'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [isAccordionOpen, setIsAccordionOpen] = useState(false); // Accordion state

  // Pre-defined questions for the accordion
  const predefinedQuestions = [
    "What is ECAN?",
    "How does Pattern Mining work?",
    "Can you explain the main contributions of the paper?",
    "What are the future directions mentioned?",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset response and set loading to true
    setResponse('');
    setLoading(true); // Start loading

    // Send a POST request to the Flask API
    try {
      const res = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error querying Flask API:', error);
      setResponse('Error querying the API.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Function to add predefined question to the input
  const addQuestionToInput = (question: string) => {
    setQuery(question);
    setIsAccordionOpen(!isAccordionOpen);
  };

  // Toggle accordion state
  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-200 to-slate-200 p-2 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-black text-2xl w-full flex justify-center mb-8 text-center">
        Q/A for Open-Cog&apos;s ECAN AND Pattern Miner Paper
      </h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
        <input
          type="text"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
          className="p-4 rounded-lg w-8/12 mb-5"
          placeholder="Ask your question here..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Accordion for predefined questions */}
      <div className="mt-10 w-full flex flex-col items-center">
        <h2
          className="text-lg font-medium mb-2 cursor-pointer text-black underline hover:translate-y-1 px-10 py-2 rounded-xl"
          onClick={toggleAccordion}
        >
          Sample Questions to Ask
        </h2>
        {isAccordionOpen && (
          <div className="flex flex-col items-center">
            {predefinedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => addQuestionToInput(question)}
                className=" text-black py-2 px-4 rounded-lg hover:bg-blue-200 transition mb-1"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? ( // Show loading spinner when loading
        <div className="mt-10 text-center">
          <div className="loader"></div> {/* Loader div */}
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : response ? ( // Show response if available
        <div className="mt-10 text-center">
          <div className="bg-gradient-to-l from-blue-300 to-slate-100 p-6 rounded-lg mx-10 relative shadow-md">
            <h2 className="text-lg text-blue-500 font-bold">Response:</h2>
            <p>{response}</p>
            <p className="text-gray-500 text-sm mt-2">Date: {new Date(Date.now()).toLocaleString()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
