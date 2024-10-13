// app/layout.js
import './globals.css';
import Link from 'next/link';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Change Tracker',
  description: 'Track change requests and manage projects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation Menu */}
        <nav className="bg-base-200 p-4">
          <div className="container mx-auto">
            <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/manage">
                  Manage
                </Link>
              </li>
              <li>
                <Link href="/changelog">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/timeline">
                  Timeline
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
