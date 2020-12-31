import React from "react";

function AppInfoBoxUI(props) {
  return (
    <span className="lg:flex-1 py-1 pl-3 m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-20 h-20 inline-block"
      >
        <path
          fillRule="evenodd"
          d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
        <path
          fillRule="evenodd"
          d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-bold text-xl">&nbsp;{props.name}</span>
      <p>{props.description}</p>
    </span>
  );
}

export const AppInfoBox = AppInfoBoxUI;
