import React, { useState } from 'react';
import { Users } from './Users/Users';
import { Form } from './client/components/Form/Form';

function App() {
  const [isSubmited, setIsSubmited] = useState(false);
  
  return (
    <div className="App">
      <Users isFormSubmited={isSubmited} />
      <Form isSubmited={isSubmited} setIsSubmited={setIsSubmited} />
    </div>
  );
}

export default App;
