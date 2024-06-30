export const metadata = {
  title: "Completing Authentication",
  icons: {
    icon: "/images/logo.png", // /public path
  },
};

export default async function AuthenticationLayout({ children }) {
  return <section>{children}</section>;
}
