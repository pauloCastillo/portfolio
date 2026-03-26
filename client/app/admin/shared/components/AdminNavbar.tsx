import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { cn } from "~/utils/utils";

import { usePathname } from "next/navigation";

type Items = {
  title: string;
  href: string;
  icon: IconDefinition;
  itemActive?: boolean;
  iconClass: string;
};

type Admin = {
  section: {
    title: string;
    items: Items[];
  };
};

export default function AdminNavbar({
  section
}: Readonly<Admin>) {

  const pathname = usePathname();

  return (
    <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
      {/* Category Label */}
      <div className="px-3 py-2 mt-2 mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/60">
          {section.title}
        </span>
      </div>
      {/* Active Item: Mission Control */}
      {section.items.map((item) => {

        const itemActive = item.href === pathname;

        return (
          <Link
            key={item.title}
            className="relative flex items-center gap-3 px-3 py-3 rounded-lg group bg-primary/10 text-white transition-all duration-200"
            href={item.href}
          >
            {itemActive && (
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-primary shadow-glow rounded-r-sm"></div>
            )}

            <FontAwesomeIcon
              icon={item.icon}
              className={cn(
                "group-hover:scale-110 transition-transform duration-200",
                item.iconClass,
              )}
              style={{ fontSize: "20px" }}
            />
            <span className="text-sm font-medium tracking-wide">
              {item.title}
            </span>
          </Link>
        )
      })}
    </nav>
  );
}
