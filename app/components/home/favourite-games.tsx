const matches = [
  {
    team1: "KKR",
    team2: "GT",
    match: "39ᵗʰ MATCH",
    date: "APR 21, MONDAY",
    time: "10:00 PM",
    image: "/images/match1.png",
  },
  {
    team1: "LSG",
    team2: "DC",
    match: "40ᵗʰ MATCH",
    date: "APR 22, TUESDAY",
    time: "10:00 PM",
    image: "/images/match2.png",
  },
  {
    team1: "SRH",
    team2: "MI",
    match: "41ˢᵗ MATCH",
    date: "APR 23, WEDNESDAY",
    time: "10:00 PM",
    image: "/images/match3.png",
  },
  {
    team1: "SRH",
    team2: "MI",
    match: "41ˢᵗ MATCH",
    date: "APR 23, WEDNESDAY",
    time: "10:00 PM",
    image: "/images/match3.png",
  },
  {
    team1: "SRH",
    team2: "MI",
    match: "41ˢᵗ MATCH",
    date: "APR 23, WEDNESDAY",
    time: "10:00 PM",
    image: "/images/match3.png",
  },
];

export default function FavouriteGames() {
  return (
    <div className="w-full">
      <div className="flex py-2 gap-1 items-center">
        <div className="w-1 h-4 bg-[#005dac] rounded"></div>
        <span className="font-bold">Favourites</span>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded py-1">
        <div className="flex space-x-2 min-w-max">
          {matches.map((m, i) => (
            <div
              key={i}
              className="max-w-[300px] rounded-md overflow-hidden shadow bg-white shadow-gray-9"
            >
              <img
                src="https://img.c88rx.com/upload/announcement/image_224860.jpg"
                alt={`Match ${i + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
