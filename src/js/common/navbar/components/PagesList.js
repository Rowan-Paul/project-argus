import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { PageLink } from "./PageLink";

function PagesListUI(props) {
  const [pagesArray, setPagesArray] = useState([]);

  useEffect(() => {
    setPagesArray([]);
    props.pages.forEach((page) => {
      setPagesArray((pagesArray) => [
        ...pagesArray,
        <PageLink
          setNavbarOpen={() => props.setNavbarOpen()}
          key={page.name}
          name={page.name}
          address={page.address}
        />,
      ]);
    });
  }, [props]);

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

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  pages: state.account.pages,
  error: state.account.error,
});

export const PagesList = connect(mapStateToProps, null)(PagesListUI);
