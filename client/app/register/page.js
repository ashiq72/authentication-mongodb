"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset from useForm
  } = useForm();

  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset(); // Reset the form

        // router.push("/");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-auto h-screen mx-auto flex justify-center items-center">
      <div className="bg-sky-500 p-5 rounded shadow-2xl">
        <h1 className="text-gray-200 text-3xl font-semibold pb-2">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            className="outline-none p-1 rounded font-mono "
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
          <input
            className="outline-none p-1 rounded font-mono"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-700 text-sm">This field is required</span>
          )}
          <input
            type="submit"
            className="bg-gray-700 text-white py-1 rounded-md hover:bg-gray-600 duration-300"
          />
          {/* <input type="submit" /> */}
        </form>
        <div className="pt-2 text-center">
          <p className="text-white font-normal text-sm">
            <span>Don't Have an Account?</span>{" "}
            <Link href="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
