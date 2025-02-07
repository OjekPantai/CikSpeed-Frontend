import { Link } from "react-router-dom";

const MenuItem = ({ item, onClick, isActive }) => (
  <Link
    to={item.path}
    onClick={onClick}
    className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-foreground hover:bg-accent hover:text-accent-foreground"
    }`}
  >
    <item.icon className="w-5 h-5" />
    <span>{item.label}</span>
  </Link>
);

export default MenuItem;
