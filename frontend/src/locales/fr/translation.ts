import { description } from '@/components/budget/BudgetChart';

export const fr = {
	home: {
		nav: {
			title: 'La Pince',
			contact: 'Nous contacter',
			features: 'Fonctionnalités',
			login: 'Connexion',
			register: 'Inscription',
			dashboard: 'Tableau de bord',
		},
		hero: {
			preview: 'Aperçu',
			badge: 'Finance personnelle moderne',
			cta: 'Commencer maintenant',
			title: 'Maîtrisez vos finances, simplement.',
			description:
				'Avec La Pince, suivez vos dépenses, gérez vos budgets et recevez des alertes avant les dépassements. Une application claire et efficace pour reprendre le contrôle de votre argent, dès aujourd’hui. Créez un compte gratuitement et commencez à économiser.',
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
	currencySelector: {
		errorTitle: 'Oups',
		error:
			'Impossible de récupérer les taux de change actuels. Les conversions de devises ne sont pas disponibles pour le moment.',
	},
	currency: {
		toast: {
			updated: 'Votre devise a été mise à jour avec {{currency}}',
			error: 'Une erreur est survenue lors de la mise à jour de ta devise',
		},
		select: 'Selectionne ta devise',
	},
	income: {
		toast: {
			updated: 'Votre revenu a été mis à jour avec {{value}}',
			error: 'Une erreur est survenue lors de la mise à jour de votre revenu',
		},
		modal: {
			errorValue: 'Le montant de votre revenu doit être supérieur à 0',
		},
	},
	dashboard: {
		header: {
			title: 'Tableau de bord',
			subtitle: "Vue d'ensemble de mes finances",
			addButton: 'Mettre à jour mon revenu',
		},
		edit: {
			title: 'Modifie ton revenu',
			description: 'Entre le nouveau montant de ton revenu',
			form: {
				amount: 'Montant',
				cancel: 'Annuler',
				update: 'Modifier',
			},
		},
		overallCard: {
			totalSpent: 'Dépenses totales ce mois-ci',
			ok: 'Tes dépenses sont sous contrôle',
			careful: 'Attention à tes dépenses',
			warning: 'Tu as dépensé plus que ton revenu ce mois-ci',
			expensePercentage:
				'Vous avez dépensé {{percentage}} de vos revenus ce mois-ci',
			updateYourIncome: 'Mets à jour ton revenu pour voir ta progression',
			used: 'utilisé',
		},
		chart: {
			title: 'Dépenses totales des 6 derniers mois',
			total: 'Montant total',
			average: 'Moyenne',
			expenses: 'Montant',
		},
		overallCards: {
			spentToday: 'Dépensé aujourd’hui',
			spentLast7Days: 'Dépensé au cours des 7 derniers jours',
			spentLastMonth: 'Dépensé le mois dernier',
			averageSpent: 'Dépense moyenne par mois',
		},
		cards: {
			totalIncome: 'Revenu total',
			remaining: 'Reste ce mois-ci',
			totalBudgets: 'Budgets totaux',
			income: 'Revenu',
			totalBudget: 'Budget total',
			remaining2: 'Restant',
			expenses: 'Dépenses',
		},
		last10Expenses: {
			title: 'Dernières dépenses',
			subTitle: 'Vos 10 dernières dépenses',
			totalExpense: 'Dépenses totales',
			today: 'Aujourd’hui',
			isYesterday: 'Hier',
			seeMore: 'Voir toutes mes dépenses',
			noExpenses1: 'Aucune dépense enregistrée',
			noExpenses2: 'Ajoutez-en pour suivre ta progression.',
		},
	},
	expenses: {
		header: {
			title: 'Dépenses',
			subtitle: 'Gérer mes dépenses',
			addButton: 'Ajouter une dépense',
		},
		chart: {
			header: {
				title: 'Vos dépenses de ce mois',
				totalAmount: 'Montant total',
			},
			noExpensesThisMonth1: 'Aucune dépense enregistrée ce mois-ci',
			noExpensesThisMonth2: 'Ajoute-en une pour suivre ta progression',
		},
		table: {
			addButton: 'Ajouter une dépense',
			filterPlaceholder: 'Filter par titre',
			noResults: 'Aucun résultat.',
			columns: {
				title: 'Titre',
				category: 'Categorie',
				date: 'Date',
				amount: 'Montant',
			},
			next: 'Suivant',
			previous: 'Précédent',
			actions: {
				edit: 'Éditer',
				delete: 'Supprimer',
			},
			singularCount: 'dépense',
			pluralCount: 'dépenses',
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
			description:
				'Tu veux vraiment supprimer ta dépense {{title}} de {{amount}} € ?',
			cancel: 'Annuler',
			confirm: 'Supprimer',
		},
		toast: {
			created: 'Ta dépense "{{title}}" a été créé',
			updated: 'Ta dépense a été mise à jour',
			deleted: 'Ta dépense a été supprimée',
			createError: 'Une erreur est survenue lors de la création de ta dépense',
			updateError:
				'Une erreur est survenue lors de la mise à jour de ta dépense',
			deleteError:
				'Une erreur est survenue lors de la suppression de ta dépense',
		},
		uncategorized: 'Non catégorisée',
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
			title: 'Budgets',
			subtitle: 'Gérer mes budgets',
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
			description:
				'Tu veux vraiment supprimer ton budget {{title}} de {{amount}} ?',
			cancel: 'Annuler',
			confirm: 'Supprimer',
		},
		toast: {
			created: 'Ton budget {{title}} a été créé',
			updated: 'Ton budget {{title}} a été mis à jour',
			deleted: 'Ton budget a été supprimé',
			noCategory: 'Cette catégorie n’existe pas',
			categoryAlreadyUsed:
				'Cette catégorie est déjà utilisée par un autre budget',
			limitTooHigh:
				'Le montant de l’alerte limite ne peut pas être supérieur au montant du budget',
			tooManyAttempts: 'Trop de tentatives. Veuillez réessayer plus tard',
			createError: 'Une erreur est survenue lors de la création de ton budget',
			updateError:
				'Une erreur est survenue lors de la mise à jour de ton budget',
			deleteError:
				'Une erreur est survenue lors de la suppression de ton budget',
		},
		chart: {
			title: "Vue d'ensemble des budgets",
			totalLabel: 'Budget total',
			noBudgets1: 'Aucune budget trouvée',
			noBudgets2: 'Ajoute-en un pour commencer',
		},
	},
	categories: {
		header: {
			title: 'Catégories',
			subtitle: 'Gérer mes catégories',
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
			description:
				'Tu veux vraiment supprimer ta catégorie {{title}} de {{total}} €?',
			cancel: 'Annuler',
			confirm: 'Supprimer',
		},
		toast: {
			created: 'Ta catégorie {{title}} a été créé',
			updated: 'Ta catégorie {{title}} a été mise à jour',
			deleted: 'Ta catégorie a été supprimé',
			categoryAlreadyExist: 'Cette catégorie existe déjà',
			createError:
				'Une erreur est survenue lors de la création de ta catégorie',
			updateError:
				'Une erreur est survenue lors de la mise à jour de ta catégorie',
			deleteError:
				'Une erreur est survenue lors de la suppression de ta catégorie',
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
			error:
				"Une erreur est survenue lors de l'inscription. Veuillez réessayer",
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
		delete: {
			modal: {
				title: 'Supprimer le compte',
				description:
					'Tu veux vraiment supprimer ton compte ? Cette action est irréversible.',
				cancel: 'Annuler',
				confirm: 'Supprimer',
				confirmPassword: 'Confirmer le mot de passe',
				wrongPassword: 'Le mot de passe actuel est incorrect',
				tooManyAttempts: 'Trop de tentatives, veuillez réessayer plus tard',
				error: 'Une erreur est survenue lors de la suppression de ton compte',
			},
			header: {
				title: 'Supprimer le compte',
				subtitle: 'Supprimer définitivement ton compte',
			},
			list: {
				item1: 'Toutes tes données seront définitivement supprimées',
				item2: 'Tu perdras l’accès à tes budgets et dépenses',
				item3: 'Cette action est irréversible',
			},
			button: 'Supprimer mon compte',
		},
		header: {
			title: 'Paramètre du compte',
			subtitle: 'Gérez mes informations personnelles',
		},
		profile: {
			title: 'Paramètres du profil',
			description:
				'Modifie les informations d’identification de ton compte et préférences',
			form: {
				name: 'Nom',
				email: 'Email',
				favoriteCurrency: 'Devise préférée',
				alert: 'Alerte de budget',
				alertDescription:
					'Recevoir des notifications lorsque tu approches de tes limites',
				saveButton: 'Enregistrer les modifications',
			},
		},
		security: {
			title: 'Sécurité',
			description: 'Modifiez votre mot de passe',
			form: {
				currentPassword: 'Mot de passe actuel',
				newPassword: 'Nouveau mot de passe',
				confirmNewPassword: 'Confirmer le nouveau mot de passe',
				changePasswordButton: 'Modifier le mot de passe',
			},
		},
		menu: {
			profile: 'Profil',
			disconnect: 'Déconnexion',
		},
		toast: {
			updated: 'Ton profil a été mis à jour',
			updateProfileError:
				'AUne erreur est survenue lors de la mise à jour de ton profil',
			updatePasswordError:
				'Une erreur est survenue lors de la mise à jour de ton mot de passe',
			passwordUpdated: 'Ton mot de passe a été mis à jour',
			wrongPassword: 'Le mot de passe actuel est incorrect',
			emailAlreadyUsed: 'Cet email est déjà utilisé par un autre compte',
			deleted: 'Ton compte a été supprimé',
			deleteError:
				'Une erreur est survenue lors de la suppression de ton compte',
		},
	},
	color: {
		red: 'Rouge',
		green: 'Vert',
		blue: 'Bleu',
		yellow: 'Jaune',
		violet: 'Violet',
		orange: 'Orange',
		pink: 'Rose',
		teal: 'Sarcelle',
		indigo: 'Indigo',
		gray: 'Gris',
		quentin: 'Quentin 🦩',
	},
	category: {
		bills: 'Factures',
		transport: 'Transport',
		entertainment: 'Loisirs',
		health: 'Santé',
		shopping: 'Shopping',
		food: 'Alimentation',
		other: 'Autres',
		sport: 'Sport',
		houseRent: 'Loyer',
		subscriptions: 'Abonnements',
		pet: 'Animaux de compagnie',
		education: 'Éducation',
		defaultTitle: 'Catégorie sans titre',
	},
	toast: {
		tooManyAttempts: 'Too many attempts, please try again later',
	},
	notification: {
		header: {
			subtitle: 'Mes notifications',
		},
		noNotification: 'Aucunes nouvelles notifications',
		newNotification: 'Vous avez une nouvelle notification',
		yourBudget: 'Ton budget',
		budgetWarning: {
			description: 'approche de sa limite',
			title: 'Votre budget est presque dépassé',
			remaining1: 'Tu as',
			remaining2: 'restant',
		},
		budgetExceeded: {
			title: 'Votre budget a été dépassé',
			description: 'a dépassé sa limite',
		},
		time: {
			seconds_singular: 'il y a {{count}} seconde',
			seconds_plural: 'il y a {{count}} secondes',
			minutes_singular: 'il y a {{count}} minute',
			minutes_plural: 'il y a {{count}} minutes',
			hours_singular: 'il y a {{count}} heure',
			hours_plural: 'il y a {{count}} heures',
			days_singular: 'il y a {{count}} jour',
			days_plural: 'il y a {{count}} jours',
		},
	},
};
