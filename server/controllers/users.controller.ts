import validateForm from '../validations/users.validation';

const signIn = async (req: any, res: any) => {
  try {
    validateForm(req, res);
    
  } catch (err) {
    console.error(err)
  }
};

const signUp = async (req: any, res: any) => {
  try {
    validateForm(req, res);
    
  } catch (err) {
    console.error(err)
  }

};

const controller = {
  signIn,
  signUp
}

export default controller