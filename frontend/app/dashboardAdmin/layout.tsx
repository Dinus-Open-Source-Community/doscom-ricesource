import TopBar from "@/components/admin/topBar";
import Sidebar from "@/components/admin/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white h-screen overflow-hidden flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
