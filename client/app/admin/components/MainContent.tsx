"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGridVertical } from "@fortawesome/free-solid-svg-icons";
import HeaderMainContent from "./ui/HeaderContent";
import SearchAdmin from "./ui/Search";

export default function MainContent() {
    return(
        <main className="flex-1 bg-void relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-void from-slate-900 via-void to-void opacity-50">
                <HeaderMainContent />
                <SearchAdmin/>
            </div>
            <div className="text-center opacity-30">
                <FontAwesomeIcon 
                    icon={faGridVertical}
                    className="text-text-muted"
                    style={{ fontSize: "16px" }}
                />
                <p className="font-mono text-sm text-text-muted">SELECT A MODULE FROM NAVIGATION</p>
            </div>
        </main>
    )
}