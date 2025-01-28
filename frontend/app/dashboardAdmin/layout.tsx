import Sidebar from "@/components/adminSidebar/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[#0A0A0A] ">
      <Sidebar />

      <div className="bg-customBlack flex-wrap">{children}</div>
    </section>
  );
}
