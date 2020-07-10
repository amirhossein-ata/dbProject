import React, { useState } from "react";
import { signupRequest, loginRequest } from "../../core/actions/auth";
import { Menu, Button, Modal, Form, Input, Dropdown } from "antd";
import { Link } from "react-router-dom";

export default (props) => {
  const [selectedKeys, setSelectedKeys] = useState("");
  const [loginType, setLoginType] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nationalCode, setNationalCode] = useState("");
  const [nationalCodeError, setNationalCodeError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const { auth, dispatch } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        setUsernameError(false);
        break;
      case "firstName":
        setFirstName(value);
        setFirstNameError(false);
        break;
      case "lastName":
        setLastName(value);
        setLastNameError(false);
        break;
      case "password":
        setPassword(value);
        setPasswordError(false);
        break;
      case "email":
        setEmail(value);
        setEmailError(false);
        break;
      case "nationalCode":
        setNationalCode(value);
        setNationalCodeError(false);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        setPhoneNumberError(false);
        break;

      default:
        break;
    }
  };
  const clearForms = () => {
    setUsername("");
    setUsernameError(false);
    setFirstName("");
    setFirstNameError(false);
    setLastName("");
    setLastNameError(false);
    setPassword("");
    setPasswordError(false);
    setEmail("");
    setEmailError(false);
    setNationalCode("");
    setNationalCodeError(false);
    setPhoneNumber("");
    setPhoneNumberError(false);
  };
  const submit = () => {
    if (loginType === "login") {
      if (username.length === 0) {
        setUsernameError(true);
      }
      if (password.length === 0) {
        setPasswordError(true);
      }
      if (username.length !== 0 && password.length !== 0) {
        dispatch(loginRequest({ username, password }));
        setShowModal(false);
        clearForms();
      }
    } else {
      if (username.length === 0) {
        setUsernameError(true);
      }
      if (password.length === 0) {
        setPasswordError(true);
      }
      if (firstName.length === 0) {
        setFirstNameError(true);
      }
      if (lastName.length === 0) {
        setLastNameError(true);
      }
      if (email.length === 0) {
        setEmailError(true);
      }
      if (nationalCode.length === 0) {
        setNationalCodeError(true);
      }
      if (phoneNumber.length === 0) {
        setPhoneNumberError(true);
      }
      if (
        username.length !== 0 &&
        password.length !== 0 &&
        firstName.length !== 0 &&
        lastName.length !== 0 &&
        email.length !== 0 &&
        nationalCode.length !== 0 &&
        phoneNumber.length !== 0
      ) {
        dispatch(
          signupRequest({
            username,
            firstName,
            lastName,
            password,
            email,
            nationalCode,
            phoneNumber,
          })
        );
        setShowModal(false);
        clearForms();
      }
    }
  };
  return (
    <React.Fragment>
      <Modal
        title=" فرم ثبت‌نام کارمند"
        visible={showModal}
        closable={false}
        okText="ثبت‌ نام"
        cancelText="انصراف"
        onOk={() => {
          submit();
        }}
        onCancel={() => {
          setShowModal(false);
          clearForms();
        }}
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        {loginType === "signup" ? (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size={"middle"}
          >
            <Form.Item label="نام کاربری">
              <Input
                id="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {usernameError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>

            <Form.Item label="نام">
              <Input
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
              {firstNameError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item label="نام خانوادگی">
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
              {lastNameError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item label="رمز عبور">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              {passwordError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item label="ایمیل">
              <Input
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {emailError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item label="کد ملی">
              <Input
                id="nationalCode"
                name="nationalCode"
                value={nationalCode}
                onChange={handleChange}
              />
              {nationalCodeError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item label="شماره تلفن">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
              {phoneNumberError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={() => setLoginType("login")}>
                نمایش فرم ورود
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size={"middle"}
          >
            <Form.Item label="نام کاربری">
              <Input
                id="usernameInput"
                name="username"
                value={username}
                onChange={handleChange}
              />
              {usernameError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>

            <Form.Item label="رمز عبور">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              {passwordError && (
                <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={() => setLoginType("signup")}>
                نمایش فرم ثبت‌نام
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
      <Menu
        onClick={(e) => setSelectedKeys(e.key)}
        selectedKeys={[selectedKeys]}
        mode="horizontal"
      >
        <Menu.Item key="business">
          <Link to="/business">کسب و کارها</Link>
        </Menu.Item>
        <span style={{ float: "left", marginLeft: "2em" }}>
          {auth.isAuthenticated ? (
            <div>
              <Link to="/profile" style={{ color: "black", marginLeft: "2em" }}>
                صفحه پروفایل
              </Link>
              <span
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                خروج از حساب
              </span>
            </div>
          ) : (
            <Button
              onClick={() => setShowModal(true)}
              style={{ border: "none" }}
            >
              ثبت نام/ ورود
            </Button>
          )}
        </span>
      </Menu>
    </React.Fragment>
  );
};
