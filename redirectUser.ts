import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { firebaseAdmin } from "./firebaseAdmin";

export const redirectUser = async (
  ctx: GetServerSidePropsContext
): Promise<{
  redirect: {
    permanent: boolean;
    destination: string;
  };
  props: never;
}> => {
  const cookies = nookies.get(ctx);
  console.log(JSON.stringify(cookies, null, 2));
  const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
  const { uid } = token;

  console.log("waaa", uid);

  if (!uid) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/authenticated",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};
