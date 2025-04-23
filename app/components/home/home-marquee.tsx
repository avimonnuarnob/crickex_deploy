export default function HomeMarquee() {
  return (
    <div className="flex items-center">
      <span
        className="w-7.5 h-7.5 bg-[#000c] bg-no-repeat mask-no-repeat marquee--icon"
        style={{
          maskImage:
            'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1745315485946")',
        }}
      />
      <p className="marquee overflow-hidden box-border w-full">
        <span className="text-sm">
          🏏 Join Crickex now for Back & Lay, Premium Cricket, Fancy Bets, Daily
          Bonuses, Weekly Cashback, and more—Get your Free ID today! 🎉🚀
        </span>
      </p>
    </div>
  );
}
