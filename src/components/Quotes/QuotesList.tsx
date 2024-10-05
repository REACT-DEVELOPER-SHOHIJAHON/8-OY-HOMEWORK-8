import React from 'react';
import { useGetQuotesQuery } from '../../api/quotesApi';
import './QuotesList.css'; 

const QuotesList: React.FC = () => {
  const { data, error, isLoading } = useGetQuotesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="quotes-container">
      <h2 className="quotes-title">Quotes</h2>
      <ul className="quotes-list">
        {data.quotes.map((quote: any) => (
          <li key={quote.id} className="quote-item">
            {quote.quote}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesList;
