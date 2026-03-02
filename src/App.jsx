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
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('*');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const featuredData = await getFeaturedArtworks();
        setFeatured(featuredData.items);
        setResults(featuredData.items);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchQuery(query);
    setActiveCategory('*');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const data = await searchArtworks({ query: query || '*' });
      setResults(data.items);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setLoading(true);
    setActiveCategory(category);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const data = await searchArtworks({
        query: category === '*' ? '*' : category
      });
      setResults(data.items);
    } catch (error) {
      console.error('Category change failed:', error);
    } finally {
      setLoading(false);
    }
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
          title={searchQuery ? `Search results for "${searchQuery}"` : "Eternal Collections"}
          onSelectItem={(id) => setSelectedItem(id)}
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
