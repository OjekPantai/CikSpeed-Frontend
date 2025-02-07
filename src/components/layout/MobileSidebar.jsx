import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuItem from "./MenuItem";
import { menuItems } from "@/constants/menuItems";

const MobileSidebar = ({ isOpen, onOpenChange, isActiveLink }) => (
  <Sheet open={isOpen} onOpenChange={onOpenChange}>
    <SheetTrigger asChild>
      <button className="lg:hidden p-2 hover:bg-accent rounded-lg">
        <Menu className="w-6 h-6" />
      </button>
    </SheetTrigger>
    <SheetContent side="left" className="w-64 p-0 border-r border-border">
      <div className="h-full flex flex-col bg-background">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-foreground"
            onClick={() => onOpenChange(false)}
          >
            ⚡ CikSpeed
          </Link>
          <button
            onClick={() => onOpenChange(false)}
            className="hover:bg-accent p-2 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <MenuItem
                  item={item}
                  onClick={() => onOpenChange(false)}
                  isActive={isActiveLink(item.path)}
                />
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-border">
          <Link
            to="/login"
            className="flex items-center space-x-3 p-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => onOpenChange(false)}
          >
            <User className="w-5 h-5" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </SheetContent>
  </Sheet>
);

export default MobileSidebar;
