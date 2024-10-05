import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import NestedList from './components/NestedList';

const App: React.FC = () => {
    return (
      <>
          <GlobalStyles />
          <NestedList/>
      </>
    );
};

export default App;
