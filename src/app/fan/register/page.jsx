"use client";
import React, { FormEventm, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { validValues } from "@/src/utils/validation";
import DisplayMessage from "@/src/components/fan_guest/DisplayMessage";
import { styles } from "@/src/utils/styles";
import { useSession } from "next-auth/react";

const Register = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [message, setMessage] = useState("");
  const [usernameUnique, setUsernameUnique] = useState(true);
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: validValues.genders[0],
    city: "",
    address: "",
    emailAddress: "",
    role: validValues.roles[0],
  });

  async function registerUser(e) {
    e.preventDefault();

    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          router.push("/fan/login");
        } else {
          setMessage(res.text());
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.message);
      });
  }

  useEffect(() => {
    if (session && status == "authenticated") router.push("/fan");
  }, [session, status]);

  useEffect(() => {
    if (form.username) {
      fetch("/api/user/" + form.username)
        .then((res) => {
          // If not found then username is unique
          setUsernameUnique(res.status == 201);
        })
        .catch((err) => {
          console.log(err);
          setUsernameUnique(false);
        });
    }
  }, [form.username]);

  return (
    <>
      <DisplayMessage
        title={"Invalid Input"}
        message={message}
        show={message.length != 0}
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
            onSubmit={registerUser}
          >
            {/* username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6"
              >
                Username <span>*</span>
                <div className="label">
                  <span className="label-text">
                    Pick your username. Will be used to login.
                  </span>
                  <span className="label-text-alt">Required</span>
                </div>
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
              <div className="label">
                {form.username.length != 0 && (
                  <>
                    {usernameUnique ? (
                      <span className="label-text-alt text-green-700">
                        Username is available ✔
                      </span>
                    ) : (
                      <span className="label-text-alt text-red-800">
                        Username is already taken.
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password <span>*</span>
                <div className="label">
                  <span className="label-text">Enter your password</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* firstName */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6"
              >
                First Name <span>*</span>
                <div className="label">
                  <span className="label-text">Enter your first name</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  required
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* lastName */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6"
              >
                Last Name <span>*</span>
                <div className="label">
                  <span className="label-text">Enter your last name</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  required
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* birthDate */}
            <div>
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium leading-6"
              >
                Birth Date <span>*</span>
                <div className="label">
                  <span className="label-text">Pick your Date of Birth</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  autoComplete="birthDate"
                  required
                  value={form.birthDate}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    setForm({ ...form, birthDate: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6"
              >
                Gender <span>*</span>
                <div className="label">
                  <span className="label-text">Pick your Gender.</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <select
                className={
                  "select select-bordered " + styles.inputs + " w-full"
                }
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                required
              >
                {validValues.genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {/* Captialize first letter */}
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* city */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6"
              >
                City <span>*</span>
                <div className="label">
                  <span className="label-text">Pick your city.</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="city"
                  name="city"
                  type="text"
                  autoComplete="city"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6"
              >
                Home Address <span>*</span>
                <div className="label">
                  <span className="label-text">Enter your home address.</span>
                  <span className="label-text-alt">Required</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  required
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* emailAddress */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium leading-6"
              >
                Email
                <div className="label">
                  <span className="label-text">Enter a valid email</span>
                </div>
              </label>
              <div className="mt-2">
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  autoComplete="emailAddress"
                  value={form.emailAddress}
                  onChange={(e) =>
                    setForm({ ...form, emailAddress: e.target.value })
                  }
                  className={styles.inputs + " w-full"}
                />
              </div>
            </div>

            {/* role */}
            <div>
              <div className="mt-2">
                <label htmlFor="role" className="w-full max-w-xs">
                  Role <span>*</span>
                  <div className="label">
                    <span className="label-text">
                      Pick your type of account
                    </span>
                    <span className="label-text-alt">Required</span>
                  </div>
                  <select
                    className={
                      "select select-bordered " + styles.inputs + " w-full"
                    }
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    required
                  >
                    {validValues.roles.map((role) => (
                      <option key={role} value={role}>
                        {/* Captialize first letter */}
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            {/* Submit */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
