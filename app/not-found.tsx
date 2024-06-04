import { SearchX } from "lucide-react";

import { Navbar } from "./(dashboard)/_components/navbar";
import { Sidebar } from "./(dashboard)/_components/sidebar";

const DashboardNotFound = () => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full flex items-center justify-center">
        <div className="p-4 text-slate-600 flex flex-col text-center">
          <h2 className="text-2xl font-bold">404</h2>
          <div>
            <p>A página que você procura não foi encontrada.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardNotFound;