module.exports = (req,res) => {
    //return res.json({msg: 'oi passaport'})
    return res.render('main/index', {
        user: req.user || null
    })
}