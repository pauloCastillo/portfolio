import { cn } from "~/utils/utils";
import BreadcrumbItem from "./BreadcrumbItem";

export default function BreadCrumbList({ classname, items }: Readonly<{ classname?: string, items: Array<{ label: string; href?: string }> }>) {
    return(
        <ol className={cn("flex flex-wrap items-center gap-1.5 wrap-break-word text-sm text-muted-foreground sm:gap-2.5", classname)}>
            {items.map((item, index) => (
                <BreadcrumbItem key={index} label={item.label} href={item.href} />
            ))}
        </ol>
    )
}