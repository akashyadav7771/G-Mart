import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAppContext } from "./context/AppContext";

const Home = lazy(() => import("./pages/Home"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import(".//components/Footer"));
const Login = lazy(() => import("./components/Login"));
const AllProducts = lazy(() => import("./pages/AllProducts"));
const ProductCategory = lazy(() => import("./pages/ProductCategory"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const AddAddress = lazy(() => import("./pages/AddAddress"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const SellerLogin = lazy(() => import("./components/seller/SellerLogin"));
const SellerLayout = lazy(() => import("./pages/seller/SellerLayout"));
const AddProduct = lazy(() => import("./components/seller/AddProduct"));
const ProductList = lazy(() => import("./components/seller/ProductList"));
const Orders = lazy(() => import("./components/seller/Orders"));
const Loading = lazy(() => import("./components/Loading"));
const SupportWidget = lazy(() => import("./components/SupportWidget"));
const Support = lazy(() => import("./components/seller/Support"));


const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-#c5d6d6">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />

            <Route path="/loader" element={<Loading />} />

            <Route
              path="/seller"
              element={isSeller ? <SellerLayout /> : <SellerLogin />}
            >
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="product-list" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
