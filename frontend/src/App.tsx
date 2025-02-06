import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
const HomePage = React.lazy(() => import("./pages/Home/HomePage"));

import YogaPoseUpload from "./components/ImageCaptioning/Upload";

import Layout from "./layout/Layout";
import Loading from "./components/Loading/Loading";

import YogaChatHome from "./components/ImageCaptioning/Home";
import PrivacyPolicy from "./components/ImageCaptioning/PrivacyPolicy";
import ReachOut from "./components/ImageCaptioning/ReachOut";



export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<YogaChatHome />} />
          <Route path="/upload" element={<YogaPoseUpload />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/reach-out" element={<ReachOut />} />
          <Route
            path="/home"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
