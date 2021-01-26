import React, { useState } from "react";
import { Link } from "react-router-dom";

import { DarkModeToggle } from "./components/DarkModeToggle";
import { HamburgerMenu } from "./components/HamburgerMenu";
import { PagesList } from "./components/PagesList";

function NavBarUI({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [pages] = useState([
    {
      name: "Home",
      address: "/",
    },
    {
      name: "About",
      address: "/about",
    },
    {
      name: "Login",
      address: "/login",
    },
  ]);

  return (
    <>
      <nav className="h10 relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              to="/"
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
              href="#pablo"
            >
              project argus
            </Link>
            <DarkModeToggle position="hamburger" />
            <HamburgerMenu setNavbarOpen={() => setNavbarOpen(!navbarOpen)} />
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <DarkModeToggle position="pages" />
            <PagesList pages={pages} />
          </div>
        </div>
      </nav>
    </>
  );
}

export const NavBar = NavBarUI;
