import '../styles/globals.css';
import { useTransition, animated } from '@react-spring/web';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const transitions = useTransition(router.pathname, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
    config: { duration: 300 },
  });

  return (
    <>
      {transitions((style, item) => (
        <animated.div style={style} key={item}>
          <Component {...pageProps} />
        </animated.div>
      ))}
    </>
  );
}

export default MyApp;
