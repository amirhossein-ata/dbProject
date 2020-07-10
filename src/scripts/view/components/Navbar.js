import React, { useState } from "react";
import { signupRequest, loginRequest } from "../../core/actions/auth";
import { Menu, Button, Modal, Form, Input, Dropdown } from "antd";
import { Link } from "react-router-dom";

export default (props) => {
  const [selectedKeys, setSelectedKeys] = useState("");
  const [loginType, setLoginType] = useState("login");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { auth, dispatch } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "nationalCode":
        setNationalCode(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;

      default:
        break;
    }
  };
  const submit = () => {
    if (loginType === "login") {
      dispatch(loginRequest({ username, password }));
    } else {
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
          setShowModal(false);
        }}
        onCancel={() => {
          setShowModal(false);
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
            </Form.Item>
            <Form.Item label="نام">
              <Input
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="نام خانوادگی">
              <Input
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="رمز عبور">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="ایمیل">
              <Input
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="کد ملی">
              <Input
                id="nationalCode"
                name="nationalCode"
                value={nationalCode}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item label="شماره تلفن">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
              />
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
            </Form.Item>

            <Form.Item label="رمز عبور">
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
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
            <Link to="/profile">صفحه پروفایل</Link>
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
