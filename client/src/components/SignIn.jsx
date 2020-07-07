import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../apis/index";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function SignIn() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid Email address").required("required"),
        password: Yup.string().min(6).required("required"),
      })}
      onSubmit={(values) => {
        const { email, password } = values;
        setSubmitted(true);
        if (!submitted)
          auth
            .post("/signin", { email, password })
            .then((res) => console.log(res));
      }}
    >
      <div className="auth-card">
        <Form>
          <div className={"card"}>
            <div className="input-field">
              <h2>sign In</h2>

              <Field name="email" type="email" placeholder="   email" />
              <ErrorMessage name="email" />

              <Field
                name="password"
                placeholder="    password"
                type="password"
              />
              <ErrorMessage name="password" />
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
