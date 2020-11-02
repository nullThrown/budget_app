
exports.getHome = async (req, res) => {
  await  res.render('home', {user: req.user});
};  