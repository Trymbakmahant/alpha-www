import { Sidebar } from "@/components/Navigation/sidebar";
import Navbar from "@/components/Navigation/Navbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <div className="flex pt-[65px] w-screen flex-row">
        <Sidebar />
        <div className="w-full overflow-y-auto">
          <div className="h-full w-full  lg:px-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
