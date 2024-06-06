import { signIn, signOut, auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Panda from "@/public/panda.png";

function SignIn({ provider, ...props }: { provider?: any }) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <button
        className="border p-[4px] rounded-[8px] border-amber-800"
        {...props}
      >
        Sign In
      </button>
    </form>
  );
}

function SignOut(props: any) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        className="border p-[4px] rounded-[8px] border-amber-800"
        {...props}
      >
        Sign Out
      </button>
    </form>
  );
}

export default async function Header({ children }) {
  const session = await auth();
  return (
    <header className="header h-60 bg-blue-200 flex items-center box-content justify-between pl-20 pr-20">
      <div className="flex items-center">
        {session?.user ? (
          <div className="flex items-center">
            <Image
              src={session?.user?.image! || Panda}
              alt="avatar"
              width={48}
              height={48}
              className="block rounded-full mr-8"
            />
            <div className="mr-10">
              <p>{session?.user?.name}</p>
              <p>{session?.user?.email}</p>
            </div>
            <SignOut />
          </div>
        ) : (
          <SignIn />
        )}

        <Link href="/client" className="block text-amber-700 ml-30">
          Go Client Side Component
        </Link>
      </div>
      {children}
    </header>
  );
}
