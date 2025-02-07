import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme/theme-toggle";
import MobileSidebar from "./MobileSidebar";
import { useSelector } from "react-redux";

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, isActiveLink }) => {
  const user = useSelector((state) => state.userState.user) || null;

  return (
    <header className="h-16 fixed top-0 right-0 left-0 lg:left-64 bg-background border-b z-10">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center">
          <MobileSidebar
            isOpen={isMobileMenuOpen}
            onOpenChange={setIsMobileMenuOpen}
            isActiveLink={isActiveLink}
          />
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <span className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {user?.user.name?.slice(0, 1).toUpperCase() || "G"}
              </AvatarFallback>
              {user && <AvatarImage src={user.avatar} alt={user.user.name} />}
            </Avatar>
            <h2>{user ? user.user.name : "Guest"}</h2>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
