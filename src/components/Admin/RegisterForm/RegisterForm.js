import React, { useState } from "react";
import "./RegisterForm.scss";
import { Form, Input, Checkbox, notification } from "antd";
import {Button} from 'react-bootstrap';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signUpApi } from "../../../api/user";
import {emailValidation, minLengthValidation} from '../../../utils/formValidation';

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
  };
  const inputValidation = e => {
    const {type, name}=e.target;
    if(type==="email"){
        setFormValid({
            ...formValid,
            [name]: emailValidation(e.target)
        });
    }
    if(type=== "password"){
        setFormValid({
            ...formValid,
            [name]: minLengthValidation(e.target, 6)
        });
    }
    if(type=== "checkbox"){
        setFormValid({
            ...formValid,
            [name]: e.target.checked
        })
    }

  };
  const register = e => {
      e.preventDefault();
      const {email, password, repeatPassword, privacyPolicy}= formValid;
    const emailVal = inputs.email;
    const passwordVal = inputs.password;
    const repeatPasswordVal = inputs.repeatPassword;
    const privacyPolicyVal = inputs.privacyPolicy;
    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "LLene todos los campos"
      });
    } else {
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Las contaseñas son diferentes",
        });
      } else {
        console.log("Correcto..");
    }
}
  };
  return (
    <Form className="register-form" onSubmit={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          autoComplete="username"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          type="password"
          name="password"
          placeholder="Contaseña"
          autoComplete="new-password"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined />}
          type="password"
          name="repeatPassword"
          autoComplete="new-password"
          placeholder="Repetir Contaseña"
          className="register-form__input"
          onChange={inputValidation}
          values={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leido y acepto la politica de privacidad
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button type="submit" className="register-form__button">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
