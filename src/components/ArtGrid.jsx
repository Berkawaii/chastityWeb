import React from 'react';
import ArtCard from './ArtCard';
import LoadingIndicator from './LoadingIndicator';
import { motion } from 'framer-motion';

const ArtGrid = ({ items, loading, title, onSelectItem }) => {
    if (loading) return <LoadingIndicator />;

    return (
        <section style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '3rem',
                borderBottom: '1px solid var(--color-border)',
                paddingBottom: '1rem'
            }}>
                <h3 style={{ fontSize: '2rem' }}>{title}</h3>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    {items.length} works found
                </span>
            </div>

            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '2.5rem',
                }}
            >
                {items.map((item, index) => (
                    <ArtCard key={item.id} item={item} index={index} onClick={() => onSelectItem(item.id)} />
                ))}
            </motion.div>

            {items.length === 0 && !loading && (
                <div style={{ textAlign: 'center', padding: '8rem 0' }}>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem' }}>
                        No masterpieces found for your search. Try a different era or artist.
                    </p>
                </div>
            )}
        </section>
    );
};

export default ArtGrid;
