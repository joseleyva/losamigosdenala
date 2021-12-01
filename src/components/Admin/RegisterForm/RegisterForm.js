import React, { useState } from "react";
import "./RegisterForm.scss";
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { Form, Row, FloatingLabel, Col, Button } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import {notification} from 'antd';
import * as yup from 'yup';

import { signUpApi } from "../../../api/user";


const schema = yup.object().shape({
  name: yup.string().required("Ingrese su nombre"),
  email: yup.string().required("Ingrese sus Correo").email('Correo no valido'),
  password: yup.string().required("Ingrese su contraseña").matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Min 8 Caracteres, 1 Mayúscula, 1 Minúscula, Un Numero y Un Carácter Especial"
    ),
  repeatPassword: yup.string().required("Confirme su contraseña").min(8, 'Muy corta').oneOf([yup.ref("password"), null], "Passwords must match"),
});

 function RegisterForm() {
  const [validated, setValidated] = useState(false)
  const [fallo, setFallo] = useState(false);
  const theme = useTheme();

  const handleClick = (event) => {
      const Button = event.currentTarget;
      if (Button.checkValidity() === false) {

      }

      setFallo(true);
  };
 
  return (
      <Formik
          validationSchema={schema}
          onSubmit={async(valores, { resetForm }) => {
              setValidated(true);
              const result = await signUpApi(valores);
              if (!result.ok) {
                  notification["error"]({
                    description: result.message,
                   placement: 'bottomLeft',
                  });
              }else{
                notification["success"]({
                  description: result.message,
                  placement: 'bottomLeft',
                });
                resetForm();
              }
          }}
          initialValues={{
              name: '',
              email: '',
              password: '',
              repeatPassword: '',
          }}
      >
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
          }) => (
    
             
        
            <ThemeProvider theme={theme}>
             
        <Box component="form" validated={validated} noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Row className="mb-3">
              <Form.Group as={Col} md="15" controlId="validationFormik01" className="position-relative">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nombre"

                >
                  <Form.Control
                    className="FormInicio"
                    type="text"
                    placeholder="Ingrese el nombre"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={fallo ? !!errors.name : false}
                    required />
                  <Form.Control.Feedback type="invalid" tooltip>{errors.name}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="15" className="position-relative" controlId="formGroupEmail">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Correo electronico"

                >
                  <Form.Control
                    className="FormInicio"
                    type="email"
                    name="email"
                    placeholder="Ingrese el correo"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={fallo ? !!errors.email : false}
                    required />
                  <Form.Control.Feedback type="invalid" tooltip>{errors.email}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="15" className="position-relative" controlId="formGroupPassword">

                <FloatingLabel
                  controlId="floatingInput"
                  label="Contraseña"

                >
                  <Form.Control
                    className="FormInicio"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={fallo ? !!errors.password : false}
                    required />
                  <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="15" className="position-relative" controlId="Password">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Confirmar Contraseña"

                >
                  <Form.Control
                    className="FormInicio"
                    type="password"
                    name="repeatPassword"
                    placeholder="Confirmar Contraseña"
                    value={values.repeatPassword}
                    onChange={handleChange}
                    isValid={touched.repeatPassword && !errors.repeatPassword}
                    isInvalid={fallo ? !!errors.repeatPassword : false}
                    required />
                  <Form.Control.Feedback type="invalid" tooltip>{errors.repeatPassword}</Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
            </Row>
            <div className="d-grid gap-2">
              <Button className="botonS" type="submit" onClick={handleClick}>Crear Cuenta</Button>
            </div>
           
            </Box>
           
            </ThemeProvider>
            
            )}
            
          </Formik>
  );
}

export default RegisterForm;