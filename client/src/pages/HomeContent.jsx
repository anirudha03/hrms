import React from "react";
import ListSlips from "../components/ListSlips";
import ListLeaves from "../components/ListLeaves";
import GetEmails from "../components/GetEmails";
import "../scrollbar.css"
import DeptGraph from "../components/DeptGraph";

export default function HomeContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-3 h-screen lg:flex-wrap">
      <div className="lg:w-1.5/5 lg:h-1/2 bg-slate-100 overflow-y-auto rounded-lg">
        <ListSlips />
      </div>
      <div className="lg:w-2/5 lg:h-1/2 bg-slate-100 overflow-y-auto rounded-lg">
        <ListLeaves />
      </div>
      <div className="lg:w-1/5 lg:h-1/2 bg-slate-100 overflow-y-auto rounded-lg">
        <GetEmails/>
      </div>
      <div className="lg:w-2/5 lg:h-1/2 bg-slate-100 overflow-y-auto rounded-lg">
        <DeptGraph/>
      </div>
    </div>
  );
}
