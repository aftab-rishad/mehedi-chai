import React from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="max-w-xl sm:rounded-xl border-border border w-full px-6 py-2 fixed top-0 sm:top-4 bg-card flex items-center justify-between">
      <div>
        <Link className="flex items-center gap-1 select-none" href="/" prefetch>
          <Image alt="logo" src={Logo} className="w-8" />
          <h2 className="text-lg font-bold">
            মেহেদি <span className="text-primary">চাই</span>
          </h2>
        </Link>
      </div>
      <div>
        <Button asChild>
          <Link prefetch href="/request">
            প্রিয়জনকে মেহেদি দিতে বলো 😏
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
