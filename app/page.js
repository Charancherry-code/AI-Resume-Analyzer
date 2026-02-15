"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Uploading resume...",
    "Extracting text from PDF...",
    "Analyzing content...",
    "Evaluating skills...",
    "Generating recommendations...",
    "Finalizing analysis...",
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(interval);
    } else {
      setCurrentStep(0);
    }
  }, [loading]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setAnalysis("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setAnalysis("");
    setCurrentStep(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data.analysis);
      } else {
        setAnalysis(`Error: ${data.error}`);
      }
    } catch (error) {
      setAnalysis(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
              AI Resume Analyzer
            </h1>
            <p className="text-gray-300 text-lg">Powered by Gemini AI</p>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                📄 Upload Resume (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:from-blue-600 hover:file:to-purple-700 file:cursor-pointer file:transition-all file:duration-300 cursor-pointer bg-white/5 rounded-xl p-4 border border-white/10"
                />
              </div>
              {file && (
                <p className="mt-2 text-sm text-green-400">✓ {file.name} selected</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!file || loading}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 transform"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                "🚀 Analyze Resume"
              )}
            </button>
          </form>
        </div>

        {/* Loading Progress */}
        {loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">⏳ Please Wait...</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                    index < currentStep ? "bg-green-500 text-white" :
                    index === currentStep ? "bg-blue-500 text-white animate-pulse" :
                    "bg-white/20 text-gray-400"
                  }`}>
                    {index < currentStep ? "✓" : index + 1}
                  </div>
                  <div className={`flex-1 transition-all duration-500 ${
                    index <= currentStep ? "text-white font-semibold" : "text-gray-400"
                  }`}>
                    {step}
                  </div>
                  {index === currentStep && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: "0ms"}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: "150ms"}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: "300ms"}}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {analysis && !loading && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 animate-fadeIn">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-6">✨ Analysis Results</h2>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {analysis}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
