import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { Button } from "./ui";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-8 sm:size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <h1 className="text-base sm:text-lg font-bold">Chatto</h1>
            </Link>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              as={Link}
              to="/settings"
              variant="ghost"
              size="sm"
              className="px-2 sm:px-3"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>

            {authUser && (
              <>
                <Button
                  as={Link}
                  to="/profile"
                  variant="ghost"
                  size="sm"
                  className="px-2 sm:px-3"
                >
                  <User className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="px-2 sm:px-3"
                >
                  <LogOut className="size-4 sm:size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
