import React from "react";
import { Link } from "react-router-dom";

function PageLinkUI(props) {
  return (
    <li className="nav-item">
      <Link
        to={props.address}
        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
        href={props.address}
        onClick={() => props.setNavbarOpen()}
      >
        <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
        <span className="ml-2">{props.name}</span>
      </Link>
    </li>
  );
}

export const PageLink = PageLinkUI;
