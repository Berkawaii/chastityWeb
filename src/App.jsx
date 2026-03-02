import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ArtGrid from './components/ArtGrid';
import ArtDetail from './components/ArtDetail';
import CategoryBar from './components/CategoryBar';
import { getFeaturedArtworks, searchArtworks } from './services/europeanaApi';

function App() {
  const [featured, setFeatured] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('*');
  const [selectedItem, setSelectedItem] = useState(null);
  const [startIndex, setStartIndex] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = async (query, start = 1, append = false) => {
    if (start === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const data = await searchArtworks({
        query: query || '*',
        start: start,
        rows: 24
      });

      if (append) {
        setResults(prev => [...prev, ...data.items]);
      } else {
        setResults(data.items);
      }
      setTotalResults(data.totalResults);
      if (start === 1 && !append && data.items.length > 0) {
        setFeatured(data.items.slice(0, 1));
      }
    } catch (error) {
      console.error('Fetch failed:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchData('*', 1);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setActiveCategory('*');
    setStartIndex(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData(query, 1);
  };

  const handleCategoryChange = async (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    setStartIndex(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchData(category === '*' ? '*' : category, 1);
  };

  const handleLoadMore = () => {
    if (loadingMore || results.length >= totalResults) return;
    const nextStart = startIndex + 24;
    setStartIndex(nextStart);
    fetchData(searchQuery || activeCategory, nextStart, true);
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main>
        {!searchQuery && activeCategory === '*' && <Hero artwork={featured[0]} />}

        <CategoryBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <ArtGrid
          items={results}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={results.length < totalResults}
          title={searchQuery ? `Search results for "${searchQuery}"` : "Eternal Collections"}
          onSelectItem={(id) => setSelectedItem(id)}
          onLoadMore={handleLoadMore}
        />
      </main>

      <ArtDetail
        id={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <footer style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        marginTop: '6rem',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-serif)',
        background: 'white'
      }}>
        <p style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
          "Art is the lie that enables us to realize the truth."
        </p>
        <p style={{ fontSize: '0.8rem', letterSpacing: '2px', opacity: 0.6 }}>
          © 2025 CHASTITY VIRTUAL MUSEUM. POWERED BY EUROPEANA API.
        </p>
      </footer>
    </div>
  );
}

export default App;
