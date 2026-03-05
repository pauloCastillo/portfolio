import ActivityFeed from "./ActivityFeed";
import ChartArea from "./ChartArea";
import HeaderChart from "./HeaderChart";

export default function MainChart() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-full min-h-[400px]">
      {/* <!-- Main Chart: Traffic Velocity --> */}
      <div className="glass-panel relative flex flex-col rounded-2xl p-6 lg:col-span-2 min-h-56">
        <HeaderChart />
        {/* <!-- Simulated Chart Area --> */}
        <ChartArea />
      </div>
      {/* <!-- Activity Feed --> */}
      <ActivityFeed />
    </div>
  );
}
