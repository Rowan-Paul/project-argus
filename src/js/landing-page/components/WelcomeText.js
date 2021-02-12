import React from "react";
import { HashLink } from "react-router-hash-link";

function WelcomeTextUI() {
  return (
    <div className="flex flex-col w-full lg:w-1/2 justify-center items-start pt-12 pb-24 px-6">
      <p className="uppercase tracking-loose">Track everthing</p>
      <h1 className="text-2xl md:text-4xl my-4">project argus</h1>
      <p className="leading-normal mb-4">
        project argus aims to let you track everything: from movies to podcasts.
        On this part of the site you can read about project argus and the
        different apps. There is also the possibility to manage your account
        that you can use on all project argus sites.
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
