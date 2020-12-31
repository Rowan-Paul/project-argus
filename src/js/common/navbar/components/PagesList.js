import React, { useEffect, useState } from "react";

import { PageLink } from "./PageLink";

function PagesListUI(props) {
  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
    props.pages.forEach((page) => {
      setPagesArray((pagesArray) => [
        ...pagesArray,
        <PageLink key={page.name} name={page.name} address={page.address} />,
      ]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps,
  }, []);

  if (pagesArray.length > 1) {
    return (
      <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
        {pagesArray}
      </ul>
    );
  } else {
    return "";
  }
}

export const PagesList = PagesListUI;
