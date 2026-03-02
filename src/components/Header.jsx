import React, { useState } from 'react';
import { Search, Menu, X, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onSearch }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchValue);
        setIsSearchOpen(false);
    };

    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--color-border)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Landmark size={28} color="var(--color-accent)" />
                <h1 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>CHASTITY</h1>
            </div>

            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <button
                    onClick={() => setIsSearchOpen(true)}
                    style={{ padding: '0.5rem', borderRadius: '50%', display: 'flex' }}
                    className="search-trigger"
                >
                    <Search size={22} />
                </button>
            </nav>

            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '70px',
                            background: 'var(--color-bg)',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 2rem',
                            zIndex: 1001
                        }}
                    >
                        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search masterpieces, artists, eras..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '1.2rem',
                                    background: 'transparent',
                                    fontFamily: 'var(--font-serif)'
                                }}
                            />
                            <button type="submit" style={{ display: 'none' }} />
                        </form>
                        <button onClick={() => setIsSearchOpen(false)} style={{ padding: '0.5rem' }}>
                            <X size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
