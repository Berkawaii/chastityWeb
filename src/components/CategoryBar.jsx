import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { label: 'All', query: '*' },
    { label: 'Paintings', query: 'painting' },
    { label: 'Sculptures', query: 'sculpture' },
    { label: 'Photography', query: 'photography' },
    { label: 'Manuscripts', query: 'manuscript' },
    { label: 'Drawings', query: 'drawing' },
    { label: 'Tapestries', query: 'tapestry' }
];

const CategoryBar = ({ activeCategory, onCategoryChange }) => {
    return (
        <nav style={{
            padding: '2rem',
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            borderBottom: '1px solid var(--color-border)',
            background: 'white',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
        }}>
            {categories.map((cat) => (
                <button
                    key={cat.query}
                    onClick={() => onCategoryChange(cat.query)}
                    style={{
                        position: 'relative',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: activeCategory === cat.query ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        padding: '0.5rem 0'
                    }}
                >
                    {cat.label}
                    {activeCategory === cat.query && (
                        <motion.div
                            layoutId="active-cat"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '2px',
                                background: 'var(--color-accent)'
                            }}
                        />
                    )}
                </button>
            ))}
        </nav>
    );
};

export default CategoryBar;
