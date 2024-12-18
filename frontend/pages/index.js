import React from 'react';
import Link from 'next/link';
import { useSpring, animated } from '@react-spring/web';
import Header from '../components/Header';

export default function Home() {
  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 700 },
  });

  const titleAnimation = useSpring({
    from: { transform: 'scale(0.8)' },
    to: { transform: 'scale(1)' },
    config: { duration: 500 },
  });

  const descriptionAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    config: { duration: 700 },
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 700,
    config: { duration: 500 },
  });

  const gridAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    config: { duration: 700 },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <animated.div style={headerAnimation} className="container mx-auto px-4 py-16 text-center">
        <animated.h1
          style={titleAnimation}
          className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Automated Report Creator (ARC)
        </animated.h1>

        <animated.p
          style={descriptionAnimation}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          ARC is an intelligent platform that streamlines report generation
          by leveraging advanced AI technologies. Transform your complex
          information into comprehensive, insightful reports with just a few clicks.
        </animated.p>

        <animated.div style={buttonAnimation} className="flex justify-center space-x-6">
          <Link href="/generate">
            <animated.button
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Start Generating
            </animated.button>
          </Link>
        </animated.div>

        <animated.div
          style={gridAnimation}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">AI-Powered</h3>
            <p className="text-gray-600">Leverage cutting-edge AI to generate precise reports</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Customizable</h3>
            <p className="text-gray-600">Tailor reports to your specific requirements</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Efficient</h3>
            <p className="text-gray-600">Reduce report generation time dramatically</p>
          </div>
        </animated.div>
      </animated.div>
      <animated.h1
          style={titleAnimation}
          className=" text-center text-lg font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Created By: Nithin Babu B R and Abhishek U
        </animated.h1>
    </div>
  );
}
