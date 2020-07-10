import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

const AddBusinessModal = ({ open, setOpen, onSubmit }) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState(false);

  const handleChange = (field) => (e) => {
    if (field === "name") {
      setName(e.target.value);
      setNameError(false);
    } else if (field === "description") {
      setDescription(e.target.value);
      setDescriptionError(false);
    } else if (field === "phoneNumber") {
      setPhoneNumber(e.target.value);
      setPhoneNumberError(false);
    } else {
      setAddress(e.target.value);
      setAddressError(false);
    }
  };

  const clearForm = () => {
    setName("");
    setNameError(false);
    setDescription("");
    setDescriptionError(false);
    setPhoneNumber("");
    setPhoneNumberError(false);
    setAddress("");
    setAddressError(false);
    setCategory("");
    setCategoryError(false);
  };
  return (
    <Modal
      title=" فرم ایجاد کسب و کار"
      visible={open}
      closable={false}
      okText="ثبت‌ نام"
      cancelText="انصراف"
      onOk={() => {
        if (name.length === 0) {
          setNameError(true);
        }
        if (description.length === 0) {
          setDescriptionError(true);
        }
        if (phoneNumber.length === 0) {
          setPhoneNumberError(true);
        }
        if (category.length === 0) {
          setCategoryError(true);
        }
        if (address.length === 0) {
          setAddressError(true);
        }
        if (
          name.length !== 0 &&
          description.length !== 0 &&
          phoneNumber.length !== 0 &&
          address.length !== 0
        ) {
          onSubmit({ name, description, address, phoneNumber, category });
          setOpen(false);
          clearForm();
        }
      }}
      onCancel={() => {
        setOpen(false);
        clearForm();
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
      >
        <Form.Item label="نام کسب و کار">
          <Input id="nameInput" value={name} onChange={handleChange("name")} />
          {nameError && (
            <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
          )}
        </Form.Item>
        <Form.Item label="توضیحات کسب و کار">
          <Input.TextArea
            value={description}
            onChange={handleChange("description")}
          />
          {descriptionError && (
            <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
          )}
        </Form.Item>
        <Form.Item label="شماره تلفن">
          <Input value={phoneNumber} onChange={handleChange("phoneNumber")} />
          {phoneNumberError && (
            <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
          )}
        </Form.Item>
        <Form.Item label="دسته‌بندی">
          <Select value={category} onChange={(e) => setCategory(e)}>
            <Select.Option value={1} key={1}>
              رستوران
            </Select.Option>
            <Select.Option value={2} key={2}>
              آرایشگاه
            </Select.Option>
            <Select.Option value={3} key={3}>
              دفتر پزشک
            </Select.Option>
          </Select>
          {categoryError && (
            <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
          )}
        </Form.Item>
        <Form.Item label="آدرس">
          <Input value={address} onChange={handleChange("address")} />
          {addressError && (
            <p style={{ color: "#d35858" }}> این فیلد نباید خالی باشد</p>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBusinessModal;
