import { Link } from "react-router-dom";
import styles from "./Landing.module.css";
import { ArrowRight, Sparkles, Database, Users, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Landing() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.animatedBg}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
        <div className={styles.gridOverlay}></div>
      </div>
      
      <section className={styles.hero}>
        <div className={styles.badge}>
          <Sparkles className={styles.badgeIcon} size={16} />
          <span>ConsultantPro v1.0</span>
        </div>
        <h1 className={styles.title}>
          Gérez vos consultants<br />de façon <span className={styles.highlight}>efficace</span>
        </h1>
        <p className={styles.subtitle}>
          Une plateforme SaaS moderne conçue pour simplifier la gestion de vos talents, suivre les disponibilités en temps réel et piloter votre activité sans effort.
        </p>
        <div className={styles.heroActions}>
          <Link to="/add" className={styles.ctaButton}>
            Commencer maintenant
            <ArrowRight size={20} className={styles.ctaIcon} />
          </Link>
          <Link to="/consultants" className={styles.secondaryButton}>
            Voir le dashboard
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Une suite complète</h2>
          <p className={styles.sectionSubtitle}>Des outils pensés pour la productivité et la vitesse.</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Database size={24} /></div>
            <h3>Centralisation</h3>
            <p>Retrouvez toutes les informations de vos consultants et l'historique de leur disponibilité en un seul endroit.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><Users size={24} /></div>
            <h3>Disponibilité</h3>
            <p>Suivez facilement qui est sur le banc et qui est en mission grâce à nos indicateurs en temps réel.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.iconWrapper}><TrendingUp size={24} /></div>
            <h3>Simplicité extrême</h3>
            <p>Une interface claire, réactive et sans friction qui vous fait gagner des heures précieuses au quotidien.</p>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Comment ça marche</h2>
          <p className={styles.sectionSubtitle}>Déployez votre stratégie ressource en 3 étapes simples.</p>
        </div>
        
        <div className={styles.workflowGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>01</div>
            <h3>Créez un profil</h3>
            <p>Saisissez les informations clés : spécialités, contact et statuts de votre nouveau talent.</p>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>02</div>
            <h3>Mettez à jour</h3>
            <p>Adaptez les disponibilités et les missions avec fluidité lors de vos réunions de staffing.</p>
          </div>
          <div className={styles.stepConnector}></div>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>03</div>
            <h3>Pilotez</h3>
            <p>Prenez des décisions éclairées grâce à un dashboard toujours à jour et collaboratif.</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h2 className={styles.footerTitle}>Prêt à optimiser vos équipes ?</h2>
          <p className={styles.footerSubtitle}>Rejoignez les managers qui ont déjà transformé leur gestion.</p>
          <Link to="/add" className={`${styles.ctaButton} ${styles.footerCta}`}>
            Créer votre premier profil
            <ArrowRight size={20} className={styles.ctaIcon} />
          </Link>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ConsultantPro. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
