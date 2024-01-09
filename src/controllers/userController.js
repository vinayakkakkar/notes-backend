const userService = require('../services/userService');

const signup = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = userService.signupService;
    const preProcessData = await preProcess(req, res);
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { preProcess, process, postProcess } = userService.loginService;
    const preProcessData = await preProcess(req, res);
    const result = await process(preProcessData);
    await postProcess(result, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
