"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<string>("Testing...");
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      // Test 1: Check connection
      setConnectionStatus("Connected to Supabase!");

      // Test 2: Try to fetch news articles (will be empty if table doesn't exist yet)
      const { data, error: fetchError } = await supabase
        .from("news_articles")
        .select("*")
        .limit(5);

      if (fetchError) {
        if (fetchError.code === "42P01") {
          setError("Tables not created yet. Please run the schema.sql in your Supabase dashboard.");
        } else {
          setError(`Error: ${fetchError.message}`);
        }
      } else {
        setNewsArticles(data || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setConnectionStatus("Connection failed");
    }
  };

  const insertTestArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("news_articles")
        .insert([
          {
            title: "Test Article - " + new Date().toLocaleTimeString(),
            content: "This is a test article created from the Next.js app",
            source: "Test Source",
            url: "https://example.com/test-" + Date.now(),
            sentiment: "neutral",
            impact: "low",
            published_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      alert("Article inserted successfully!");
      testConnection(); // Refresh the list
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

        {/* Connection Status */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <p className={`text-lg ${error ? "text-red-500" : "text-green-500"}`}>
            {connectionStatus}
          </p>
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded">
              <p className="text-red-400">{error}</p>
              {error.includes("Tables not created") && (
                <div className="mt-4">
                  <p className="text-sm text-gray-400">To fix this:</p>
                  <ol className="list-decimal list-inside text-sm text-gray-400 mt-2 space-y-1">
                    <li>Go to your Supabase dashboard</li>
                    <li>Open the SQL Editor</li>
                    <li>Copy the contents of <code className="text-blue-400">supabase/schema.sql</code></li>
                    <li>Paste and run it in the SQL Editor</li>
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Environment Variables */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">SUPABASE_URL:</span>{" "}
              <span className="text-green-500">
                {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Not set"}
              </span>
            </p>
            <p>
              <span className="text-gray-400">SUPABASE_ANON_KEY:</span>{" "}
              <span className="text-green-500">
                {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Not set"}
              </span>
            </p>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-gray-900 p-6 rounded-lg mb-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testConnection}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition"
            >
              Refresh Connection
            </button>
            <button
              onClick={insertTestArticle}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition ml-4"
            >
              Insert Test Article
            </button>
          </div>
        </div>

        {/* News Articles */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">News Articles</h2>
          {newsArticles.length === 0 ? (
            <p className="text-gray-400">No articles found. Insert a test article to see it here!</p>
          ) : (
            <div className="space-y-4">
              {newsArticles.map((article) => (
                <div key={article.id} className="p-4 bg-gray-800 rounded border border-gray-700">
                  <h3 className="font-semibold">{article.title}</h3>
                  <p className="text-sm text-gray-400 mt-2">{article.content}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-500">
                    <span>Source: {article.source}</span>
                    <span>Sentiment: {article.sentiment}</span>
                    <span>Impact: {article.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Usage Example */}
        <div className="bg-gray-900 p-6 rounded-lg mt-6 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Code Example</h2>
          <pre className="bg-gray-950 p-4 rounded text-xs overflow-x-auto">
            <code>{`import { supabase } from '@/lib/supabase'

// Fetch data
const { data, error } = await supabase
  .from('news_articles')
  .select('*')
  .order('published_at', { ascending: false })
  .limit(10)

// Insert data
const { data, error } = await supabase
  .from('watchlists')
  .insert([{ name: 'My Watchlist', user_id: userId }])

// Update data
const { data, error } = await supabase
  .from('user_preferences')
  .update({ theme: 'dark' })
  .eq('user_id', userId)

// Delete data
const { error } = await supabase
  .from('watchlist_items')
  .delete()
  .eq('id', itemId)`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
