import React, { useState } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@mui/material/styles";
import { Form, Row, FloatingLabel, Col, Button } from "react-bootstrap";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import {notification} from 'antd';
import { signInApi } from '../../../api/user';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../utils/constants";

const schema = yup.object().shape({
    email: yup.string().required("Ingrese el correo").email("Correo no valido"),
    password: yup.string().required("Ingrese la contraseña"),
});

function InicioS() {
    const [validated, setValidated] = useState(false);
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
                const result = await signInApi(valores);
                if(result.message){
                    notification["error"]({
                        message: result.message
                    });
                }else{
                    const {accessToken, refreshToken}=result;
                    localStorage.setItem(ACCESS_TOKEN, accessToken);
                    localStorage.setItem(REFRESH_TOKEN, refreshToken);
                    notification["success"]({
                        message: "Login correcto"
                    });
                    window.location.href="/admin";
                }
            }}
            initialValues={{
                email: "",
                password: "",
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
                    <Box
                        component="form"
                        validated={validated}
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 2 }}
                    >
                        <Row className="mb-4">
                            <Form.Group
                                as={Col}
                                md="15"
                                controlId="formGroupEmail"
                                className="position-relative"
                            >
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Correo electronico"
                                >
                                    <Form.Control
                                        className="FormInicio"
                                        type="email"
                                        placeholder="Ingrese el correo"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isValid={touched.email && !errors.email}
                                        isInvalid={fallo ? !!errors.email : false}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group
                                className="position-relative"
                                controlId="formGroupPassword"
                            >
                                <FloatingLabel controlId="floatingInput" label="Contraseña">
                                    <Form.Control
                                        className="FormInicio"
                                        type="password"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={fallo ? !!errors.password : false}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                        </Row>
                        <div className="d-grid gap-2">
                            <Button className="botonS" type="submit" onClick={handleClick}>
                                Iniciar Sesion
                            </Button>
                            <Button className="botonS" variant="danger" href="/">
                                Cancelar
                            </Button>
                        </div>
                        <Grid container className="MargenL">
                            <Grid item xs>
                                <Link variant="body3">Olvide la Contraseña</Link>
                            </Grid>
                            <Grid item>
                                <Link href="/CrearC" variant="body3" className="labelI">
                                    {"¿No tienes una cuenta? Crea una aquí"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </ThemeProvider>
            )}
        </Formik>
    );
}

export default InicioS;
