import '../styles/Home.css';
import ArticleCard from '../components/ArticleCard';
import { articles } from '../data/Articles';

const Home = () => {
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

export default Home;