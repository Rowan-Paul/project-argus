import React from "react";

import { AppsOverview } from "./components/AppsOverview";
import { WelcomeText } from "./components/WelcomeText";
import { WelcomeImage } from "./components/WelcomeImage";

function LandingPageUI() {
  return (
    <React.Fragment>
      <div
        id="start"
        className="text-black dark:text-primary-dark bg-gradient-to-l from-secondary-light dark:from-secondary-dark to-accent-light dark:to-accent-dark p-20 min-h-screen flex flex-col md:flex-row items-center"
      >
        <WelcomeText />
        <WelcomeImage />
      </div>

      <div
        id="AppsOverview"
        className="text-black dark:text-primary-dark bg-gradient-to-r from-secondary-light dark:from-secondary-dark to-accent-light dark:to-accent-dark min-h-screen"
      >
        <AppsOverview />
      </div>
    </React.Fragment>
  );
}

export const LandingPage = LandingPageUI;
