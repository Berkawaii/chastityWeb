import React from 'react';
import { motion } from 'framer-motion';

const ArtCard = ({ item, index, onClick }) => {
    const imageUrl = item.edmPreview?.[0] || 'https://via.placeholder.com/400x500?text=No+Preview';
    const title = item.title?.[0] || 'Untitled';
    const creator = item.dcCreator?.[0] || 'Unknown Artist';
    const dataProvider = item.dataProvider?.[0] || 'Library/Museum';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ y: -10 }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer'
            }}
        >
            <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '125%', // 4:5 aspect ratio
                overflow: 'hidden',
                borderRadius: '2px',
                background: '#eee',
                boxShadow: 'var(--shadow-soft)'
            }}>
                <motion.img
                    src={imageUrl}
                    alt={title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '2rem 1rem 1rem',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
                    color: 'white',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                }} className="card-overlay">
                    <span style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>{dataProvider}</span>
                </div>
            </div>

            <div>
                <h4 style={{
                    fontSize: '1.1rem',
                    marginBottom: '0.2rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {title}
                </h4>
                <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                    fontStyle: 'italic'
                }}>
                    {creator}
                </p>
            </div>

            <style>{`
        div:hover .card-overlay {
          opacity: 1;
        }
      `}</style>
        </motion.div>
    );
};

export default ArtCard;
