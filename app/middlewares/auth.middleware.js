// Middleware to restrict access to guest-only pages (e.g. login/register)
export function onlyGuest (req, res, next) {
    // If a user session exists, redirect to home (prevent access to login/register)
    if(req.session.user) {
        return res.redirect('/')
    }
    next(); // Continue to the next middleware
}

// Middleware to restrict access to authenticated users only
export function onlyAuthenticated (req, res, next) {
    // If no user session, redirect to register/login page
    if(!req.session.user) {
        return res.redirect('/register')
    }
    next(); // Continue to the next middleware
}

// Middleware to restrict access to admin-only routes
export function onlyAdmin (req, res, next) {
    // If not logged in or not admin, render 403 error page
    if(!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).render('403');
    }
    next(); // Continue to the next middleware
}
