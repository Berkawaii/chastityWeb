import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Landmark, User, Calendar, MapPin, Info } from 'lucide-react';
import { getArtworkDetail } from '../services/europeanaApi';
import LoadingIndicator from './LoadingIndicator';

const ArtDetail = ({ id, isOpen, onClose }) => {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && isOpen) {
            const fetchDetail = async () => {
                setLoading(true);
                try {
                    const data = await getArtworkDetail(id);
                    setDetail(data.object);
                } catch (error) {
                    console.error("Error fetching detail:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDetail();
        }
    }, [id, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(248, 247, 242, 0.98)',
                    zIndex: 2000,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        background: 'var(--color-text)',
                        color: 'white',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2100,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    <X size={24} />
                </button>

                {loading ? (
                    <LoadingIndicator />
                ) : detail ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', padding: '6rem 2rem 4rem' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '4rem',
                            maxWidth: '1200px',
                            margin: '0 auto',
                            width: '100%'
                        }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                    borderRadius: '2px',
                                    background: 'white',
                                    padding: '2rem'
                                }}
                            >
                                <img
                                    src={detail.proxies?.[0]?.['edm:preview']?.[0] || detail.aggregations?.[0]?.['edm:isShownBy']?.[0]}
                                    alt={detail.proxies?.[0]?.['dc:title']?.[0]}
                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                />
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '1rem' }}>
                                        {detail.proxies?.[0]?.['dc:title']?.[0] || 'Untitled'}
                                    </h2>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-accent)', fontWeight: '500' }}>
                                        <User size={18} />
                                        <span>{detail.proxies?.[0]?.['dc:creator']?.[0] || 'Unknown Artist'}</span>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '1.5rem',
                                    padding: '2rem 0',
                                    borderTop: '1px solid var(--color-border)',
                                    borderBottom: '1px solid var(--color-border)'
                                }}>
                                    <DetailItem icon={<Calendar size={18} />} label="Year" value={detail.proxies?.[0]?.['dc:date']?.[0]} />
                                    <DetailItem icon={<Landmark size={18} />} label="Museum" value={detail.aggregations?.[0]?.['edm:dataProvider']?.[0]} />
                                    <DetailItem icon={<MapPin size={18} />} label="Country" value={detail.proxies?.[0]?.['edm:country']?.[0]} />
                                    <DetailItem icon={<Info size={18} />} label="Type" value={detail.proxies?.[0]?.['dc:type']?.[0]} />
                                </div>

                                {detail.proxies?.[0]?.['dc:description'] && (
                                    <div>
                                        <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-text-muted)' }}>Description</h4>
                                        <p style={{ color: 'var(--color-text-muted)' }}>
                                            {detail.proxies?.[0]?.['dc:description']?.[0]}
                                        </p>
                                    </div>
                                )}

                                <a
                                    href={detail.aggregations?.[0]?.['edm:isShownAt']?.[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'var(--color-text)',
                                        color: 'white',
                                        padding: '1rem 2rem',
                                        width: 'fit-content',
                                        fontSize: '0.9rem',
                                        fontWeight: '500',
                                        borderRadius: '2px'
                                    }}
                                >
                                    View on Source <ExternalLink size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '10rem' }}>Failed to load detail.</div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

const DetailItem = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                {icon} <span>{label}</span>
            </div>
            <span style={{ fontWeight: '500' }}>{value}</span>
        </div>
    );
};

export default ArtDetail;
