import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-#F8F8F8">
      <header>Header</header>
      <div className="overflow-scrol">
        <main className="h-full">
          <Outlet />
        </main>
      </div>
      <footer>Footer</footer>
    </div>
  );
}

export default AppLayout;
