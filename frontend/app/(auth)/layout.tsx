import AuthSidebar from "@/components/AuthSidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Sidebar only visible on medium+ screens */}
      <div className="hidden md:block w-full md:w-[50%]">
        <AuthSidebar />
      </div>

      <div className="flex-1 overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
};

export default Layout;
