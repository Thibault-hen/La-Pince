export const fr = {
  home: {
    nav: {
      title: 'La Pince',
      contact: 'Nous contacter',
      features: 'Fonctionnalités',
      login: 'Connexion',
      register: 'Inscription',
      myspace: 'Mon espace',
    },
    hero: {
      title: 'Maîtrisez vos finances, simplement.',
      description:
        'Avec La Pince, suivez vos dépenses, gérez vos budgets et recevez des alertes avant les dépassements. Une application claire et efficace pour reprendre le contrôle de votre argent — dès aujourd’hui. Créez un compte gratuitement et commencez à économiser.',
    },
    card: {
      mainTitle: 'Reprenez le contrôle de vos dépenses',
      mainDescription:
        'Des centaines d’utilisateurs font confiance à La Pince pour mieux gérer leur budget',
      title1: 'Manque de visibilité',
      description1:
        'Sans outil dédié, il est difficile de savoir où part son argent, ce qui rend la gestion quotidienne stressante et approximative.',
      title2: 'Budgets rapidement dépassés',
      description2:
        'Sans suivi régulier et alertes, les utilisateurs dépassent involontairement leurs budgets et perdent le contrôle de leurs finances.',
      title3: 'Applications trop complexes',
      description3:
        'Beaucoup d’outils financiers sont surchargés de fonctionnalités, ce qui décourage les utilisateurs à les utiliser au quotidien.',
    },
    contact: {
      message: 'Une question sur notre solution ou notre entreprise ?',
      title: 'Contactez-nous',
      firstName: 'Nom',
      lastName: 'Prénom',
      email: 'Email',
      message2: 'Message',
      subject: 'Sujet',
      firstNamePlaceholder: 'Votre nom',
      lastNamePlaceholder: 'Votre prénom',
      emailPlaceholder: 'Votre email',
      subjectPlaceholder: 'Sélectionnez un sujet',
      messagePlaceholder: 'Votre message',
      sendButton: 'Envoyer',
      subject1: {
        title: 'Problème technique',
        value: 'issue',
      },
      subject2: {
        title: 'Feedbacks',
        value: 'feedback',
      },
      subject3: {
        title: 'Question sur les budgets',
        value: 'issue',
      },
      subject4: {
        title: 'Notification ou alertes',
        value: 'alert',
      },
    },
    footer: {
      title: 'La Pince',
      copyright: '© 2024 La Pince. Tous droits réservés.',
      product: 'Produit',
      productFonctionalities: 'Fonctionnalités',
      faqs: 'FAQs',
      links: 'Liens',
      links2: 'Contact',
      legal: 'Légal',
      confidentiality: 'Confidentialité',
      conditions: 'Conditions d’utilisation',
    },
  },
  expenses: {
    chart: {
      header: {
        title: 'Vos dépenses de ce mois',
        totalAmount: 'Montant total',
      },
    },
    table: {
      addButton: 'Ajouter une dépense',
      filterPlaceholder: 'Filter par titre...',
      noResults: 'Aucun résultat.',
      columns: {
        title: 'Titre',
        category: 'Categorie',
        date: 'Date',
        amount: 'Montant',
      },
      actions: {
        edit: 'Éditer',
        delete: 'Supprimer',
      },
    },
    add: {
      title: 'Créer une nouvelle dépense',
      description: 'Entre les informations de ta nouvelle dépense',
      form: {
        title: 'Titre',
        titlePlaceholder: 'Titre de votre dépense',
        amount: 'Montant',
        amountPlaceholder: '0',
        budget: 'Budget',
        budgetPlaceholder: 'Sélectionne un budget',
        budgetLabel: 'Budgets',
        date: 'Date',
        cancel: 'Annuler',
        create: 'Créer',
      },
    },
    edit: {
      title: 'Modifie ta dépense: {{title}}',
      description: 'Entre les nouvelles informations de ta dépense',
      form: {
        title: 'Titre',
        titlePlaceholder: 'Titre de votre dépense',
        amount: 'Montant',
        amountPlaceholder: '200',
        budget: 'Budget',
        budgetPlaceholder: 'Sélectionne un budget',
        budgetLabel: 'Budgets',
        date: 'Date',
        cancel: 'Annuler',
        update: 'Modifier',
      },
    },
    delete: {
      title: 'Supprimer une dépense',
      description: 'Tu veux vraiment supprimer ta dépense {{title}} de {{amount}} € ?',
      cancel: 'Annuler',
      confirm: 'Supprimer',
    },
    toast: {
      created: 'Ta dépense "{{title}}" a été créé',
      updated: 'Ta dépense a été mise à jour',
      deleted: 'Ta dépense a été supprimée',
      createError: 'Une erreur est survenue lors de la création de ta dépense',
      updateError: 'Une erreur est survenue lors de la mise à jour de ta dépense',
      deleteError: 'Une erreur est survenue lors de la suppression de ta dépense',
    },
  },
  sidebar: {
    dashboard: 'Tableau de bord',
    budgets: 'Budgets',
    expenses: 'Dépenses',
    categories: 'Catégories',
    settings: 'Paramètres',
    legalNotice: 'Mentions légales',
  },
  header: {
    greeting: 'Salut, {{name}} 👋',
  },
  budget: {
    page: {
      title: 'Mes budgets',
    },
    header: {
      title: 'Gestion des budgets',
      subtitle: 'Créez et gérez vos budgets',
      addButton: 'Ajouter un budget',
    },
    card: {
      spent: 'Dépensé',
      remaining: 'Restant',
      alert: 'Alerte à',
      edit: 'Éditer',
      delete: 'Supprimer',
    },
    cards: {
      totalBudget: 'Budget Total',
      activeBudgets: 'Budgets Actifs',
      remainingBudget: 'Budget Restant',
      used: 'Utilisé',
    },
    add: {
      title: 'Créer un nouveau budget',
      description: 'Entre les informations de ton nouveau budget',
      form: {
        amount: 'Montant',
        amountPlaceholder: '800',
        limitAlert: 'Alerte limite',
        limitAlertPlaceholder: '600',
        category: 'Categorie',
        categoryPlaceholder: 'Sélectionne une catégorie',
        categoryLabel: 'Catégories',
        cancel: 'Annuler',
        create: 'Créer',
      },
    },
    edit: {
      title: 'Modifie ton budget: {{title}}',
      description: 'Entre les nouvelles informations de ton budget',
      form: {
        amount: 'Montant',
        amountPlaceholder: '800',
        limitAlert: 'Alerte limite',
        limitAlertPlaceholder: '600',
        category: 'Categorie',
        categoryPlaceholder: 'Sélectionne une catégorie',
        categoryLabel: 'Catégories',
        cancel: 'Annuler',
        update: 'Modifier',
      },
    },
    delete: {
      title: 'Supprimer un budget',
      description: 'Tu veux vraiment supprimer ton budget {{title}} de {{amount}} ?',
      cancel: 'Annuler',
      confirm: 'Supprimer',
    },
    toast: {
      created: 'Ton budget {{title}} a été créé',
      updated: 'Ton budget {{title}} a été mis à jour',
      deleted: 'Ton budget a été supprimé',
      createError: 'Une erreur est survenue ou un autre budget appartient déjà à cette catégorie',
      updateError:
        'Une erreur est survenue lors de la mise à jour ou un autre budget appartient déjà à cette catégorie',
      deleteError:
        "Une erreur est survenue lors de la suppression de ton budget ou il n'existe plus",
    },
    chart: {
      title: "Vue d'ensemble des budgets",
      totalLabel: 'Budget total',
    },
  },
  category: {
    header: {
      title: 'Gestion des catégories',
      subtitle: 'Créez et gérez vos catégories',
      addButton: 'Ajouter une catégorie',
    },
    card: {
      edit: 'Éditer',
      delete: 'Supprimer',
      currentBudget: 'Budget en cours',
    },
    add: {
      title: 'Créer une nouvelle catégorie',
      description: 'Entre les informations de ta nouvelle catégorie',
      form: {
        title: 'Titre',
        titlePlaceholder: 'Titre de la catégorie',
        color: 'Couleur',
        colorPlaceholder: 'Sélectionne une couleur',
        colorLabel: 'Couleurs',
        cancel: 'Annuler',
        create: 'Créer',
      },
    },
    edit: {
      title: 'Modifie ta catégorie: {{title}}',
      description: 'Entre les nouvelles informations de ta catégorie',
      form: {
        title: 'Titre',
        titlePlaceholder: 'Titre de la catégorie',
        color: 'Couleur',
        colorPlaceholder: 'Sélectionne une couleur',
        colorLabel: 'Couleurs',
        cancel: 'Annuler',
        update: 'Modifier',
      },
    },
    delete: {
      title: 'Supprimer une catégorie',
      description: 'Tu veux vraiment supprimer ta catégorie {{title}} de {{total}} €?',
      cancel: 'Annuler',
      confirm: 'Supprimer',
    },
    toast: {
      created: 'Ta catégorie {{title}} a été créé',
      updated: 'Ta catégorie {{title}} a été mise à jour',
      deleted: 'Ta catégorie a été supprimé',
      createError: 'Une erreur est survenue ou cette catégorie existe déjà',
      updateError:
        'Une erreur est survenue lors de la mise à jour ou une autre catégorie porte le même nom',
      deleteError:
        "Une erreur est survenue lors de la suppression de ta catégorie ou elle n'existe plus",
    },
  },
  login: {
    title: 'Connexion',
    form: {
      email: 'Email',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      loginButton: 'Connexion',
      noAccount: "Vous n'avez pas encore de compte ?",
      registerLink: 'Inscrivez-vous gratuitement',
    },
    errorMessages: {
      credentials: 'Email ou mot de passe incorrect',
      tooManyAttempts: 'Trop de tentatives. Veuillez réessayer plus tard',
      error: 'Une erreur est survenue lors de la connexion. Veuillez réessayer',
      invalidEmail: 'Veuillez entrer une adresse email valide',
      invalidPassword: 'Le mot de passe doit comporter au moins 8 caractères',
    },
  },
  register: {
    title: 'Inscription',
    form: {
      email: 'Email',
      name: 'Nom',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      confirmPassword: 'Confirmez le mot de passe',
      registerButton: 'Inscription',
      alreadyHaveAccount: 'Vous avez déjà un compte ?',
      loginLink: 'Connectez-vous ici',
    },
    errorMessages: {
      emailExists: 'Un compte avec cet email existe déjà',
      tooManyAttempts: 'Trop de tentatives. Veuillez réessayer plus tard',
      error: "Une erreur est survenue lors de l'inscription. Veuillez réessayer",
      matchPassword: 'Les mot de passe ne correspondent pas',
      invalidName: 'Le nom doit comporter au moins 2 caractères',
    },
  },
  user: {
    resetPassword: {
      title: 'Réinitialiser le mot de passe',
      newPassword: 'Nouveau mot de passe',
      confirmPassword: 'Confirmer le mot de passe',
      resetButton: 'Réinitialiser le mot de passe',
      error: {
        default: 'Une erreur est survenue',
        invalid: 'Adresse email invalide',
        errorChar: 'Le mot de passe doit contenir au moins 8 caractères',
        errorMatch: 'Les mots de passe ne correspondent pas',
      },
    },
    sendResetPassword: {
      title: 'Envoyer un email de réinitialisation',
    },
  },
  account: {
    toast: {
      updated: 'Ton profil a été mis à jour',
      updateError: 'Une erreur est survenue lors de la mise à jour de ton profil',
      passwordUpdated: 'Ton mot de passe a été mis à jour',
      passwordUpdateError: 'Une erreur est survenue lors de la mise à jour de ton mot de passe',
    },
  },
};
