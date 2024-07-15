import React from "react";

import Header from "../../common/Header";
import Footer from "../../common/Footer";

import { PopConsumer } from "../../../context/PopContext";

const MainLayout = ({ children, response }) => {
  return (
    <div>
      <Header response={response} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
