import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import NavItem from "./NavItem";
import customerIcon from "@/assets/images/icon-customer.png";

type SubmenuProps = {
  isFull: boolean;
  icon: string;
  text: string;
  href?: string;
  togglePanels: any;
  index: any;
  children: {
    setIsModalOpen?: (value: boolean) => void;
    icon: string;
    text: string;
    href: string;
  }[];
};

const Submenu = ({ isFull, togglePanels, index, ...navLink }: SubmenuProps) => {
  return (
    <Disclosure>
      {(panel) => {
        const { open, close } = panel;
        return (
          <div>
            <DisclosureButton
              as="div"
              onClick={() => {
                if (!open) {
                  // On the first click, the panel is opened but the "open" prop's value is still false. Therefore the falsey verification
                  // This will make so the panel close itself when we click it while open
                  close();
                }

                // Now we call the function to close the other opened panels (if any)
                togglePanels({ ...panel, key: index });
              }}
            >
              <NavItem {...navLink} isOpen={open} isFull={isFull}>
                {navLink.text}
              </NavItem>
            </DisclosureButton>
            <div className="overflow-hidden">
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="origin-top"
                  >
                    <DisclosurePanel static as="ul">
                      {navLink.text === "Contact Us" && (
                        <li key="Live Chat">
                          <div className="pl-3.25 bg-[#f5f5f5] hover:bg-[#ddd]">
                            <button
                              onClick={() => {
                                if (window && window.anw2 !== undefined) {
                                  window.anw2.open();
                                }
                              }}
                              className={
                                "flex items-center transition-colors cursor-pointer gap-4 whitespace-nowrap"
                              }
                              style={{
                                padding: isFull
                                  ? "10px 23px 10px 23px"
                                  : "10px 10px 10px 23px",
                              }}
                            >
                              <img src={customerIcon} className="w-7.5 h-7.5" />
                              <span
                                className={
                                  "text-base truncate text-dark-1 text-left"
                                }
                                style={{ width: "11ch" }}
                              >
                                Live Chat
                              </span>
                            </button>
                          </div>
                          <div className="border-gray-4 border-b" />
                        </li>
                      )}
                      {navLink.children.map((child, index) => (
                        <>
                          <li key={index + 1}>
                            <div className="pl-3.25 bg-[#f5f5f5] hover:bg-[#ddd]">
                              <NavItem {...child} isChild isFull={isFull}>
                                {child.text}
                              </NavItem>
                            </div>
                            <div className="border-gray-4 border-b" />
                          </li>
                        </>
                      ))}
                    </DisclosurePanel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      }}
    </Disclosure>
  );
};

export default Submenu;
