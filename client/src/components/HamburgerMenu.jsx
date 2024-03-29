import React from "react";
import { IoPersonAdd } from "react-icons/io5";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
// import { MenuIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

// Menu items
const menuItems = [
  {
    label: "Request Leave",
    path: "/request-leave",
  },
  {
    label: "View Details",
    path: "/view-details",
  },
];

function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <Navbar>
      <div className="flex items-center">
        <Button
          onClick={toggleMenu}
          size="sm"
          variant="text"
          color="blue-gray"
          className="lg:hidden"
        >
          {/* <MenuIcon className="h-6 w-6" /> */}menu
        </Button>

        <Menu
          open={isMenuOpen}
          handler={setIsMenuOpen}
          placement="bottom-end"
        >
          <MenuHandler>
            <Button
              size="sm"
              variant="text"
              color="blue-gray"
              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
              <span>Menu</span>
              <IoPersonAdd
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </MenuHandler>
          <MenuList>
            {menuItems.map(({ label, path }) => (
              <MenuItem key={label}>
                <a href={path}>
                  <Typography as="span" variant="small">
                    {label}
                  </Typography>
                </a>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
}

export default HamburgerMenu;
