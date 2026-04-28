"use client";

import { AddMember } from "@/components/modals/add-member";
import { createContext, useContext, useState } from "react";

export type ModalType = "add_member" | null;

export type ModalContextType = {
  type: ModalType;
  data?: any;
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<ModalType>(null);
  const [data, setData] = useState<any>(null);

  const openModal = (type: ModalType, data?: any) => {
    setType(type);
    setData(data || null);
  };

  const closeModal = () => {
    setType(null);
    setData(null);
  };

  return (
    <ModalContext.Provider value={{ type, data, openModal, closeModal }}>
      {children}
      <ModalRenderer />
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Wrap your app inside Modal Provider");

  return context;
};
const ModalRenderer = () => {
  const { type } = useModal();

  switch (type) {
    case "add_member":
      return <AddMember />;
    default:
      return null;
  }
};
