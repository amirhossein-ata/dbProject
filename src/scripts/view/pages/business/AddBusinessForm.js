import React, { useState } from "react";
import { Modal, Form, Input, Select } from "antd";

const AddBusinessModal = ({ open, setOpen, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (field) => (e) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "description") {
      setDescription(e.target.value);
    } else if (field === "phoneNumber") {
      setPhoneNumber(e.target.value);
    } else {
      setAddress(e.target.value);
    }
  };

  return (
    <Modal
      title=" فرم ایجاد کسب و کار"
      visible={open}
      closable={false}
      okText="ثبت‌ نام"
      cancelText="انصراف"
      onOk={() => {
        onSubmit({ name, description, address, phoneNumber, category });
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
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
        </Form.Item>
        <Form.Item label="توضیحات کسب و کار">
          <Input.TextArea
            value={description}
            onChange={handleChange("description")}
          />
        </Form.Item>
        <Form.Item label="شماره تلفن">
          <Input value={phoneNumber} onChange={handleChange("phoneNumber")} />
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
        </Form.Item>
        <Form.Item label="آدرس">
          <Input value={address} onChange={handleChange("address")} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBusinessModal;
