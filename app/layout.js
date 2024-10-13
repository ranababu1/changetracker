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
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <Link href="/manage">
                Manage
                <span className="badge badge-sm"></span>
              </Link>
            </li>
            <li>
              <Link href="/changelog">
                Changelog
                <span className="badge badge-sm"></span>
              </Link>
            </li>
            <li>
              <Link href="/timeline">
                Timeline
                <span className="badge badge-sm"></span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="container mx-auto p-4">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
