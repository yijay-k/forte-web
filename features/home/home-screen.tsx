import { HomeHeader } from "./home-header";
import { ReviseCallout } from "./revise-callout";
import { FourNumbers } from "./four-numbers";
import { QuickActions } from "./quick-actions";
import { RecentActivity } from "./recent-activity";

/** The signed-in dashboard. Assembled, not authored — every block is its own file. */
export function HomeScreen() {
  return (
    <div className="min-h-full bg-dot-grid bg-paper bg-[length:24px_24px] px-[clamp(16px,4.5vw,56px)] pt-[clamp(24px,4.5vw,44px)] pb-18">
      <div className="mx-auto max-w-[1000px]">
        <HomeHeader />
        <ReviseCallout />
        <FourNumbers />
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
