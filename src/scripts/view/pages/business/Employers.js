import React, { useState } from "react";
import { Row, Col, Button, Card, Modal, Form, Input, Select } from "antd";
import { signupRequest } from "../../../core/actions/auth";

const AddEmployerModal = ({ dispatch, businessID, open, setOpen }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [password_confirmation_error, setPasswordConfirmationError] = useState(
    ""
  );

  const handleChange = (field) => (e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "phone_number") {
      setPhoneNumber(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "password_confirmation") {
      setPasswordConfirmation(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const submit = () => {
    if (name === "") {
      setNameError("این فیلد نباید خالی باشد.");
    } else {
      setNameError("");
    }
    if (password === "") {
      setPasswordError("این فیلد نباید خالی باشد.");
    } else {
      setPasswordError("");
    }
    if (password !== password_confirmation) {
      setPasswordConfirmationError("تکرار رمز عبور با رمز عبور مطابقت ندارد");
    } else {
      setPasswordConfirmationError("");
    }
    if (name !== "" && password !== "" && password === password_confirmation) {
      dispatch(
        signupRequest({
          name,
          email,
          phone_number,
          password,
          password_confirmation,
          type: "employer",
          business_id: businessID,
        })
      );
      setOpen(false);
    }
  };

  return (
    <Modal
      title=" فرم ثبت‌نام کارمند"
      visible={open}
      closable={false}
      okText="ثبت‌ نام"
      cancelText="انصراف"
      onOk={() => {
        submit();
      }}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
      >
        <Form.Item label="نام">
          <Input id="nameInput" value={name} onChange={handleChange("name")} />
          {nameError !== "" && <p style={{ color: "#c9323f" }}>{nameError}</p>}
        </Form.Item>
        <Form.Item label="ایمیل">
          <Input value={email} onChange={handleChange("email")} />
        </Form.Item>
        <Form.Item label="شماره موبایل">
          <Input value={phone_number} onChange={handleChange("phone_number")} />
        </Form.Item>
        <Form.Item label="رمز عبور">
          <Input value={password} onChange={handleChange("password")} />
          {passwordError !== "" && (
            <p style={{ color: "#c9323f" }}>{passwordError}</p>
          )}
        </Form.Item>
        <Form.Item label="تکرار رمز عبور">
          <Input
            value={password_confirmation}
            onChange={handleChange("password_confirmation")}
          />
          {password_confirmation_error !== "" && (
            <p style={{ color: "#c9323f" }}>{password_confirmation_error}</p>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ({ employers, dispatch, businessID, isBusinessPanel }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AddEmployerModal
        open={open}
        setOpen={setOpen}
        dispatch={dispatch}
        businessID={businessID}
      />

      <Row justify="space-between">
        <Col>
          <h4>کارمند‌ها</h4>
        </Col>
        <Col>
          {isBusinessPanel && (
            <Button type="primary" onClick={() => setOpen(true)}>
              اضافه کردن کارمند
            </Button>
          )}
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: "2em" }}>
        {employers.map((employer, index) => (
          <Col span={8}>
            <Card key={index}>
              <Card.Meta
                title={employer.name}
                description={employer.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
