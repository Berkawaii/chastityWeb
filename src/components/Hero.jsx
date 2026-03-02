import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ artwork }) => {
    if (!artwork) return null;

    const imageUrl = artwork.edmPreview?.[0] || artwork.link?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop';
    const title = artwork.title?.[0] || 'Untitled';
    const creator = artwork.dcCreator?.[0] || 'Unknown Artist';

    return (
        <section style={{
            height: '80vh',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem'
        }}>
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(4px) scale(1.05)',
                    zIndex: -1
                }}
            />

            <div style={{
                maxWidth: '1200px',
                width: '100%',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 1
            }}>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        color: 'var(--color-accent)',
                        fontWeight: '600',
                        letterSpacing: '4px',
                        fontSize: '0.9rem',
                        marginBottom: '1rem'
                    }}
                >
                    FEATURED MASTERPIECE
                </motion.span>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}
                >
                    {title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                    <div style={{ width: '40px', height: '1px', background: 'white' }} />
                    <p style={{ fontSize: '1.2rem', fontWeight: '300', fontStyle: 'italic' }}>
                        {creator}
                    </p>
                </motion.div>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                color: 'white',
                fontSize: '0.8rem',
                opacity: 0.6
            }}>
                Explore the digital archive of Europe's heritage
            </div>
        </section>
    );
};

export default Hero;
