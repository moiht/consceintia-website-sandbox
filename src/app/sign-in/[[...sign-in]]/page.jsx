import { SignIn } from "@clerk/nextjs";
import { dark, shadesOfPurple } from "@clerk/themes";
import CheckLoading from "@/components/CheckLoading";

export const metadata = {
  title: "Sign In - Consciousia 2k24",
  icons: {
    icon: "images/logo.png",
  },
  description: "Sign in to Conscientia 2k24",
};

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: shadesOfPurple,
        }}
        path="/sign-in"
      />
      <CheckLoading />
    </div>
  );
}
