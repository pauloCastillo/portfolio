import type { ChildrenType } from "~/types/general"

export default function HeaderContent({ children }: Readonly<ChildrenType>) {
    return (
        <header className="h-20 min-w-full px-8 flex items-center justify-between border-b border-border-glass bg-void/80 backdrop-blur-md sticky top-0 z-30">
            {children}
        </header>
    )
}