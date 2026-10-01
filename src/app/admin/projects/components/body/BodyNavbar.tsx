import Filters from "./Filters"
import ProjectStatus from "./Status"

type BodyNavbarProps = {
  liveCount: number;
  draftCount: number;
};

export default function BodyNavbar({ liveCount, draftCount }: Readonly<BodyNavbarProps>){
    {/* <!-- Filters & Stats Row --> */}
    return(
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            {/* <!-- Filter Tabs --> */}
            <Filters />
            {/* <!-- Mini Status --> */}
            <ProjectStatus liveCount={liveCount} draftCount={draftCount} />
        </div>
    )
}
