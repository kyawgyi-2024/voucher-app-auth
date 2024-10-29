import Layout from "./components/Layout";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import SalePage from "./pages/SalePage";
import VoucherPage from "./pages/VoucherPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { createBrowserRouter } from "react-router-dom";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import VoucherDetailPage from "./pages/VoucherDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserProfileChangeNamePage from "./pages/UserProfileChangeNamePage.jsx";
import UserProfileChangeImagePage from "./pages/UserProfileChangeImagePage.jsx";
import UserChangePasswordPage from "./pages/UserChangePasswordPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "dashboard",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "product",
            element: <ProductPage />,
          },
          {
            path: "product/create",
            element: <ProductCreatePage />,
          },
          {
            path: "product/edit/:id",
            element: <ProductEditPage />,
          },
          {
            path: "sale",
            element: <SalePage />,
          },
          {
            path: "voucher",
            element: <VoucherPage />,
          },
          {
            path: "vouchers/detail/:id",
            element: <VoucherDetailPage />,
          },
          {
            path: "user-profile",
            children: [
              {
                index: true,
                element: <UserProfilePage />,
              },
              {
                path: "user-change-name",
                element: <UserProfileChangeNamePage />,
              },
              {
                path: "user-change-image",
                element: <UserProfileChangeImagePage />,
              },
              {
                path: "user-change-password",
                element: <UserChangePasswordPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
