import '../styles/Home.css';

const Home = () => {
  const articles = [
    {
      id: 1,
      title: 'Article 1',
      content: 'This is the content of article 1.',
    },
    {
      id: 2,
      title: 'Article 2',
      content: 'This is the content of article 2.',
    },
    {
      id: 3,
      title: 'Article 3',
      content: 'This is the content of article 3.',
    },
  ]

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Medium Clone</h1>
        <p>Explore articles, stories, and ideas from the community.</p>
      </header>

      <main className="home-main">
        {articles.length > 0 ? (
          <div className="articles-list">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p>Loading articles...</p>
        )}
      </main>
    </div>
  )
}

import PropTypes from 'prop-types';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default Home;