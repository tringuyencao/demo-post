import withSession from "../../../lib/session";
import { findUser, validatePassword } from "../user/get";

export default withSession(async (req, res) => {
  const { email, password } = await req.body;
  try {
    const foundUser = await findUser({ email });
    if (!foundUser) {
      const error = new Error();
      error.data = {message: "Account not exist!"};
      throw error;
    }
    const checkPassword = await validatePassword(foundUser, password);
    if (!checkPassword) {
      const error = new Error();
      error.response = {};
      error.data = {};
      throw error;
    }
    const user = { isLoggedIn: true, ...foundUser };
    req.session.set("user", user);
    await req.session.save();
    return res.status(200).json(user)
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});
