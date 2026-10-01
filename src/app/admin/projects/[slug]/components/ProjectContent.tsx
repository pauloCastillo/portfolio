import { ChildrenType } from "@/types/general";

export default function ProjectContent({ children }: ChildrenType){
    return(
    <div className="prose prose-lg mx-auto max-w-2xl">
        {children}
    </div>
    )
}