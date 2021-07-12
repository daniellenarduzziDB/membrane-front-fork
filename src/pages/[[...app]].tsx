import { useState, useEffect } from 'react'
import CreateReactAppEntryPoint from '~/legacy/App';

/**
 * https://nextjs.org/docs/migrating/from-create-react-app#single-page-app-spa
 */
const App = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, []);

  if (!isMounted) {
    return null;
  }

  return <CreateReactAppEntryPoint />;
}

export default App;
