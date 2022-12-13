import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components";
import { ArraysPage, Dashboard, PageNotFound } from "../pages";

const HOC = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
  </>
);

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HOC children={<Dashboard />} />} />
        <Route path="/array" element={<HOC children={<ArraysPage />} />} />
        <Route path="*" element={<HOC children={<PageNotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
