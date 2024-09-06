import "./globals.scss";
import AuthContext from "./context/AuthContext";

export const metadata = {
  title: "chat website",
  description: "real time chat website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthContext>{children}</AuthContext>
      </body>
    </html>
  );
}
