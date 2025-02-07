import { useState } from "react";
import { useLocation, Outlet, useNavigation } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Loading from "@/components/Loading";

const PublicLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar isActiveLink={isActiveLink} />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isActiveLink={isActiveLink}
      />
      {isPageLoading ? (
        <Loading />
      ) : (
        <main className="lg:pl-64 pt-16">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      )}
    </div>
  );
};

export default PublicLayout;
