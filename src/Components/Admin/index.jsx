import React from "react";
import { Outlet } from "react-router-dom";

function AdminContent() {
  return (
    <div>
      {/* Outlet faqat admin sahifasida ishlaydi */}
      <Outlet /> {/* Bu yerda faqat admin sahifalari ko‘rsatiladi */}
    </div>
  );
}

export default AdminContent;

