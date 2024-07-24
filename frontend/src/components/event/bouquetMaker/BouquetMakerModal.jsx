/* eslint-disable react/prop-types */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../../../axios";
import toast from "react-hot-toast";
import Loader from "../../Loader";
import { useCookies } from "react-cookie";

function BouquetMakerModal({
  setEnabledBouqet,
  eventId,
  setEnabledDriver,
  setModalToggle,
  role,
}) {
  const [cookies] = useCookies(["user"]);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(true);

  // const { mutate, isPending, error } = useMutation({
  //   mutationFn: async (obj) => {
  //     const res = await API.patch(
  //       `events/toggle-participation/${eventId}/`,
  //       obj,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies.token}`,
  //         },
  //       }
  //     );
  //     console.log(res);
  //     window.localStorage.setItem("message", `${res.data.message}`);

  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["events"],
  //     });

  //     setModalToggle(false);

  //     setEnabledBouqet((prev) => !prev);
  //     setEnabledDriver((prev) => !prev);

  //     toast.success(`Toggle completed`);
  //   },
  //   onError: () => {
  //     toast.error("Oh no, retry :(");
  //   },
  // });
  // console.log(error);

  // function handleToggle(data) {
  //   console.log(data);
  //   mutate({ ...data, role: role });
  // }

  if (isPending) return <Loader />;
  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-red-600"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Choose to be bouquet maker
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to be a bouqet maker for this the
                    event? This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
              <button
                type="button"
                onClick={() => {
                  handleToggle();
                  setOpen(false);
                }}
                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 sm:w-auto"
              >
                YES
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  // setModalBouqet(false);
                  setModalToggle((prev) => !prev);
                  setOpen(false);
                  setEnabledBouqet(false);
                  setEnabledDriver(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BouquetMakerModal;
