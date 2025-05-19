import {Button} from "@/components/ui/button";
import {LoginButton} from "@/components/auth/login-button";

export default function Home() {
  return (
      <main className="flex h-full flex-col items-center justify-center bg-radial from-emerald-100 to-emerald-800 text-center">
        <div className={"space-y-10 "}>
            <h1 className={"text-4xl drop-shadow-2xl font-semibold"}>🔏 Auth</h1>
            <p className={"text-xl font-semibold"}>A Simple & Powerful💪 Authentication Service</p>
        </div>

          <LoginButton mode={"redirect"}>
              <Button variant={"default"} size={"lg"} className={"mx-2 my-8"}>
                  Sign In
              </Button>
          </LoginButton>
      </main>
  );
}
