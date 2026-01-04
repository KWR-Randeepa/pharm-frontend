import React, { useEffect, useState } from 'react';
import './HealthNews.css';

const CARD_WIDTH = 400; // width of each card
const CARD_MARGIN = 20; // horizontal gap between cards
const VISIBLE_CARDS = 3; // cards visible on screen

const HealthNews = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_KEY = 'cb0d5a8905e040c08b73ffffb18d175a';
  const COUNTRY = 'us';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?category=health&country=${COUNTRY}&apiKey=${API_KEY}`
        );
        const data = await response.json();
        if (data.status === 'ok') {
          const validArticles = data.articles.filter(a => a.title && a.urlToImage);
          setArticles(validArticles);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % articles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [articles]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + articles.length) % articles.length);
  };

  // Determine visible articles
  const getVisibleArticles = () => {
    if (articles.length === 0) return [];
    const visible = [];
    for (let i = 0; i < VISIBLE_CARDS; i++) {
      const index = (currentIndex + i) % articles.length;
      visible.push(articles[index]);
    }
    return visible;
  };

  return (
    <div className="news-wrapper">
      <h2 className="section-caption">HEALTH NEWS</h2>

      <div className="news-carousel-container">
        <button className="nav-btn left-btn" onClick={prevSlide}>&#8592;</button>
        <div className="news-viewport">
          <div
            className="news-track"
            style={{
              width: `${articles.length * (CARD_WIDTH + CARD_MARGIN)}px`,
              transform: `translateX(-${currentIndex * (CARD_WIDTH + CARD_MARGIN)}px)`,
            }}
          >
            {articles.map((article, index) => (
              <div
                className="news-card"
                key={index}
                style={{ marginRight: `${CARD_MARGIN}px` }}
              >
                <img src={article.urlToImage} alt={article.title} className="news-image" />
                <h3 className="news-title">
                  {article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title}
                </h3>
                <p className="news-description">
                  {article.description
                    ? article.description.substring(0, 70) + '...'
                    : 'Click to read more about this topic.'}
                </p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
        <button className="nav-btn right-btn" onClick={nextSlide}>&#8594;</button>
      </div>
    </div>
  );
};

export default HealthNews;
