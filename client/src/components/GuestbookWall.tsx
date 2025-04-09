import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import './GuestbookWall.css';
import { IconEntry } from '../types';

const GuestbookWall: React.FC = () => {
  const [entries, setEntries] = useState<IconEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/icons');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEntries(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guestbook entries:', err);
        setError('Failed to load guestbook entries. Please try again later.');
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) {
    return <div className="loading">Opening the guestbook...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <h2>Our Guestbook is Empty!</h2>
        <p>Be the first to sign our guestbook by contributing your icon.</p>
      </div>
    );
  }

  return (
    <div className="guestbook-wall">
      <div className="guestbook-header">
        <h2>Our Virtual Guestbook</h2>
        <p>Engineers who've been here and left their mark</p>
      </div>
      
      <div className="entries-grid">
        {entries.map((entry) => (
          <div key={entry.id} className="guestbook-entry">
            <div className="entry-header">
              <div className="entry-icon">
                <Icon svgContent={entry.svgContent} size="medium" />
              </div>
              <div className="entry-info">
                <h3>{entry.componentName}</h3>
                {entry.date && <div className="entry-date">Signed on {entry.date}</div>}
              </div>
            </div>
            
            <div className="entry-message">
              {entry.message}
            </div>
            
            <div className="icon-sizes">
              <div className="icon-size">
                <span>S</span>
                <Icon svgContent={entry.svgContent} size="small" />
              </div>
              <div className="icon-size">
                <span>M</span>
                <Icon svgContent={entry.svgContent} size="medium" />
              </div>
              <div className="icon-size">
                <span>L</span>
                <Icon svgContent={entry.svgContent} size="large" />
              </div>
              <div className="icon-size">
                <span>XL</span>
                <Icon svgContent={entry.svgContent} size="xlarge" />
              </div>
            </div>
            
            <div className="entry-footer">
              <div className="signature">~ {entry.contributor}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestbookWall;
