import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-200 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Links and Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              About Ocuris
            </h3>
          </div>
          {/* Column 1: Important Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Important Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Merch
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Case Studies */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Case Studies
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/zapier-vs-ocuris"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Zapier vs ocuris
                </Link>
              </li>
              <li>
                <Link
                  href="/make-vs-ocuris"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Make vs Ocuris
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Affiliate Program */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Affiliate Program
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/become-an-expert"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Become an expert
                </Link>
              </li>
              <li>
                <Link
                  href="/join-user-tests"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Join user tests, get a gift
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/legal"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Report a Vulnerability */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Security
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/report-vulnerability"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Report a vulnerability
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Made with Love */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Made with ❤️ in India | © 2025 Orchestra | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
