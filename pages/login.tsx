import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "../auth";
import { firebaseClient } from "../firebaseClient";
import { redirectUser } from "../redirectUser";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return redirectUser(ctx);
};

export default (_props: any) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { user } = useAuth();

  console.log(user);

  // useEffect(() => {
  //   console.log("use effec");
  //   if (user?.uid) {
  //     console.log("user is here");
  //     router.replace("/authenticated");
  //   }
  // }, [user]);

  return (
    <div>
      <Link href="/">
        <a>Go back to home page</a>
      </Link>
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"Email"}
      />
      <input
        type={"password"}
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder={"Password"}
      />
      <button
        onClick={async () => {
          await firebaseClient
            .auth()
            .createUserWithEmailAndPassword(email, pass);
          window.location.href = "/";
        }}
      >
        Create account
      </button>
      <button
        onClick={async () => {
          await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
          window.location.href = "/";
        }}
      >
        Log in
      </button>
    </div>
  );
};
