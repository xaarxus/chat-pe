const Yup = require('yup');

const formSchema = Yup.object({
  username: Yup
    .string()
    .required('Username required')
    .min(5, 'Username to short')
    .max(20, 'Username to long'),
  password: Yup
    .string()
    .required('Password required')
    .min(5, 'Password to short')
    .max(20, 'Password to long'),
});

const formValidation = (req: any, res: any) => {
  formSchema.validate(req.body)
    .catch((err: any) => {
      res.status(400).send();
      throw err;
    });
}

export default formValidation;
