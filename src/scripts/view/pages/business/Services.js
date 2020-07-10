import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Card, Col, Modal, Button, Form, Input, Select } from "antd";
import { add_service } from "../../../core/actions/service";

const AddServiceModal = ({
  dispatch,
  businessID,
  userID,
  closeModal,
  open,
  setOpen,
}) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [start_day, setStartDay] = useState("");
  const [start_day_error, setStartDayError] = useState("");
  const [end_day, setEndDay] = useState("");
  const [end_day_error, setEndDayError] = useState("");
  const [price, setPrice] = useState();
  const [cancellationRange, setCancellationRange] = useState("");

  const handleChange = (field) => (e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else if (field === "address") {
      setAddress(e.target.value);
    } else if (field === "start_day") {
      setStartDay(e.target.value);
    } else if (field === "end_day") {
      setEndDay(e.target.value);
    } else if (field === "price") {
      setPrice(e.target.value);
    } else if (field === "cancelationRange") {
      setCancellationRange(e.target.value);
    }
  };

  const firstStepSubmit = () => {
    if (name === "") {
      setNameError("این فیلد نباید خالی باشید.");
    } else {
      setNameError("");
    }
    if (name !== "") {
      setStep(2);
    }
  };
  const submit = () => {
    if (start_day === "") {
      setStartDayError("این فیلد نباید خالی باشید.");
    } else {
      setStartDayError("");
    }
    if (end_day === "") {
      setEndDayError("این فیلد نباید خالی باشید.");
    } else {
      setEndDayError("");
    }
    if (start_day !== "" && end_day !== "") {
      dispatch(
        add_service(
          {
            name,
            description,
            address,
            business_id: businessID.slice(3, businessID.length),
            start_day,
            end_day,
            price,
            cancellationRange,
          },
          userID,
          closeModal
        )
      );
    }
  };

  const firstStep = (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
      >
        <Form.Item label="نام">
          <Input value={name} onChange={handleChange("name")} />
          {nameError !== "" && <p style={{ color: "#c9323f" }}>{nameError}</p>}
        </Form.Item>
        <Form.Item label="توضیح سرویس">
          <Input.TextArea
            value={description}
            onChange={handleChange("description")}
          />
        </Form.Item>
        <Form.Item label="آدرس">
          <Input.TextArea value={address} onChange={handleChange("address")} />
        </Form.Item>
      </Form>

      <Button type="primary" onClick={firstStepSubmit}>
        مرحله بعد
      </Button>
    </div>
  );

  const secondStep = (
    <div>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
      >
        <Form.Item label="زمان شروع روز">
          <Input value={start_day} onChange={handleChange("start_day")} />
          {start_day_error !== "" && (
            <p style={{ color: "#c9323f" }}>{start_day_error}</p>
          )}
        </Form.Item>
        <Form.Item label="زمان پایان روز">
          <Input value={end_day} onChange={handleChange("end_day")} />
          {end_day_error !== "" && (
            <p style={{ color: "#c9323f" }}>{end_day_error}</p>
          )}
        </Form.Item>
        <Form.Item label="قیمت">
          <Input value={price} onChange={handleChange("price")} />
        </Form.Item>
        <Form.Item label="مهلت کنسل کردن">
          <Input
            value={cancellationRange}
            onChange={handleChange("cancelationRange")}
          />
        </Form.Item>
      </Form>
      <Button type="primary" onClick={submit}>
        ایجاد سرویس
      </Button>
    </div>
  );

  return (
    <Modal
      title="فرم ایجاد سرویس"
      visible={open}
      closable={false}
      okText="ثبت‌ نام"
      cancelText="انصراف"
      onOk={() => {
        submit();
        setOpen(false);
      }}
      footer={[<div style={{ height: "0" }}></div>]}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      {step === 1 ? firstStep : secondStep}
    </Modal>
  );
};

export default ({ dispatch, services, businessID, auth, isBusinessPanel }) => {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <AddServiceModal
        open={open}
        setOpen={setOpen}
        dispatch={dispatch}
        businessID={businessID}
        userID={auth.user.id}
        closeModal={() => setOpen(false)}
      />

      <Row container justify="space-between">
        <Col>
          <h2>سرویس‌ها</h2>
        </Col>
        <Col>
          {isBusinessPanel && (
            <Button type="primary" onClick={() => setOpen(true)}>
              اضافه کردن سرویس
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: "2em" }} gutter={24}>
        {services.map((service, index) => (
          <Col span={8} key={index} style={{ marginBottom: "1em" }}>
            <Card>
              <Card.Meta
                title={service.name}
                description={service.description}
              />
              <Button type="primary" style={{ marginTop: "2em" }}>
                <Link
                  to={`/${isBusinessPanel ? "service-panel" : "service"}/${
                    service.id
                  }/business/${businessID}`}
                >
                  مشاهده سرویس
                </Link>
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};
