import type { ArticleBlock, ArticleFigure, CaseArticle, Localized } from './portfolio';

const text = (en: string, fr: string): Localized => ({ en, fr });
const heading = (en: string, fr: string): ArticleBlock => ({ heading: text(en, fr) });
const paragraph = (en: string, fr: string): ArticleBlock => ({ paragraph: text(en, fr) });
// Match MaConformite’s scale: wide workspaces, smaller focused and portrait views.
const FIGURE_WIDTHS: Record<string, number> = {
  landing: 860,
  operations: 860,
  documents: 640,
  support: 560,
  'support-request': 560,
};

const figure = (name: string, width: number, height: number, alt: Localized, caption?: Localized, crop?: ArticleFigure['crop']): ArticleFigure => ({
  src: `assets/case-studies/ancora/${name}.png`, width, height, maxWidth: FIGURE_WIDTHS[name] ?? 860, plain: true, alt, caption, crop,
});

// Figma 160:28. Keep screenshot crops and the reading order from the source.
export const ANCORA_ARTICLE: CaseArticle = {
  slug: 'ancora',
  layout: 'service',
  eyebrow: text('CASE STUDY / PRODUCT DESIGN & DEVELOPMENT', 'ÉTUDE DE CAS / CONCEPTION PRODUIT ET DÉVELOPPEMENT'),
  title: text('Ancora — Making US LLC formation understandable from Morocco', 'Ancora — Rendre la création de LLC américaines compréhensible depuis le Maroc'),
  intro: text('From choosing a state to following a filing: bringing the questions, documents and next steps into one service.', 'Du choix d’un État au suivi du dossier : réunir les questions, les documents et les prochaines étapes dans un seul service.'),
  role: text('Angular · Spring Boot · PostgreSQL / Live client platform', 'Angular · Spring Boot · PostgreSQL / Plateforme client en ligne'),
  hero: figure('landing', 3600, 2338,
    text('Ancora landing page with its formation offer and illustrative product preview.', 'Page d’accueil Ancora avec son offre de création et un aperçu illustratif du produit.'),
    text('01 / Actual Ancora landing page. The product preview is illustrative content from the website, not a live customer dashboard.', '01 / Véritable page d’accueil Ancora. L’aperçu produit est une illustration du site, et non un tableau de bord client réel.'),
    { frameWidth: 866, frameHeight: 544, background: 'transparent', left: -0.05, top: -3.49, width: 100.1, height: 103.49 }),
  sections: [
    {
      title: text('Before writing code, I studied the service', 'Avant de coder, j’ai étudié le service'),
      paragraphs: [text('I started from two perspectives: the cost of delivering an LLC service and the experience of finding one as a founder in Casablanca. Those checks shaped Ancora’s scope, pricing and language.', 'Je suis parti de deux perspectives : le coût de prestation d’un service de création de LLC et l’expérience d’un fondateur à Casablanca qui en cherche un. Ces vérifications ont orienté le périmètre, les tarifs et le langage d’Ancora.')],
      blocks: [
        heading('01 / Compare the provider-side costs', '01 / Comparer les coûts des prestataires'),
        paragraph('I compared registered-agent and formation costs at Harbor Compliance, Bizee and Northwest for New Mexico and Wyoming. That comparison led me to focus on those two states and use a cost-plus pricing model.', 'J’ai comparé les coûts d’agent enregistré et de création chez Harbor Compliance, Bizee et Northwest pour le Nouveau-Mexique et le Wyoming. Cette comparaison m’a conduit à me concentrer sur ces deux États et à fixer les prix à partir des coûts, avec une marge.'),
        heading('02 / Search as a founder in Casablanca', '02 / Chercher comme un fondateur à Casablanca'),
        paragraph('I searched in French and English. The results I found were US-wide providers or Fiverr gigs. I did not find an offer that addressed the Office des Changes, the CIN or costs in dirhams.', 'J’ai cherché en français et en anglais. Les résultats étaient des prestataires américains généralistes ou des services sur Fiverr. Je n’ai pas trouvé d’offre abordant l’Office des Changes, la CIN ou les coûts en dirhams.'),
        heading('What this changed in Ancora', 'Ce que cela a changé dans Ancora'),
        paragraph('I focused the service on Wyoming and New Mexico and built around Moroccan founders: prices in dirhams, guidance in familiar languages and document collection that accommodates the CIN. The product also separates formation from banking assistance, so founders can see what the service handles and what still depends on a provider’s decision.', 'J’ai centré le service sur le Wyoming et le Nouveau-Mexique, autour des fondateurs marocains : prix en dirhams, accompagnement dans des langues familières et collecte de documents acceptant la CIN. Le produit distingue aussi la création de société de l’assistance bancaire, pour préciser ce que le service prend en charge et ce qui dépend encore de la décision d’un prestataire.'),
      ],
    },
    {
      title: text('01 / Explain what is available after payment', '01 / Expliquer ce qui est disponible après le paiement'), paragraphs: [],
      blocks: [
        heading('Difficulty', 'Difficulté'),
        paragraph('A founder who has paid may expect every document immediately. An empty library needs to explain whether something is missing or the filing has not reached that stage yet.', 'Un fondateur qui a payé peut s’attendre à recevoir tous les documents immédiatement. Une bibliothèque vide doit expliquer s’il manque quelque chose ou si le dossier n’a pas encore atteint cette étape.'),
        heading('Solution', 'Solution'),
        paragraph('Give official documents a dedicated place and explain when they will appear. The signed-in library names the Articles of Organization, Operating Agreement and EIN letter, and states that they become available once ready.', 'Réserver un espace aux documents officiels et expliquer quand ils apparaîtront. La bibliothèque connectée nomme les Articles of Organization, l’Operating Agreement et la lettre EIN, et précise qu’ils seront disponibles une fois prêts.'),
        { figure: figure('documents', 1754, 1429, text('Signed-in document library explaining when formation documents become available.', 'Bibliothèque connectée expliquant quand les documents de création seront disponibles.')) },
        heading('Decision and trade-off', 'Décision et compromis'),
        paragraph('A clear empty state sets expectations before the first document is published. It still needs to stay consistent with actual fulfillment and document-publication rules.', 'Un état vide clair fixe les attentes avant la publication du premier document. Il doit rester cohérent avec les règles réelles de traitement et de publication des documents.'),
      ],
    },
    {
      title: text('02 / Explain what is happening while people wait', '02 / Expliquer ce qui se passe pendant l’attente'), paragraphs: [],
      blocks: [
        heading('Difficulty', 'Difficulté'),
        paragraph('State filing, an EIN request and banking review have different owners and timelines. A single “in progress” label cannot tell the founder whether to act or wait.', 'Le dépôt auprès de l’État, la demande d’EIN et l’examen bancaire ont des responsables et des délais différents. Un simple statut « en cours » ne dit pas au fondateur s’il doit agir ou attendre.'),
        heading('Solution', 'Solution'),
        paragraph('Show dated activity, available documents and the next action. Internally, track individual fulfillment tasks and give paused cases a reason. Keep bank application review separate from the LLC’s formation status.', 'Afficher l’activité datée, les documents disponibles et la prochaine action. En interne, suivre chaque tâche de traitement et indiquer la raison des pauses. Séparer l’examen bancaire du statut de création de la LLC.'),
        { figure: figure('operations', 3600, 2338, text('Operations workspace with case activity, documents and fulfillment tasks.', 'Espace opérations avec activité du dossier, documents et tâches de traitement.'), undefined, { frameWidth: 866, frameHeight: 544, background: 'transparent', left: 0, top: -3.45, width: 100, height: 103.45 }) },
        heading('Decision and trade-off', 'Décision et compromis'),
        paragraph('More detailed states require consistent rules in the back office. The benefit depends on operators recording progress and missing information promptly.', 'Des statuts plus détaillés exigent des règles cohérentes dans le back-office. Leur utilité dépend de la saisie rapide des avancées et des informations manquantes par les opérateurs.'),
      ],
    },
    {
      title: text('03 / Give questions a clear place to go', '03 / Donner aux questions un point d’entrée clair'), paragraphs: [],
      blocks: [
        heading('Difficulty', 'Difficulté'),
        paragraph('A founder can get stuck on a state choice, a document request or a banking question. If each answer lives in a separate email, it is harder to connect the question to the case.', 'Un fondateur peut bloquer sur le choix d’un État, une demande de document ou une question bancaire. Si chaque réponse reste dans un e-mail séparé, il devient plus difficile de relier la question au dossier.'),
        heading('Solution', 'Solution'),
        paragraph('Provide self-service explanations and a visible contact route. The client workspace organizes support requests by topic; the operations team has an assignee, conversation history and a request status. Email notifications bring the founder back when action is needed.', 'Proposer des explications en libre-service et un contact visible. L’espace client classe les demandes par sujet ; l’équipe dispose d’un responsable, de l’historique des échanges et d’un statut. Les notifications par e-mail ramènent le fondateur lorsqu’une action est nécessaire.'),
        { figure: figure('support', 879, 1071, text('Authenticated support workspace with guides, frequently asked questions and request history.', 'Espace d’assistance connecté avec guides, questions fréquentes et historique des demandes.'), text('04 / Authenticated support workspace: guide search, common questions, email support and the client’s request history in one place.', '04 / Espace d’assistance connecté : recherche de guides, questions fréquentes, assistance par e-mail et historique des demandes du client au même endroit.')) },
        heading('Decision and trade-off', 'Décision et compromis'),
        { figure: figure('support-request', 879, 1071, text('Unsubmitted support request form with subject, topic, message and attachments.', 'Formulaire de demande d’assistance non envoyé avec objet, sujet, message et pièces jointes.'), text('05 / New request form: subject, topic, message and attachments give the team context. This is an unsubmitted form; no support message was sent.', '05 / Nouvelle demande : objet, sujet, message et pièces jointes donnent le contexte à l’équipe. Ce formulaire n’a pas été soumis ; aucun message n’a été envoyé.'), { frameWidth: 866, frameHeight: 806, background: 'transparent', left: 0, top: -13.16, width: 100, height: 130.91 }) },
        paragraph('Human support remains necessary for exceptions. Structured requests help preserve context, but they still need clear ownership and timely replies.', 'L’assistance humaine reste nécessaire pour les exceptions. Les demandes structurées préservent le contexte, mais exigent un responsable clairement identifié et des réponses dans les délais.'),
      ],
    },
    {
      title: text('04 / Avoid a paid dead end', '04 / Éviter une impasse après paiement'), paragraphs: [],
      blocks: [
        heading('Difficulty', 'Difficulté'),
        paragraph('A formation package may include banking assistance that is unavailable for an owner’s residence. Discovering this after checkout creates rework and a difficult support conversation.', 'Un pack de création peut inclure une assistance bancaire indisponible dans le pays de résidence d’un associé. Le découvrir après paiement oblige à reprendre le dossier et complique les échanges avec l’assistance.'),
        heading('Solution', 'Solution'),
        paragraph('Ask for the country of residence before payment and refuse packs that include an account the owner cannot open. If a bank declines the application, keep the case open until an alternative or refund is handled. After five business days without an answer, remind the client and the team. The banking provider still makes the approval decision.', 'Demander le pays de résidence avant le paiement et refuser les packs incluant un compte que l’associé ne peut pas ouvrir. Si une banque refuse la demande, garder le dossier ouvert jusqu’au traitement d’une alternative ou d’un remboursement. Après cinq jours ouvrés sans réponse, relancer le client et l’équipe. La décision d’approbation appartient toujours au prestataire bancaire.'),
        heading('Expected benefit', 'Bénéfice attendu'),
        paragraph('Earlier eligibility checks should reduce avoidable paid cases and refund conversations. That is a product hypothesis, not a measured result.', 'Des contrôles d’éligibilité plus précoces devraient réduire les dossiers payés évitables et les échanges sur les remboursements. Il s’agit d’une hypothèse produit, pas d’un résultat mesuré.'),
      ],
    },
    {
      title: text('Engineering the handoffs', 'Développer les relais entre équipes'),
      paragraphs: [text('Angular connects the public site, founder dashboard and internal tools. Spring Boot owns the application workflow, permissions and payment logic, with PostgreSQL storing the shared records.', 'Angular relie le site public, le tableau de bord fondateur et les outils internes. Spring Boot gère le parcours de demande, les permissions et la logique de paiement ; PostgreSQL stocke les données partagées.')],
      blocks: [
        { panel: [
          { title: text('Angular interfaces', 'Interfaces Angular'), body: text('Public website · Client workspace · Back office', 'Site public · Espace client · Back-office') },
          { title: text('Spring Boot API + PostgreSQL', 'API Spring Boot + PostgreSQL'), body: text('Applications · Role-based access · Payments · Service orders', 'Demandes · Accès par rôle · Paiements · Commandes de services') },
          { title: text('Supporting services', 'Services complémentaires'), body: text('RabbitMQ → Java notification service\nPython document service → Generated PDFs\nStripe → Payments and webhooks', 'RabbitMQ → Service de notifications Java\nService documentaire Python → PDF générés\nStripe → Paiements et webhooks') },
        ] },
        heading('Keep rules behind the interface', 'Garder les règles derrière l’interface'),
        paragraph('Eligibility checks happen at submission and checkout. Fulfillment tracks each pack item separately. Document review and publication are distinct steps, so an uploaded file does not automatically become a client deliverable.', 'Les contrôles d’éligibilité interviennent à la soumission et au paiement. Le traitement suit chaque élément du pack séparément. La vérification et la publication des documents sont distinctes : un fichier importé ne devient pas automatiquement un livrable client.'),
        heading('Design for the work after submission', 'Concevoir le travail après la soumission'),
        paragraph('Operations can request corrections, pause a case with a reason and track assisted account opening. A provider decline keeps the task open until the team handles an alternative or refund.', 'Les opérations peuvent demander des corrections, suspendre un dossier avec un motif et suivre l’ouverture de compte accompagnée. Un refus du prestataire laisse la tâche ouverte jusqu’au traitement d’une alternative ou d’un remboursement.'),
      ],
    },
    {
      title: text('What I would validate next', 'Ce que je validerais ensuite'),
      paragraphs: [text('The portfolio currently describes Ancora as preparing for launch. This case study presents the implementation and its design rationale; measured user outcomes are still to be established.', 'Le portfolio présente actuellement Ancora comme étant en préparation de lancement. Cette étude décrit l’implémentation et les choix de conception ; les résultats mesurés auprès des utilisateurs restent à établir.')],
      blocks: [
        heading('Application clarity', 'Clarté de la demande'),
        paragraph('Observe whether founders choose an eligible pack, complete member details and recover from validation errors. Track completion, abandonment by step and requests for help.', 'Observer si les fondateurs choisissent un pack éligible, complètent les informations des associés et corrigent les erreurs de validation. Suivre la complétion, l’abandon par étape et les demandes d’aide.'),
        heading('Operational clarity', 'Clarté opérationnelle'),
        paragraph('Ask an operator to identify a blocked case, explain the blocker and resolve a document correction. Measure time to the next useful action and unnecessary handoffs.', 'Demander à un opérateur d’identifier un dossier bloqué, d’expliquer le blocage et de résoudre une correction documentaire. Mesurer le délai avant la prochaine action utile et les relais inutiles.'),
        heading('Ongoing compliance', 'Conformité dans la durée'),
        paragraph('Check whether founders can distinguish a filing handled by Ancora, an automatic renewal and a reminder-only obligation. Those responsibilities should be clear before a deadline arrives.', 'Vérifier si les fondateurs distinguent une déclaration prise en charge par Ancora, un renouvellement automatique et une obligation faisant uniquement l’objet d’un rappel. Ces responsabilités doivent être claires avant l’échéance.'),
        heading('What I learned', 'Ce que j’ai appris'),
        paragraph('Building across the client and operations interfaces makes the dependencies visible. A useful progress tracker needs the same definitions as the fulfillment workflow. A clear dashboard starts with clear ownership in the underlying service.', 'Développer les interfaces client et opérations rend les dépendances visibles. Un suivi de progression utile doit employer les mêmes définitions que le traitement des dossiers. Un tableau de bord clair commence par des responsabilités claires dans le service sous-jacent.'),
      ],
    },
  ],
};
