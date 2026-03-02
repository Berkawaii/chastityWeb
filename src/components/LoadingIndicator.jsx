import React from 'react';
import { motion } from 'framer-motion';

const LoadingIndicator = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10rem 0',
            width: '100%'
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--color-accent)',
                    borderRadius: '50%',
                    marginBottom: '1.5rem'
                }}
            />
            <p style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-accent)',
                letterSpacing: '2px',
                fontSize: '0.8rem'
            }}>
                CURATING MASTERPIECES
            </p>
        </div>
    );
};

export default LoadingIndicator;
