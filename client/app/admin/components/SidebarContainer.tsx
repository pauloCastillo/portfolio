"use client";
import Image from "next/image";
import AdminNavbar from "./AdminNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function SidebarContainer() {
    const ImageLink = "/assets/imgs/fotoCV.jpg";

    return (
    <aside 
     className="flex flex-col w-72 h-full bg-void border-r border-border-glass relative z-50 shadow-2xl"
    >

        {/* Logo Area */}

        <div className="h-20 flex items-center px-6 border-b border-border-glass bg-void/50 backdrop-blur-md">
          <div className="flex items-center gap-3 group cursor-pointer">
              <div 
                  className="w-2 h-2 rounded-full bg-primary shadow-glow group-hover:scale-125 transition-transform duration-300"></div>
              <h1 
                  className="font-mono text-xl font-bold tracking-tighter text-primary group-hover:text-white transition-colors duration-300"
                >
                     DEV <span className="text-white/40 text-sm mx-1">/</span> OS
              </h1>
          </div>
        </div>    

        <AdminNavbar />
        
        {/*User Profile Footer */ }
      <div className="p-4 border-t border-border-glass bg-void/30 backdrop-blur-sm">
        <div 
           className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
          >
            {/* Avatar with Status Dot */}
          <div className="relative">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                  <Image
                        alt="User profile picture showing a focused developer in a dark room"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        data-alt="Futuristic portrait of a system administrator"
                        width={100}
                        height={100}
                        src={ImageLink}                   
                    />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-void shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          </div>
        {/* Text Info */}
      <div className="flex flex-col">
              <span className="text-sm font-semibold text-text-primary tracking-wide">Admin User</span>
              <span className="text-[10px] font-mono text-primary uppercase tracking-wider">System Admin</span>
      </div>
      {/* Settings Icon (Hidden by default, visible on hover) */}
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <FontAwesomeIcon 
            icon={faSignOut} 
            className="text-text-muted" 
            style={{fontSize: "16px"}}
          />
      </div>
    </div>
    {/* Connection Status  */}
    <div className="flex items-center justify-center gap-2 mt-3 opacity-40">
      <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></div>
          <span className="text-[10px] font-mono text-text-muted tracking-widest">CONNECTED</span>
      </div>
    </div>
    </aside>
    )
}