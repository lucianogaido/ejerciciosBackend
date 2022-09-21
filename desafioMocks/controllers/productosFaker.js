const fakerGenerator = require('../server')

const getRandom = async (req, res, next) => {
  try {
    await fakerGenerator()
    .then(resp => res.status(200).json(resp))
  } catch(err){next()}
}

module.exports= getRandom