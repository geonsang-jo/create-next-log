import NavToggles from "./toggle";
import PageNav from "./nav";

function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between lg:px-8">
        <div className="md:flex">
          <PageNav />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NavToggles />
        </div>
      </div>
    </header>
  );
}

export default Header;
