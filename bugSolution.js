// bugSolution.js
import { useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/data', { method: 'POST', body: event.target.formData });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
