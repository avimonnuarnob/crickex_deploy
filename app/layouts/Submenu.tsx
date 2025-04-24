import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import NavItem from "./NavItem";

type SubmenuProps = {
  isFull: boolean;
  icon: string;
  text: string;
  href?: string;
  children: {
    icon: string;
    text: string;
    href: string;
  }[];
};

const Submenu = ({ isFull, ...navLink }: SubmenuProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <DisclosureButton as="div">
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
                  <DisclosurePanel static as="ul" className="bg-white">
                    {navLink.children.map((child, index) => (
                      <li key={index + 1}>
                        <div style={{ padding: "2px 2px 2px 13px" }}>
                          <NavItem {...child} isChild isFull={isFull}>
                            {child.text}
                          </NavItem>
                        </div>
                        <div className="border-gray-4 border-b" />
                      </li>
                    ))}
                  </DisclosurePanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Submenu;
