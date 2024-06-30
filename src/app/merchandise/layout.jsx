export const metadata = {
  title: "Merchandise - Conscientia 2k24",
  description:
    "Conscientia 2k24 is a technical fest conducted by the Department of Computer Science and Engineering, College of Engineering, Chengannur.",
  icons: {
    icon: "/images/logo.png", // /public path
  },
  url: "https://conscientia.co.in",
  type: "website",
  siteName: "Conscientia 2k24",
};

export default function MerchLayout({ children }) {
  return <section>{children}</section>;
}
