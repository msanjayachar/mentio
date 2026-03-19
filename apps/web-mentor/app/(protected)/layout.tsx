import "@repo/ui/styles.css";
import { AuthGuard } from "../components/context/authGuard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
