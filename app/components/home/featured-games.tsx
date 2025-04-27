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

export default function FeaturedGames() {
  return (
    <div className="w-full">
      <div className="flex py-2 gap-1 items-center">
        <div className="w-1 h-4 bg-[#005dac] rounded"></div>
        <span className="font-bold">Featured Games</span>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
        <div className="flex space-x-2 min-w-max">
          {matches.map((m, i) => (
            <div
              key={i}
              className="w-[180px] rounded-md overflow-hidden bg-white"
            >
              <img
                src="https://img.c88rx.com/upload/game/AWCMJILI/JILI-SLOT-027.png"
                alt={`Match ${i + 1}`}
                className="w-full h-[120px] object-cover"
              />
              <h3 className="p-2">Super Ace</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
