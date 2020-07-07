import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../apis/index";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignUp() {
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(10),
        email: Yup.string().email("Invalid Email address").required("required"),
        password: Yup.string().min(6).required("required"),
        passwordConfirmation: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password must match"
        ),
      })}
      onSubmit={(values) => {
        const { name, email, password } = values;
        setSubmitted(true);
        if (!submitted)
          auth.post("/signup", { name, email, password }).then((res) => {
            if (res.status === 201) {
              localStorage.setItem("token", res.data.token);
              history.push("/");
            }
          });
      }}
    >
      <div className="auth-card">
        <Form>
          <div className={"card"}>
            <div className="input-field">
              <h2>sign Up</h2>

              <Field name="name" type="text" placeholder="   name" />
              <ErrorMessage name="name" />

              <Field name="email" type="email" placeholder="   email" />
              <ErrorMessage name="email" />

              <Field
                name="password"
                placeholder="    password"
                type="password"
              />
              <ErrorMessage name="password" />
              <Field
                name="passwordConfirmation"
                placeholder="    re-enter password"
                type="password"
              />
              <ErrorMessage name="passwordConfirmation" component="div" />
              <button
                className="btn waves-effect waves-light #1e88e5 blue darken-1"
                type="submit"
                name="action"
              >
                sign in
              </button>
              <h5>
                <Link to="/signup">don't have an account ?</Link>
              </h5>
            </div>
          </div>
        </Form>
      </div>
    </Formik>
  );
}
