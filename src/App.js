import React, { useEffect, useState } from "react";

function App() {
  const [memes, setMemes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setMemes(data.data.memes);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching memes:", err));
  }, []);

  const filteredMemes = memes.filter((meme) =>
    meme.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Meme Search
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search memes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-80 rounded-xl shadow-md border border-gray-300 focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading memes...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {filteredMemes.map((meme) => (
              <div
                key={meme.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 text-center">
                  <p className="font-semibold text-gray-700">{meme.name}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-700 mt-6">
            Found {filteredMemes.length} memes
          </p>
        </>
      )}
    </div>
  );
}

export default App;
