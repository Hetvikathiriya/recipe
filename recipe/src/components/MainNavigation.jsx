import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { Outlet } from "react-router-dom";

export default function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="layout">
      <Navbar setIsOpen={setIsOpen} />

      <main className="content">
        <Outlet />
      </main>

      <Footer setIsOpen={setIsOpen} />

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
