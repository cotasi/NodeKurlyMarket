import React, { useEffect, useState } from "react";
import Axiosapi from "./components/api/Axiosapi";
import Itemapi from "./components/api/Itemapi";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import CategoryList from "./components/pages/Lists/CategoryList";
import CategoryDetail from "./components/pages/Details/CategoryDetail";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Login/Register";

import MainLayout from "./components/pages/Layout/MainLayout";
import AdminLayout from "./components/pages/Layout/AdminLayout";
import Users from "./components/pages/Admin/Users";
import ScrollTop from "./components/pages/Layout/ScrollTop";

import CartDetail from "./components/pages/Cart/CartDetail";

import { PopProvider } from "./context/PopContext";

import { CountProvider } from "./context/CountContext";

function App() {
  const [res, setres] = useState([]);
  const [itm, setitms] = useState([]);

  const FetchAPI = async () => {
    try {
      const resp = await axios.get(`/api`);
      setres(resp.data);
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  };

  const FetchItems = async () => {
    try {
      const itemres = await axios.get("/items");
      setitms(itemres.data);
      return itemres.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { loading, response, error } = Axiosapi(FetchAPI, [res]);

  const { load, setit, items, err } = Itemapi(FetchItems, [itm]);

  return (
    <CountProvider>
      <PopProvider>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout response={response}>
                  <div>Home</div>
                </MainLayout>
              }
            />

            {/* Category List */}
            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[0].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={0}
                    response={response}
                    setit={setit}
                    items={items}
                    load={load}
                    type="Cucumber"
                  />
                </MainLayout>
              }
            />

            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[1].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={1}
                    response={response}
                    items={items}
                    setit={setit}
                    load={load}
                    type="Onion"
                  />
                </MainLayout>
              }
            />

            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[2].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={2}
                    response={response}
                    items={items}
                    setit={setit}
                    load={load}
                    type="Brocoli"
                  />
                </MainLayout>
              }
            />

            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[3].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={3}
                    response={response}
                    items={items}
                    setit={setit}
                    load={load}
                    type="Schi"
                  />
                </MainLayout>
              }
            />

            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[4].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={4}
                    response={response}
                    items={items}
                    setit={setit}
                    load={load}
                    type="Potato"
                  />
                </MainLayout>
              }
            />

            <Route
              path={`category/${response && response[0].category_name}/${
                response && response[0].categories_sub[5].sub_name
              }`}
              element={
                <MainLayout response={response}>
                  <CategoryList
                    num1={0}
                    num2={5}
                    response={response}
                    items={items}
                    setit={setit}
                    load={load}
                    type="Potato"
                  />
                </MainLayout>
              }
            />

            {/* Category Detail */}
            <Route
              path={`/category/goods/${items && items[0].itemes[0].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={0}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />
            <Route
              path={`/category/goods/${items && items[0].itemes[1].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={1}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />
            <Route
              path={`/category/goods/${items && items[0].itemes[2].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={2}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />
            <Route
              path={`/category/goods/${items && items[0].itemes[3].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={3}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />

            <Route
              path={`/category/goods/${items && items[0].itemes[4].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={4}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />

            <Route
              path={`/category/goods/${items && items[0].itemes[5].item_id}`}
              element={
                <MainLayout response={response}>
                  <CategoryDetail
                    numone={0}
                    numtwo={5}
                    items={items}
                    setit={setit}
                  />
                </MainLayout>
              }
            />

            {/* Cart Page */}
            <Route
              path="/cart"
              element={
                <MainLayout response={response}>
                  <CartDetail />
                </MainLayout>
              }
            />

            {/* Login Page */}
            <Route
              path="/login"
              element={
                <MainLayout response={response}>
                  <Login />
                </MainLayout>
              }
            />
            <Route
              path="/join"
              element={
                <MainLayout response={response}>
                  <Register />
                </MainLayout>
              }
            />

            {/* Admin Page */}
            <Route
              path="/admin"
              element={
                <AdminLayout>
                  <div>Test</div>
                </AdminLayout>
              }
            />

            <Route
              path="/admin/userinfo"
              element={
                <AdminLayout>
                  <Users />
                </AdminLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </PopProvider>
    </CountProvider>
  );
}

export default App;
