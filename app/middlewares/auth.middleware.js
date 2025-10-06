export function onlyGuest (req, res, next) {

    //En cas de session active 
    // on empêche l'utilisateur de se connecter aux views qui lui permettent de se logger. 
    if(req.session.user) {
        return res.redirect('/')
    }
    
    next(); // on passe au middleware suivant
}

export function onlyAuthenticated (req, res, next) {

    // Si l'utilisateur n'est pas connecté
    // on l'empêche d'accéder au dashboard
    if(!req.session.user) {
        return res.redirect('/register')
    }

    next(); // on passe au middleware suivant
}

export function onlyAdmin (req, res, next) {

    // Si l'utilisateur n'est pas admin
    // on l'empêche d'accéder aux routes admin
    if(!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).render('403'); // page d'erreur 403
    }

    next(); // on passe au middleware suivant
}
