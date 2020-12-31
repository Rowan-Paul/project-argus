import React from "react";

function FooterUI() {
  return (
    <footer className="p-10 bg-secondary-bg-light dark:bg-secondary-bg-dark dark:text-accent-dark center text-center">
      <p>Copyright &copy; {new Date().getFullYear()} Rowan Paul Flynn</p>
    </footer>
  );
}

export const Footer = FooterUI;
