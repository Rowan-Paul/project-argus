import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function AboutPageUI() {
  return (
    <div className="mx-20">
      <h1>About us</h1>
      <p>
        Project Argus tracks everything for you; movies, tv shows, music and
        games. All in a modern looking web application, all open source.
      </p>
      <p>
        This project got born after I realised how many different services I use
        to track stuff and that all of them had some shortcomings. That is what
        I hope project argus will become: one place to track everything you can
        think of. The project is also open source, so all code is available on{" "}
        <a href="https://github.com/Rowan-Paul/project-argus">GitHub</a>.
      </p>
      <p>
        There are plans to track tv shows, movies, games, music, audiobooks and
        podcasts, see also the{" "}
        <HashLink smooth to="/#AppsOverview" className="text-blue-600">
          app overview on the homepage
        </HashLink>
        .
      </p>
    </div>
  );
}

export const AboutPage = AboutPageUI;
