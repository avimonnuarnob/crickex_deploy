import Modal from "@/components/ui/modal/Modal";

export default function TurnoverPage() {
  return (
    <Modal
      title="Turnover"
      isOpen={true}
      onClose={() => {}}
      isFullScreen={true}
    >
      <div className="p-2">
        <div className="bg-[#a9c1d6] flex p-[1.3333333333vw] sm:p-1.25 items-center justify-center w-full h-30 relative">
          <div className="h-full w-full bg-white"></div>
          <div
            _ngcontent-serverapp-c1126131654=""
            className="absolute z-1 inset-0 overflow-hidden"
          >
            <div
              _ngcontent-serverapp-c1126131654=""
              className="absolute left-0 w-5 h-full"
              style={{
                background: "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                backgroundPosition: "-5px",
                backgroundSize: "20px 20px",
                backgroundRepeat: "repeat-y",
              }}
            ></div>
            <div
              _ngcontent-serverapp-c1126131654=""
              className="absolute right-0 w-5 h-full"
              style={{
                background: "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                backgroundPosition: "5px",
                backgroundSize: "20px 20px",
                backgroundRepeat: "repeat-y",
              }}
            ></div>{" "}
          </div>
        </div>
      </div>
    </Modal>
  );
}
