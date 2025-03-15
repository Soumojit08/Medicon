import React from "react";
import { Mail, ShieldCheck } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-100 py-2 text-lg">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-1">
          <p className="text-sm text-gray-600">
            {currentYear} MediCon. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="/terms"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <span className="text-sm text-gray-400">|</span>
            <a
              href="/privacy"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Contact us:</span>
            <a
              href="mailto:support@medicon.com"
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center"
            >
              <Mail className="w-4 h-4 mr-1" />
              support@medicon.com
            </a>
          </div>
          <div className="flex items-center mt-2">
            <ShieldCheck className="w-4 h-4 mr-1 text-gray-600" />
            <span className="text-xs text-gray-500">
              Your data is secure with us.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
