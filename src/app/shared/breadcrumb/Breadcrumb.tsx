"use client";

import { usePathname } from "next/navigation";
import BreadCrumbList from "./BreadcrumbList";

export default function Breadcrumb() {
    const pathname = usePathname();
    
    // Split pathname and remove empty strings
    const parts = pathname.split('/').filter(part => part !== '');
    
    // Remove action segments (view, create) from the end
    const actions = ['view', 'create'];
    if (parts.length > 0 && actions.includes(parts[parts.length - 1])) {
        parts.pop();
    }
    
    // Build breadcrumb items (max 2: parent directory and project name)
    const breadcrumbItems = [];
    if (parts.length >= 2) {
        // We have at least parent and project
        const parent = parts[parts.length - 2];
        const project_current = parts[parts.length - 1];

        // Parent directory link
        const parentHref = '/' + parts.slice(0, parts.length - 1).join('/');
        breadcrumbItems.push({
            label: parent.charAt(0).toUpperCase() + parent.slice(1),
            href: parentHref
        });
        
        // Project link (current page - not linked)
        const projectLabel = project_current.charAt(0).toUpperCase() + project_current.slice(1);
        breadcrumbItems.push({
            label: projectLabel,
            href: undefined // Current page, not linked
        });
    } else if (parts.length === 1) {
        // Only project name (no parent context)
        breadcrumbItems.push({
            label: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
            href: undefined // Current page, not linked
        });
    }
    
    return (
        <div className="flex-none px-6 py-3 border-b border-surface-border bg-void/50 backdrop-blur-sm flex items-center gap-2 text-sm font-mono">
            <BreadCrumbList items={breadcrumbItems} />
        </div>
    );
}