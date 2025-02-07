import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import MenuItem from "./MenuItem";
import { menuItems } from "@/constants/menuItems";
import { useDispatch, useSelector } from "react-redux";
import customApi from "@/services/api";
import { logout } from "@/features/userSlice";

const Sidebar = ({ isActiveLink }) => {
  const user = useSelector((state) => state.userState.user) || null;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    customApi.post("/auth/logout").then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 bottom-0 bg-background border-r border-border">
      <div className="p-4 border-b border-border">
        <Link to="/" className="text-xl font-bold text-foreground">
          ⚡ CikSpeed
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <MenuItem item={item} isActive={isActiveLink(item.path)} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-2 rounded-lg text-foreground hover:bg-red-500 hover:text-accent-foreground w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-3 p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <User className="w-5 h-5" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
