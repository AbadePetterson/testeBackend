const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('[-] Could not destry login session', err);
      next(err);
    }

    res.statusCode = 200;
    res.json({ 'detail': 'Logged out' });
  });
}


module.exports = logout;
