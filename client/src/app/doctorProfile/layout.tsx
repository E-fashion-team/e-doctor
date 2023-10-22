import "./style.css";
import type { Metadata } from "next";
import NavBar from "../../components/navbar/Navbar";
import { ReduxProvider } from "../../store/provider";
import SideBar from "./SideBar";
import TopNav from "./TopNav";
export const metadata: Metadata = {
  title: "E-doctor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ReduxProvider>
          <div className="DoctorProfile-body">
            <SideBar />
            <div className="DoctorProfile-main">
              <TopNav />
              <div style={{ display: "flex" }}></div>
              {children}
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
