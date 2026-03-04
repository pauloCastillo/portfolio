import SidebarContainer from "@/app/admin/components/SidebarContainer";
import MainContent from "../components/MainContent";
import "@/app/admin/styles/dashboard.css"

export default function DashboardPage(){ 
  return(
    <div className="flex flex-1 bg-void h-screen overflow-hidden z-10 relative">    
      <SidebarContainer />
      <MainContent />
    </div>
   )
} 