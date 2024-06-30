import { SignUp } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

export const metadata = {
  title: "Sign Up - Consciousia 2k24",
  icons: {
    icon: "images/logo.png",
  },
  description: "Sign up to Conscientia 2k24",
};

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: shadesOfPurple,
        }}
        path="/sign-up"
      />
    </div>
  );
}
