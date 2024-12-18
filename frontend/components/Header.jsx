import React from 'react';
import Link from 'next/link';
import { useSpring, animated, config } from '@react-spring/web';

const Header = () => {
  // Spring animation for the header
  const headerSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-50px)' },
    config: config.default,
  });

  return (
    <animated.header
      style={headerSpring}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <animated.div
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            className="flex items-center space-x-2"
          >
            {/* Using an online logo */}
            <Link href="/">
            <img
              src="https://img.icons8.com/?size=100&id=123822&format=png&color=000000" 
              alt="ARC Logo"
              className="h-10 w-10 rounded-none"
            />
            </Link>
            
            <Link href="/">
            <span style={{ fontFamily: "'Oswald', sans-serif"}} className="text-xl font-bold">ARC</span>
            </Link>
            
          </animated.div>
        </div>

        <nav className="flex space-x-6">
          <animated.div
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
<Link
  href="/"
  className="hover:text-blue-200 transition-colors bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>              Home
            </Link>
          </animated.div>
          <animated.div
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
<Link
  href="/generate"
  className="hover:text-blue-200 transition-colors bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
  style={{ fontFamily: "'Poppins', sans-serif" }}
>              Generate Report
            </Link>
          </animated.div>
        </nav>
      </div>
    </animated.header>
  );
};

export default Header;
