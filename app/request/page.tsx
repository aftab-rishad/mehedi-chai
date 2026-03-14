import Header from "@/components/common/Header";
import RequestFrom from "@/components/request/RequestFrom";
import React from "react";

function RequestPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen w-screen items-center justify-center px-4 mt-2 sm:mt-0">
        <RequestFrom />
      </div>
    </>
  );
}

export default RequestPage;
