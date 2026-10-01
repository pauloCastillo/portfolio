import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function BreadcrumbItem({ label, href }: Readonly<{ label: string; href?: string }>) {
    return(
        <li className="text-sm text-gray-500 inline-flex items-center gap-1.5">
            {href ? (
                <Link className="transition-colors hover:text-primary hover:cursor-pointer" href={href}>
                    <span>{label}</span>
                </Link>

            ) : (
                <span>{label}</span>
            )}
            <FontAwesomeIcon icon={faChevronRight} className="text-xs text-gray-400" />
        </li>
    )
}