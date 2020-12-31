import React from "react";
import { HashLink } from "react-router-hash-link";

function WelcomeTextUI() {
  return (
    <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
      <p className="uppercase tracking-loose">Track everthing</p>
      <h1 className="text-2xl md:text-4xl my-4">project argus</h1>
      <p className="leading-normal mb-4">
        project argus is the app that connects alls the different tracking apps.
        Wow that's a weird sentence. But the point is, you can go to all the
        different apps from this app. And this is also the place to manage your
        account.
      </p>
      <HashLink
        smooth
        to="#AppsOverview"
        className="bg-transparent hover:bg-black dark:hover:bg-black dark:hover:text-white dark:bg-white text-primary dark:text-black hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-black hover:border-transparent dark:hover:border-white"
      >
        Get started
      </HashLink>
    </div>
  );
}

export const WelcomeText = WelcomeTextUI;
