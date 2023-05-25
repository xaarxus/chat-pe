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

const formValidation = (req: any, res: any, next: any) => {
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch((err: any) => {
      res.status(400).send();
    })
    .then((isValid: boolean) => {
      if (isValid) next();
      else res.status(400).send();
    });
}

export default formValidation;
