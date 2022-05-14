export const emailValidator = (email: string) => {
    // estructura de un email:  nombre_usuario+@+servidor+dominio, eg: user6840@gmail.com
    // use of Regex to validate
    const regexValidator = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const result = regexValidator.test(email) ? true : false;
    return result;
};
export const passwordValidator = (password: string, rePassword: string) => {
    return (password === rePassword) ? true : false;
  }; 