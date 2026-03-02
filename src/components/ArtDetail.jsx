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

    // Helper to extract value from language-keyed objects or arrays
    const getLangValue = (obj) => {
        if (!obj) return null;
        if (Array.isArray(obj)) return obj[0];
        if (typeof obj === 'string') return obj;

        // Priority: en -> def -> sv -> any first key
        return obj.en?.[0] || obj.def?.[0] || obj.sv?.[0] || Object.values(obj)[0]?.[0] || null;
    };

    // Helper to find field across all proxies (checking both camelCase and colon-based keys)
    const getField = (camelKey, colonKey) => {
        if (!detail?.proxies) return null;
        for (const proxy of detail.proxies) {
            const val = proxy[camelKey] || proxy[colonKey];
            if (val) {
                const result = getLangValue(val);
                if (result) return result;
            }
        }
        return null;
    };

    const title = getField('dcTitle', 'dc:title') || 'Untitled';
    const creator = getField('dcCreator', 'dc:creator') || 'Unknown Artist';
    const year = getField('dcDate', 'dc:date');
    const description = getField('dcDescription', 'dc:description');
    const type = getField('dcType', 'dc:type');
    const country = getField('edmCountry', 'edm:country');

    // Image resolution priority (Record API specific paths)
    const imageUrl =
        detail?.aggregations?.[0]?.edmIsShownBy ||
        detail?.aggregations?.[0]?.edmObject ||
        detail?.aggregations?.[0]?.['edm:isShownBy']?.[0] ||
        detail?.aggregations?.[0]?.['edm:hasView']?.[0] ||
        getField('edmPreview', 'edm:preview');

    const provider = detail?.aggregations?.[0]?.edmDataProvider?.[0] ||
        detail?.aggregations?.[0]?.['edm:dataProvider']?.[0] ||
        detail?.aggregations?.[0]?.edmInstitutionName?.[0] ||
        getLangValue(detail?.aggregations?.[0]?.edmDataProvider);

    const sourceUrl = getLangValue(detail?.aggregations?.[0]?.edmIsShownAt) ||
        getLangValue(detail?.aggregations?.[0]?.['edm:isShownAt']) ||
        detail?.aggregations?.[0]?.edmIsShownAt?.[0];

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
                                    padding: '2rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '400px'
                                }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={title}
                                    style={{ maxWidth: '100%', maxHeight: '70vh', display: 'block' }}
                                />
                            </motion.div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <h2 style={{ fontSize: '3rem', lineHeight: 1.2, marginBottom: '1rem' }}>
                                        {title}
                                    </h2>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-accent)', fontWeight: '500' }}>
                                        <User size={18} />
                                        <span>{creator}</span>
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
                                    <DetailItem icon={<Calendar size={18} />} label="Year" value={year} />
                                    <DetailItem icon={<Landmark size={18} />} label="Museum" value={provider} />
                                    <DetailItem icon={<MapPin size={18} />} label="Country" value={country} />
                                    <DetailItem icon={<Info size={18} />} label="Type" value={type} />
                                </div>

                                {description && (
                                    <div>
                                        <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'var(--color-text-muted)' }}>Description</h4>
                                        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                                            {description}
                                        </p>
                                    </div>
                                )}

                                <a
                                    href={sourceUrl}
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
