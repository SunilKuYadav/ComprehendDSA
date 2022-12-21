import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "../components";
import {
  ArraysPage,
  BinaryTreePage,
  Dashboard,
  LinkedListPage,
  MAtrixGridPage,
  PageNotFound,
  PatternPage,
  StackPage,
} from "../pages";

// HOC for wrapping header
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
        <Route
          path="/linkedList"
          element={<HOC children={<LinkedListPage />} />}
        />
        <Route path="/matrix" element={<HOC children={<MAtrixGridPage />} />} />
        <Route path="/pattern" element={<HOC children={<PatternPage />} />} />
        <Route path="/stack" element={<HOC children={<StackPage />} />} />
        <Route
          path="/binaryTree"
          element={<HOC children={<BinaryTreePage />} />}
        />
        <Route path="*" element={<HOC children={<PageNotFound />} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
