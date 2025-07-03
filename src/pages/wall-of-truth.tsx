import React from "react";

const posts = [
  {
    title: "How the System Buried My Fatherhood: The Truth They Tried to Seal Away",
    author: "Michael Griggs",
    date: "July 3, 2025",
    href: "https://walloftruth.hashnode.dev/how-the-system-buried-my-fatherhood-the-truth-they-tried-to-seal-away",
    slug: "how-the-system-buried-my-fatherhood"
  }
];

export default function WallOfTruth() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">The Wall of Truth</h1>
      <p className="mb-8 text-lg text-white">
        Real voices. Unfiltered pain. Stories the system tried to silence — but we’re bringing them into the light.
      </p>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <a
            key={index}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition"
          >
            <h2 className="text-xl font-semibold text-orange-400">{post.title}</h2>
            <p className="text-sm text-gray-300">By {post.author} — {post.date}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
