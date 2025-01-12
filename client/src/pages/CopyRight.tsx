import React from "react";

const CopyRight: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Copyright Policy</h1>
      <p className="mb-4">
        Welcome to BURGERANIME, a community-driven platform dedicated to anime enthusiasts. BURGERANIME provides an ad-free and visually enjoyable space for users to discover and watch anime episodes seamlessly.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Purpose</h2>
      <p className="mb-4">
        BURGERANIME is not a content-hosting platform. Instead, our website sources anime episodes using embedded <code>&lt;iframe&gt;</code> elements from third-party servers. These servers host and stream the anime content. Our role is solely to provide a well-organized and user-friendly platform to access this content.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Content Ownership</h2>
      <p className="mb-4">
        BURGERANIME does not claim ownership of the anime episodes displayed on our website. All rights to the content, including copyrights and trademarks, remain with their respective owners. The embedded videos belong to external websites and servers, and BURGERANIME does not have any control over their hosting or availability.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Promotion and Support</h2>
      <p className="mb-4">
        By embedding <code>&lt;iframe&gt;</code> elements, we aim to promote the original servers that host the anime episodes. When visitors watch anime through BURGERANIME, the views contribute directly to the hosting servers, ensuring that the content owners benefit from their work. This approach allows us to support the anime community and its creators without interfering with their revenue streams.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">No Profit, Only Passion</h2>
      <p className="mb-4">
        BURGERANIME operates with a clear mission: to provide an enjoyable, ad-free experience for anime fans. We do not generate any revenue from this platform, and there are no advertisements on our site. Our focus is entirely on creating a beautiful, reliable space where users can access anime episodes for free while respecting the rights of content creators.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Legal Disclaimer</h2>
      <p className="mb-4">
        BURGERANIME serves as a promotional platform and does not host or upload any anime episodes. If you have any copyright concerns or believe that an embedded video violates your rights, please contact the hosting server directly. BURGERANIME does not control the content hosted on external servers and cannot remove or modify it.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
      <p className="mb-4">
        If you have questions about our copyright policy or the purpose of BURGERANIME, please feel free to contact us. We value transparency and are committed to maintaining a positive relationship with the anime community.
      </p>
      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BURGERANIME by Amadich. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default CopyRight;
