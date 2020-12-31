import React from "react";

import { AppInfoBox } from "./AppInfoBox";
import { ScrollToTopButton } from "../../common/ScrollToTopButton";

function AppsOverviewUI() {
  return (
    <React.Fragment>
      <div className="container mx-auto pt-24 md:pt-16 px-6">
        <p className="font-bold text-center text-grey-darkest text-2xl md:text-4xl px-3 mb-5 sm:mb-16">
          What is project argus?
        </p>
        <p className="text-grey-darkest text-center">
          project-argus contains 3 different apps:
        </p>
        <p className="pt-4"></p>

        <div className="flex flex-col text-center lg:flex-row items-center pt-2">
          <AppInfoBox name="Cepheus" description="TV and Movies tracking" />
          <AppInfoBox name="Delphinus" description="Game tracking" />
          <AppInfoBox
            name="Lyra"
            description="Music, audiobooks and podcast tracking"
          />
        </div>
      </div>

      <ScrollToTopButton />
    </React.Fragment>
  );
}

export const AppsOverview = AppsOverviewUI;
