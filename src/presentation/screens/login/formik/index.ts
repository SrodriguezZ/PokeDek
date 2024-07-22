import * as Yup from 'yup';  


export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Correo electrónico no válido').required('Correo electrónico es obligatorio'),
    password: Yup.string().required('Correo electrónico es obligatorio'),
  });


interface ILogin {
    email:string;
    password:string;
}

export const defaultLogin : ILogin = {
    email: '',
    password: ''
}