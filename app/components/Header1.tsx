"use client";

import { useGetAllGoalQuery } from "@/app/store/api";

function Header() {
  const { data } = useGetAllGoalQuery("");
  return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}

export default Header;
