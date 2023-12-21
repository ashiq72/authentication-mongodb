import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="w-auto h-screen mx-auto flex justify-center items-center">
      <div className="bg-sky-500 p-5 rounded shadow-2xl">
        <h1 className="text-gray-200 text-3xl font-semibold pb-2">Login</h1>

        <from className="flex flex-col gap-3">
          <input
            className="outline-none p-1 rounded font-mono"
            type="email"
            placeholder="Email"
          />
          <input
            className="outline-none p-1 rounded font-mono"
            type="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-gray-700 text-white py-1 rounded-md hover:bg-gray-600 duration-300"
          >
            Submit
          </button>
        </from>

        <div className="pt-2 text-center">
          <p className="text-white font-normal text-sm">
            <span>You already have an account?</span>{" "}
            <Link href="/register" className="font-semibold underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
