import React, { useState } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const EditBusinessModal = ({
  nameValue = "",
  descriptionValue = "",
  addressValue = "",
  categoryValue = "",
  phoneNumberValue = "",
  open,
  setOpen,
  onSubmit,
}) => {
  const [name, setName] = useState(nameValue);
  const [description, setDescription] = useState(descriptionValue);
  const [address, setAddress] = useState(addressValue);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumberValue);
  const [category, setCategory] = useState(categoryValue);
  const [file, setFile] = useState("");
  const [editType, setEditType] = useState("info");

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

  const normFile = (e) => {
    console.log("Upload event:", e.file);
    setFile(e.file);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Modal
      title=" فرم ویرایش کسب و کار"
      visible={open}
      closable={false}
      okText="ویرایش"
      cancelText="انصراف"
      onOk={() => {
        if (editType === "info") {
          onSubmit(
            { name, description, address, phoneNumber, category },
            "info"
          );
        } else if (editType === "upload") {
          onSubmit(file, "upload");
        }
        setOpen(false);
      }}
      onCancel={() => {
        setOpen(false);
      }}
      open={open}
      onClose={() => setOpen(false)}
    >
      {editType === "info" && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
        >
          <Form.Item label="نام کسب و کار">
            <Input
              id="nameInput"
              value={name}
              onChange={handleChange("name")}
            />
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
          <Form.Item>
            <Button type="link" onClick={() => setEditType("upload")}>
              آپلود عکس
            </Button>
          </Form.Item>
        </Form>
      )}
      {editType === "upload" && (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size={"middle"}
        >
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                تصویر خود را در این اینجا آپلود کنید.
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setEditType("info")}>
              ویرایش اطلاعات
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditBusinessModal;
