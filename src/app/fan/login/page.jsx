"use client";
import React, { FormEventm, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../../globals.css";
import { global } from "styled-jsx/css";
import Link from "next/link";
import Logo from "@/src/components/fan_guest/Logo";
import Navbar from "@/src/components/fan_guest/Navbar";
import { styles } from "@/src/utils/styles";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";

const Login = () => {
  const router = useRouter();
  const { session, status } = useSession();

  const [message, setMessage] = useState(""); // For error message
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function loginUser(e) {
    e.preventDefault();
    signIn("credentials", {
      ...form,
      redirect: false,
    })
      // .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setMessage("");
          router.push("/");
        } else {
          setMessage(res.error);
        }
      })
      .catch((e) => {
        console.log("error: ", e);
        setMessage(e.error);
      });
  }

  return (
    <>
      <DisplayMessage
        title="Invalid Credentials"
        message={message}
        setMessage={setMessage}
        show={message}
      />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={loginUser}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Password
                </label>
                {/* // TODO: forget password using OTP service */}
                {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/fan/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;

// export async function getServerSideProps(context) {
//   const { req } = context;
//   const session = await getSession({ req });
//   const providers = await getProviders();
//   if (session) {
//     // Redirect
//     return {
//       redirect: { destination: "/fan" },
//     };
//   }
//   return {
//     props: {
//       providers,
//     },
//   };

//   if (
//     context.req.body.username == "user" &&
//     context.req.body.password == "123"
//   ) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//     };
//   }
// }
