import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <section className="hero">
        <h1>Gérez vos consultants de façon efficace</h1>
        <p>Une solution simple et puissante pour piloter votre activité.</p>
        <Link to="/add" className="btn btn-primary">
          Commencer maintenant
        </Link>
      </section>

      <section className="features">
        <h2>Nos fonctionnalités</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Centralisation</h3>
            <p>Retrouvez toutes les informations de vos consultants en un seul endroit.</p>
          </div>
          <div className="feature-card">
            <h3>Disponibilité</h3>
            <p>Suivez facilement qui est disponible pour de nouvelles missions.</p>
          </div>
          <div className="feature-card">
            <h3>Simplicité</h3>
            <p>Une interface claire et intuitive pour gagner du temps au quotidien.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>Comment ça marche</h2>
        <div className="step-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Créez un profil</h3>
            <p>Ajoutez rapidement un nouveau consultant dans la base de données.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Gérez les infos</h3>
            <p>Mettez à jour les spécialités et la disponibilité en un clic.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Pilotez</h3>
            <p>Ayez une vue d'ensemble claire pour vos futures missions.</p>
          </div>
        </div>
      </section>

      <div className="call-to-action">
        <Link to="/add" className="btn btn-secondary">
          Ajouter votre premier consultant
        </Link>
      </div>
    </div>
  );
}
